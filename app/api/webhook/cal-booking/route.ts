import { NextRequest, NextResponse } from "next/server"
import { sendCAPIEvent } from "@/lib/meta-capi"

interface CalAttendee {
  email?: string
  name?: string
  timeZone?: string
}

interface CalBookingPayload {
  uid?: string
  type?: string
  attendees?: CalAttendee[]
  responses?: Record<string, unknown>
  metadata?: Record<string, unknown>
  startTime?: string
  endTime?: string
}

interface CalWebhookBody {
  triggerEvent?: string
  payload?: CalBookingPayload
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CalWebhookBody

    if (body.triggerEvent !== "BOOKING_CREATED") {
      return NextResponse.json({ ok: true, skipped: true, reason: body.triggerEvent }, { status: 200 })
    }

    const booking = body.payload || {}
    const attendees = booking.attendees || []
    const primary = attendees[0] || {}
    const responses = (booking.responses || {}) as Record<string, unknown>
    const metadata = (booking.metadata || {}) as Record<string, unknown>

    const eventId =
      (metadata.leadEventId as string) ||
      (responses.leadEventId as string) ||
      booking.uid ||
      `cal_${Date.now()}`

    const fullName = primary.name?.trim() || ""
    const [firstName, ...rest] = fullName.split(" ")
    const lastName = rest.join(" ").trim()

    const result = await sendCAPIEvent({
      eventName: "Schedule",
      eventId,
      eventSourceUrl: "https://attorneys.amphs.ai/book-a-call-fb",
      userData: {
        email: primary.email,
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        country: "US",
      },
    })

    return NextResponse.json({ ok: true, capi: result, eventId })
  } catch (error) {
    return NextResponse.json({ ok: false, error: String(error) }, { status: 500 })
  }
}
