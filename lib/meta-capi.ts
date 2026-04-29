import { createHash } from "crypto"

const GRAPH_API_VERSION = "v21.0"

function sha256(value: string): string {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex")
}

function normalizePhone(phone: string): string {
  return phone.replace(/[^0-9]/g, "")
}

function normalizeName(name: string): string {
  return name.trim().toLowerCase()
}

export interface CAPIUserData {
  email?: string
  phone?: string
  firstName?: string
  lastName?: string
  country?: string
  clientIpAddress?: string
  clientUserAgent?: string
  fbc?: string
  fbp?: string
}

export interface CAPIEvent {
  eventName: "Lead" | "Schedule" | "ViewContent" | "PageView"
  eventId: string
  eventTime?: number
  eventSourceUrl: string
  userData: CAPIUserData
  customData?: Record<string, unknown>
}

export async function sendCAPIEvent(event: CAPIEvent): Promise<{ ok: boolean; error?: string }> {
  const pixelId = process.env.META_PIXEL_ID
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN
  const testEventCode = process.env.META_TEST_EVENT_CODE

  if (!pixelId || !accessToken) {
    return { ok: false, error: "META_PIXEL_ID or META_CAPI_ACCESS_TOKEN missing" }
  }

  const userData: Record<string, string | string[]> = {}
  if (event.userData.email) userData.em = sha256(event.userData.email)
  if (event.userData.phone) userData.ph = sha256(normalizePhone(event.userData.phone))
  if (event.userData.firstName) userData.fn = sha256(normalizeName(event.userData.firstName))
  if (event.userData.lastName) userData.ln = sha256(normalizeName(event.userData.lastName))
  if (event.userData.country) userData.country = sha256(event.userData.country.toLowerCase())
  if (event.userData.clientIpAddress) userData.client_ip_address = event.userData.clientIpAddress
  if (event.userData.clientUserAgent) userData.client_user_agent = event.userData.clientUserAgent
  if (event.userData.fbc) userData.fbc = event.userData.fbc
  if (event.userData.fbp) userData.fbp = event.userData.fbp

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: event.eventName,
        event_time: event.eventTime ?? Math.floor(Date.now() / 1000),
        event_id: event.eventId,
        event_source_url: event.eventSourceUrl,
        action_source: "website",
        user_data: userData,
        ...(event.customData ? { custom_data: event.customData } : {}),
      },
    ],
  }

  if (testEventCode) {
    payload.test_event_code = testEventCode
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_API_VERSION}/${pixelId}/events?access_token=${accessToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    )

    if (!res.ok) {
      const text = await res.text()
      return { ok: false, error: `Meta CAPI ${res.status}: ${text}` }
    }

    return { ok: true }
  } catch (error) {
    return { ok: false, error: String(error) }
  }
}
