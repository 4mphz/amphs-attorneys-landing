"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Cal, { getCalApi } from "@calcom/embed-react"
import {
  Loader2,
  AlertCircle,
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Building2,
  Megaphone,
  HelpCircle,
  User,
  Users,
  Briefcase,
  Scale,
  Phone,
  TrendingDown,
  Search,
  DollarSign,
  Zap,
  Rocket,
  Calendar,
  Clock,
  BookOpen,
} from "lucide-react"
import posthog from "posthog-js"
import { generateEventId } from "@/lib/event-id"
import { getFbCookie } from "@/lib/fb-cookies"
import { saveFormData, loadFormData, clearFormData } from "@/lib/form-storage"
import {
  type FormData,
  getCalLink,
  getDQReason,
  isQualified,
  buildCalNotes,
} from "@/lib/lead-routing"

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

const WEBHOOK_CONTACT_INFO =
  process.env.NEXT_PUBLIC_WEBHOOK_CONTACT_INFO ||
  "https://amphs.app.n8n.cloud/webhook/contact-info-capture"
const WEBHOOK_FULL_FORM =
  process.env.NEXT_PUBLIC_WEBHOOK_FULL_FORM ||
  "https://amphs.app.n8n.cloud/webhook/qualifying-form"

const INITIAL: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  budgetCommitment: "",
  businessType: "",
  decisionMaker: "",
  biggestChallenge: "",
  firmSize: "",
  timeline: "",
}

const TOTAL_STEPS = 7

export default function ContactFormAttorneys() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<FormData>(INITIAL)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [leadEventId, setLeadEventId] = useState<string>("")

  useEffect(() => {
    const saved = loadFormData<FormData>()
    if (saved) setData(saved)

    ;(async () => {
      try {
        await getCalApi()
      } catch (err) {
        console.error("Cal.com init error:", err)
      }
    })()
  }, [])

  useEffect(() => {
    saveFormData(data)
  }, [data])

  useEffect(() => {
    posthog.capture?.("form_viewed", {
      form: "attorneys_v2",
      funnel: "attorneys-v2",
    })

    const eventId = generateEventId()
    const fbc = getFbCookie("fbc")
    const fbp = getFbCookie("fbp")
    const url = typeof window !== "undefined" ? window.location.href : ""

    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "ViewContent", {}, { eventID: eventId })
    }

    fetch("/api/capi/view-content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventId, country: "US", fbc, fbp, eventSourceUrl: url }),
    }).catch(() => {})
  }, [])

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase())
  const validatePhone = (phone: string) => phone.trim().length >= 7 && /^[0-9\s\-()+]+$/.test(phone)

  const validateContact = () => {
    const e: Record<string, string> = {}
    if (!data.firstName.trim()) e.firstName = "First name is required"
    if (!data.lastName.trim()) e.lastName = "Last name is required"
    if (!data.email.trim()) e.email = "Email is required"
    else if (!validateEmail(data.email)) e.email = "Please enter a valid email"
    if (!data.phone.trim()) e.phone = "Phone number is required"
    else if (!validatePhone(data.phone)) e.phone = "Please enter a valid phone number"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const sendContactWebhook = async (d: FormData) => {
    if (!WEBHOOK_CONTACT_INFO) return
    try {
      await fetch(WEBHOOK_CONTACT_INFO, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          first_name: d.firstName,
          last_name: d.lastName,
          full_name: `${d.firstName} ${d.lastName}`,
          email: d.email,
          phone: d.phone,
          form_stage: "contact_info_captured",
          source: "attorneys_v2",
          funnel: "attorneys-v2",
          submitted_at: new Date().toISOString(),
        }).toString(),
      })
    } catch (err) {
      console.error("Contact webhook error:", err)
    }
  }

  const sendFullWebhook = async (d: FormData, eventId: string) => {
    if (!WEBHOOK_FULL_FORM) return
    try {
      const dqReason = getDQReason(d)
      await fetch(WEBHOOK_FULL_FORM, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          first_name: d.firstName,
          last_name: d.lastName,
          full_name: `${d.firstName} ${d.lastName}`,
          email: d.email,
          phone: d.phone,
          budget_commitment: d.budgetCommitment,
          business_type: d.businessType,
          decision_maker: d.decisionMaker,
          biggest_challenge: d.biggestChallenge,
          firm_size: d.firmSize,
          timeline: d.timeline,
          qualified: isQualified(d) ? "true" : "false",
          dq_reason: dqReason || "",
          lead_event_id: eventId,
          cal_link: getCalLink(d),
          form_stage: "full_form_completed",
          source: "attorneys_v2",
          funnel: "attorneys-v2",
          submitted_at: new Date().toISOString(),
        }).toString(),
      })
    } catch (err) {
      console.error("Full form webhook error:", err)
    }
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTouched({ firstName: true, lastName: true, email: true, phone: true })
    if (!validateContact()) return

    setIsSubmitting(true)
    await sendContactWebhook(data)

    posthog.capture?.("contact_info_submitted", {
      form: "attorneys_v2",
      funnel: "attorneys-v2",
      email: data.email,
    })
    posthog.identify?.(data.email, {
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
      phone: data.phone,
    })

    setIsSubmitting(false)
    setStep(1)
  }

  const fireLeadAndCompleteForm = async (finalData: FormData) => {
    const qualified = isQualified(finalData)
    const eventId = generateEventId()
    setLeadEventId(eventId)

    if (qualified && typeof window !== "undefined" && window.fbq) {
      window.fbq(
        "track",
        "Lead",
        { content_name: "Attorney Free Audit", content_category: "legal" },
        { eventID: eventId },
      )
    }

    if (qualified) {
      const fbc = getFbCookie("fbc")
      const fbp = getFbCookie("fbp")
      fetch("/api/capi/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId,
          email: finalData.email,
          phone: finalData.phone,
          firstName: finalData.firstName,
          lastName: finalData.lastName,
          country: "US",
          fbc,
          fbp,
          eventSourceUrl: typeof window !== "undefined" ? window.location.href : "",
        }),
      }).catch((err) => console.error("CAPI lead error:", err))
    }

    await sendFullWebhook(finalData, eventId)

    posthog.capture?.("form_completed", {
      form: "attorneys_v2",
      funnel: "attorneys-v2",
      qualified,
      dq_reason: getDQReason(finalData),
    })
  }

  const selectAnswer = async (field: keyof FormData, value: string) => {
    const updated = { ...data, [field]: value }
    setData(updated)

    posthog.capture?.("question_answered", {
      form: "attorneys_v2",
      funnel: "attorneys-v2",
      question: field,
      answer: value,
      step,
    })

    if (step === 6) {
      await fireLeadAndCompleteForm(updated)
    }

    setTimeout(() => setStep((s) => s + 1), 280)
  }

  const goBack = () => setStep((s) => Math.max(0, s - 1))

  const inputBase =
    "w-full p-3 md:p-4 rounded-xl border-2 border-gray-200 bg-white font-inter text-base text-gray-700 focus:border-[#0080FF] focus:outline-none transition-colors"
  const inputErr = "border-red-400 focus:border-red-400"

  const renderError = (field: string) =>
    touched[field] &&
    errors[field] && (
      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
        <AlertCircle className="w-3 h-3" />
        {errors[field]}
      </p>
    )

  const StepIndicator = ({ current }: { current: number }) => (
    <p className="text-[#0080FF] font-semibold text-center mb-4 text-sm" style={{ fontFamily: "Inter" }}>
      Step {current + 1} of {TOTAL_STEPS}
    </p>
  )

  const BackButton = () => (
    <button
      onClick={goBack}
      className="mt-6 mx-auto flex items-center text-gray-500 hover:text-gray-700 transition-colors text-sm"
      style={{ fontFamily: "Inter" }}
    >
      <ArrowLeft className="w-4 h-4 mr-1" />
      Back
    </button>
  )

  if (step === 0) {
    return (
      <div className="w-full">
        <StepIndicator current={0} />
        <form onSubmit={handleContactSubmit} className="space-y-4">
          <div className="flex gap-3 md:gap-4">
            <div className="flex-1">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1.5">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={data.firstName}
                onChange={(e) => setData({ ...data, firstName: e.target.value })}
                onBlur={() => setTouched({ ...touched, firstName: true })}
                placeholder="John"
                className={`${inputBase} ${touched.firstName && errors.firstName ? inputErr : ""}`}
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
                value={data.lastName}
                onChange={(e) => setData({ ...data, lastName: e.target.value })}
                onBlur={() => setTouched({ ...touched, lastName: true })}
                placeholder="Doe"
                className={`${inputBase} ${touched.lastName && errors.lastName ? inputErr : ""}`}
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
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              onBlur={() => setTouched({ ...touched, email: true })}
              placeholder="john@firm.com"
              className={`${inputBase} ${touched.email && errors.email ? inputErr : ""}`}
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
              value={data.phone}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
              onBlur={() => setTouched({ ...touched, phone: true })}
              placeholder="(555) 123-4567"
              className={`${inputBase} ${touched.phone && errors.phone ? inputErr : ""}`}
              required
            />
            {renderError("phone")}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 bg-[#0080FF] hover:bg-blue-600 disabled:bg-blue-300 text-white font-semibold py-4 md:py-5 px-6 rounded-xl transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2 text-base md:text-lg"
            style={{ fontFamily: "Inter" }}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin h-5 w-5 text-white" />
                Saving...
              </>
            ) : (
              <>
                Continue
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>

          <p className="text-xs text-gray-500 text-center">
            By submitting, you agree to receive automated follow-up messages. Reply STOP to end.
          </p>
        </form>
      </div>
    )
  }

  if (step === 1) {
    return (
      <div className="w-full">
        <StepIndicator current={1} />
        <h3 className="font-inter text-xl md:text-2xl font-bold text-black mb-2 text-center">
          Are you able and willing to invest at least $1,500 per month into your firm&apos;s growth?
        </h3>
        <p className="text-gray-500 text-sm md:text-base text-center mb-6">
          Honesty saves us both time. If not, please do not book.
        </p>
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          <button
            onClick={() => selectAnswer("budgetCommitment", "yes")}
            className={`group p-6 md:p-8 rounded-2xl border-2 bg-white hover:border-[#0080FF] hover:bg-blue-50/30 transition-all duration-200 hover:scale-[1.02] flex flex-col items-center text-center ${
              data.budgetCommitment === "yes" ? "border-[#0080FF] bg-blue-50/30" : "border-gray-200"
            }`}
          >
            <CheckCircle2 className="w-10 h-10 md:w-12 md:h-12 text-green-500 mb-3" />
            <span className="font-bold text-gray-900 text-base md:text-lg">Yes</span>
            <span className="text-gray-500 text-xs md:text-sm mt-1">I can invest $1,500+/mo</span>
          </button>
          <button
            onClick={() => selectAnswer("budgetCommitment", "no")}
            className={`group p-6 md:p-8 rounded-2xl border-2 bg-white hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 hover:scale-[1.02] flex flex-col items-center text-center ${
              data.budgetCommitment === "no" ? "border-gray-400 bg-gray-50" : "border-gray-200"
            }`}
          >
            <XCircle className="w-10 h-10 md:w-12 md:h-12 text-gray-400 mb-3" />
            <span className="font-bold text-gray-900 text-base md:text-lg">No</span>
            <span className="text-gray-500 text-xs md:text-sm mt-1">Not right now</span>
          </button>
        </div>
        <BackButton />
      </div>
    )
  }

  if (step === 2) {
    return (
      <div className="w-full">
        <StepIndicator current={2} />
        <h3 className="font-inter text-xl md:text-2xl font-bold text-black mb-2 text-center">
          Which best describes your business?
        </h3>
        <p className="text-gray-500 text-sm md:text-base text-center mb-6">
          We only work with law firms.
        </p>
        <div className="grid grid-cols-1 gap-3 md:gap-4">
          {[
            { value: "law_firm", label: "Law firm", icon: Scale, sub: "I work at or own a law firm" },
            { value: "agency", label: "Marketing or SEO agency", icon: Megaphone, sub: "I represent a marketing/agency company" },
            { value: "other", label: "Other", icon: HelpCircle, sub: "Something else" },
          ].map((opt) => {
            const Icon = opt.icon
            return (
              <button
                key={opt.value}
                onClick={() => selectAnswer("businessType", opt.value)}
                className={`group p-4 md:p-5 rounded-2xl border-2 bg-white hover:border-[#0080FF] hover:bg-blue-50/30 transition-all duration-200 flex items-center gap-4 text-left ${
                  data.businessType === opt.value ? "border-[#0080FF] bg-blue-50/30" : "border-gray-200"
                }`}
              >
                <Icon className="w-7 h-7 md:w-8 md:h-8 text-[#0080FF] flex-shrink-0" />
                <div>
                  <div className="font-bold text-gray-900 text-base md:text-lg">{opt.label}</div>
                  <div className="text-gray-500 text-xs md:text-sm">{opt.sub}</div>
                </div>
              </button>
            )
          })}
        </div>
        <BackButton />
      </div>
    )
  }

  if (step === 3) {
    return (
      <div className="w-full">
        <StepIndicator current={3} />
        <h3 className="font-inter text-xl md:text-2xl font-bold text-black mb-2 text-center">
          Are you the person who makes hiring decisions for your firm&apos;s marketing?
        </h3>
        <p className="text-gray-500 text-sm md:text-base text-center mb-6">No wrong answer.</p>
        <div className="grid grid-cols-1 gap-3 md:gap-4">
          {[
            { value: "yes", label: "Yes, I make the call", sub: "Final say on marketing spend", icon: User },
            { value: "influence", label: "I influence the decision", sub: "Discuss with partners", icon: Users },
            { value: "someone_else", label: "Someone else decides", sub: "I'm researching for them", icon: Briefcase },
          ].map((opt) => {
            const Icon = opt.icon
            return (
              <button
                key={opt.value}
                onClick={() => selectAnswer("decisionMaker", opt.value)}
                className={`group p-4 md:p-5 rounded-2xl border-2 bg-white hover:border-[#0080FF] hover:bg-blue-50/30 transition-all duration-200 flex items-center gap-4 text-left ${
                  data.decisionMaker === opt.value ? "border-[#0080FF] bg-blue-50/30" : "border-gray-200"
                }`}
              >
                <Icon className="w-7 h-7 md:w-8 md:h-8 text-[#0080FF] flex-shrink-0" />
                <div>
                  <div className="font-bold text-gray-900 text-base md:text-lg">{opt.label}</div>
                  <div className="text-gray-500 text-xs md:text-sm">{opt.sub}</div>
                </div>
              </button>
            )
          })}
        </div>
        <BackButton />
      </div>
    )
  }

  if (step === 4) {
    return (
      <div className="w-full">
        <StepIndicator current={4} />
        <h3 className="font-inter text-xl md:text-2xl font-bold text-black mb-2 text-center">
          What&apos;s your biggest growth challenge right now?
        </h3>
        <p className="text-gray-500 text-sm md:text-base text-center mb-6">
          Be honest. This shapes your custom game plan.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {[
            { value: "not_enough_cases", label: "Not Enough Cases", sub: "Phone isn't ringing enough", icon: Phone },
            { value: "invisible_ai_search", label: "Invisible on AI Search", sub: "ChatGPT doesn't recommend your firm", icon: Search },
            { value: "bad_lead_quality", label: "Bad Lead Quality", sub: "Lead-buying services send junk", icon: TrendingDown },
            { value: "google_ads_expensive", label: "Google Ads Too Expensive", sub: "Page 3 placement, wrong cases", icon: DollarSign },
            { value: "outranked_big_firms", label: "Outranked by Big Firms", sub: "Local giants eating your market", icon: Building2 },
            { value: "ready_to_scale", label: "Ready to Scale", sub: "Things work, need systems", icon: Rocket },
          ].map((opt) => {
            const Icon = opt.icon
            return (
              <button
                key={opt.value}
                onClick={() => selectAnswer("biggestChallenge", opt.value)}
                className={`group p-4 md:p-5 rounded-2xl border-2 bg-white hover:border-[#0080FF] hover:bg-blue-50/30 transition-all duration-200 flex flex-col items-center text-center ${
                  data.biggestChallenge === opt.value ? "border-[#0080FF] bg-blue-50/30" : "border-gray-200"
                }`}
              >
                <Icon className="w-7 h-7 md:w-8 md:h-8 text-[#0080FF] mb-2" />
                <div className="font-bold text-gray-900 text-sm md:text-base">{opt.label}</div>
                <div className="text-gray-500 text-xs mt-1 hidden md:block">{opt.sub}</div>
              </button>
            )
          })}
        </div>
        <BackButton />
      </div>
    )
  }

  if (step === 5) {
    return (
      <div className="w-full">
        <StepIndicator current={5} />
        <h3 className="font-inter text-xl md:text-2xl font-bold text-black mb-2 text-center">
          How big is your firm right now?
        </h3>
        <p className="text-gray-500 text-sm md:text-base text-center mb-6">
          Be honest. This determines if our system fits.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {[
            { value: "solo", label: "Solo Practitioner", sub: "Just me, no associates yet", icon: User },
            { value: "small", label: "Small Firm", sub: "2-5 attorneys, lean staff", icon: Users },
            { value: "mid", label: "Mid-Sized", sub: "6-15 attorneys, multiple staff", icon: Building2 },
            { value: "large", label: "Large or Multi-Office", sub: "16+ attorneys or several locations", icon: Briefcase },
          ].map((opt) => {
            const Icon = opt.icon
            return (
              <button
                key={opt.value}
                onClick={() => selectAnswer("firmSize", opt.value)}
                className={`group p-5 md:p-6 rounded-2xl border-2 bg-white hover:border-[#0080FF] hover:bg-blue-50/30 transition-all duration-200 flex flex-col items-center text-center ${
                  data.firmSize === opt.value ? "border-[#0080FF] bg-blue-50/30" : "border-gray-200"
                }`}
              >
                <Icon className="w-8 h-8 md:w-10 md:h-10 text-[#0080FF] mb-3" />
                <div className="font-bold text-gray-900 text-base md:text-lg">{opt.label}</div>
                <div className="text-gray-500 text-xs md:text-sm mt-1">{opt.sub}</div>
              </button>
            )
          })}
        </div>
        <BackButton />
      </div>
    )
  }

  if (step === 6) {
    return (
      <div className="w-full">
        <StepIndicator current={6} />
        <h3 className="font-inter text-xl md:text-2xl font-bold text-black mb-2 text-center">
          How soon are you looking to take action?
        </h3>
        <p className="text-gray-500 text-sm md:text-base text-center mb-6">
          No wrong answer. This helps us prioritize.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {[
            { value: "right_now", label: "Right Now", sub: "Ready to move this week", icon: Zap },
            { value: "1_3_months", label: "1-3 Months", sub: "Planning ahead", icon: Calendar },
            { value: "researching", label: "Just Researching", sub: "Exploring options", icon: BookOpen },
          ].map((opt) => {
            const Icon = opt.icon
            return (
              <button
                key={opt.value}
                onClick={() => selectAnswer("timeline", opt.value)}
                className={`group p-5 md:p-6 rounded-2xl border-2 bg-white hover:border-[#0080FF] hover:bg-blue-50/30 transition-all duration-200 flex flex-col items-center text-center ${
                  data.timeline === opt.value ? "border-[#0080FF] bg-blue-50/30" : "border-gray-200"
                }`}
              >
                <Icon className="w-8 h-8 md:w-10 md:h-10 text-[#0080FF] mb-3" />
                <div className="font-bold text-gray-900 text-base md:text-lg">{opt.label}</div>
                <div className="text-gray-500 text-xs md:text-sm mt-1">{opt.sub}</div>
              </button>
            )
          })}
        </div>
        <BackButton />
      </div>
    )
  }

  // Step 7: Inline Cal.com embed
  const calLink = getCalLink(data)
  const fullName = `${data.firstName} ${data.lastName}`.trim()
  const notes = buildCalNotes(data)
  const params = new URLSearchParams({
    name: fullName,
    email: data.email,
    smsReminderNumber: data.phone,
    notes,
    "metadata[leadEventId]": leadEventId,
  })
  const calLinkWithParams = `${calLink}?${params.toString()}`

  return (
    <div className="w-full">
      <StepIndicator current={7} />
      <h3 className="font-inter text-xl md:text-2xl font-bold text-black mb-2 text-center">
        {isQualified(data)
          ? "Pick a time for your free AI visibility audit"
          : "Schedule a quick call to learn more"}
      </h3>
      <p className="text-gray-500 text-sm md:text-base text-center mb-6">
        15 minutes. No pushy sales tactics.
      </p>
      <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white" style={{ minHeight: 700 }}>
        <Cal
          calLink={calLinkWithParams}
          config={{
            layout: "month_view",
            name: fullName,
            email: data.email,
            smsReminderNumber: data.phone,
            notes,
            "metadata[leadEventId]": leadEventId,
          }}
          style={{ width: "100%", height: "700px", overflow: "scroll" }}
        />
      </div>
      <button
        onClick={goBack}
        className="mt-4 mx-auto flex items-center text-gray-500 hover:text-gray-700 transition-colors text-sm"
        style={{ fontFamily: "Inter" }}
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to questions
      </button>
    </div>
  )
}
