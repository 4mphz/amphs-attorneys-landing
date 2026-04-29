"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Loader2, AlertCircle, ChevronRight } from "lucide-react"
import { getCalApi } from "@calcom/embed-react"
import posthog from "posthog-js"
import { generateEventId } from "@/lib/event-id"
import { getFbCookie } from "@/lib/fb-cookies"

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

const CAL_LINK = "amphs/law-discovery-ads"
const WEBHOOK_CONTACT_INFO = process.env.NEXT_PUBLIC_WEBHOOK_CONTACT_INFO || ""

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
}

const INITIAL_FORM_DATA: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
}

export default function ContactFormAttorneys() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  useEffect(() => {
    ;(async () => {
      try {
        await getCalApi()
      } catch (error) {
        console.error("Failed to load Cal.com:", error)
      }
    })()
  }, [])

  useEffect(() => {
    posthog.capture?.("form_viewed", { form: "attorneys_v2", funnel: "attorneys-v2" })

    const eventId = generateEventId()
    const fbc = getFbCookie("fbc")
    const fbp = getFbCookie("fbp")
    const eventSourceUrl = typeof window !== "undefined" ? window.location.href : ""

    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "ViewContent", {}, { eventID: eventId })
    }

    fetch("/api/capi/view-content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventId,
        country: "US",
        fbc,
        fbp,
        eventSourceUrl,
      }),
    }).catch(() => {})
  }, [])

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase())
  const validatePhone = (phone: string) => phone.trim().length >= 7 && /^[0-9\s\-()+]+$/.test(phone)

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!validateEmail(formData.email)) newErrors.email = "Please enter a valid email"
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    else if (!validatePhone(formData.phone)) newErrors.phone = "Please enter a valid phone number"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const handleBlur = (field: string) => setTouched((prev) => ({ ...prev, [field]: true }))

  const sendContactInfoWebhook = async (data: FormData, eventId: string) => {
    if (!WEBHOOK_CONTACT_INFO) return
    try {
      const formBody = new URLSearchParams({
        first_name: data.firstName,
        last_name: data.lastName,
        full_name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        event_id: eventId,
        form_stage: "contact_info_captured",
        source: "attorneys_v2_lead_form",
        submitted_at: new Date().toISOString(),
      })
      await fetch(WEBHOOK_CONTACT_INFO, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formBody.toString(),
      })
    } catch (error) {
      console.error("Webhook error:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTouched({ firstName: true, lastName: true, email: true, phone: true })
    if (!validate()) {
      posthog.capture?.("contact_info_validation_failed", {
        form: "attorneys_v2",
        funnel: "attorneys-v2",
        errors: Object.keys(errors),
      })
      return
    }

    setIsSubmitting(true)
    const leadEventId = generateEventId()
    const fbc = getFbCookie("fbc")
    const fbp = getFbCookie("fbp")
    const eventSourceUrl = typeof window !== "undefined" ? window.location.href : ""

    if (typeof window !== "undefined" && window.fbq) {
      window.fbq(
        "track",
        "Lead",
        {
          content_name: "Attorney Free Audit",
          content_category: "legal",
        },
        { eventID: leadEventId },
      )
    }

    posthog.capture?.("contact_info_submitted", {
      form: "attorneys_v2",
      funnel: "attorneys-v2",
      email: formData.email,
      event_id: leadEventId,
    })
    posthog.identify?.(formData.email, {
      email: formData.email,
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone: formData.phone,
    })

    await Promise.all([
      sendContactInfoWebhook(formData, leadEventId),
      fetch("/api/capi/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: leadEventId,
          email: formData.email,
          phone: formData.phone,
          firstName: formData.firstName,
          lastName: formData.lastName,
          country: "US",
          fbc,
          fbp,
          eventSourceUrl,
        }),
      }).catch((err) => console.error("CAPI lead error:", err)),
    ])

    const scheduleEventId = generateEventId()
    try {
      const cal = await getCalApi()
      if (cal) {
        cal("modal", {
          calLink: CAL_LINK,
          config: {
            layout: "month_view",
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            smsReminderNumber: formData.phone,
          },
        })

        if (typeof window !== "undefined" && window.fbq) {
          window.fbq("track", "Schedule", {}, { eventID: scheduleEventId })
        }

        posthog.capture?.("cal_modal_opened", {
          form: "attorneys_v2",
          funnel: "attorneys-v2",
          event_id: scheduleEventId,
        })

        fetch("/api/capi/schedule", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            eventId: scheduleEventId,
            email: formData.email,
            phone: formData.phone,
            firstName: formData.firstName,
            lastName: formData.lastName,
            country: "US",
            fbc,
            fbp,
            eventSourceUrl,
          }),
        }).catch((err) => console.error("CAPI schedule error:", err))
      }
    } catch (error) {
      console.error("Cal.com error:", error)
      posthog.capture?.("cal_modal_error", {
        form: "attorneys_v2",
        funnel: "attorneys-v2",
        error: String(error),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputBase =
    "w-full p-3 md:p-4 rounded-xl border-2 border-gray-200 bg-white font-inter text-base text-gray-700 focus:border-[#0080FF] focus:outline-none transition-colors"
  const inputError = "border-red-400 focus:border-red-400"

  const renderError = (field: string) =>
    touched[field] &&
    errors[field] && (
      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
        <AlertCircle className="w-3 h-3" />
        {errors[field]}
      </p>
    )

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <div className="flex gap-3 md:gap-4">
        <div className="flex-1">
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1.5">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            onBlur={() => handleBlur("firstName")}
            placeholder="John"
            className={`${inputBase} ${touched.firstName && errors.firstName ? inputError : ""}`}
            required
          />
          {renderError("firstName")}
        </div>
        <div className="flex-1">
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1.5">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            onBlur={() => handleBlur("lastName")}
            placeholder="Doe"
            className={`${inputBase} ${touched.lastName && errors.lastName ? inputError : ""}`}
            required
          />
          {renderError("lastName")}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          onBlur={() => handleBlur("email")}
          placeholder="john@firm.com"
          className={`${inputBase} ${touched.email && errors.email ? inputError : ""}`}
          required
        />
        {renderError("email")}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          onBlur={() => handleBlur("phone")}
          placeholder="(555) 123-4567"
          className={`${inputBase} ${touched.phone && errors.phone ? inputError : ""}`}
          required
        />
        {renderError("phone")}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-2 bg-[#0080FF] hover:bg-blue-600 disabled:bg-blue-300 text-white font-semibold py-4 md:py-5 px-6 rounded-xl transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2 text-base md:text-lg"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin h-5 w-5 text-white" />
            Loading...
          </>
        ) : (
          <>
            See If You Qualify
            <ChevronRight className="w-5 h-5" />
          </>
        )}
      </button>

      <p className="text-xs text-gray-500 text-center">
        By submitting, you agree to receive automated follow-up messages. Reply STOP to end.
      </p>
    </form>
  )
}
