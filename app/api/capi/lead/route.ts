import { NextRequest, NextResponse } from "next/server"
import { sendCAPIEvent } from "@/lib/meta-capi"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      eventId,
      email,
      phone,
      firstName,
      lastName,
      country,
      fbc,
      fbp,
      eventSourceUrl,
    } = body

    if (!eventId) {
      return NextResponse.json({ ok: false, error: "eventId required" }, { status: 400 })
    }

    const clientIpAddress =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      undefined
    const clientUserAgent = req.headers.get("user-agent") || undefined

    const result = await sendCAPIEvent({
      eventName: "Lead",
      eventId,
      eventSourceUrl: eventSourceUrl || req.headers.get("referer") || "https://attorneys.amphs.ai/",
      userData: {
        email,
        phone,
        firstName,
        lastName,
        country,
        clientIpAddress,
        clientUserAgent,
        fbc,
        fbp,
      },
    })

    return NextResponse.json(result, { status: result.ok ? 200 : 500 })
  } catch (error) {
    return NextResponse.json({ ok: false, error: String(error) }, { status: 500 })
  }
}
