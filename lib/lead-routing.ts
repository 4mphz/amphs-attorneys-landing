export interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  budgetCommitment: "" | "yes" | "no"
  businessType: "" | "law_firm" | "agency" | "other"
  decisionMaker: "" | "yes" | "influence" | "someone_else"
  biggestChallenge:
    | ""
    | "not_enough_cases"
    | "invisible_ai_search"
    | "bad_lead_quality"
    | "google_ads_expensive"
    | "outranked_big_firms"
    | "ready_to_scale"
  firmSize: "" | "solo" | "small" | "mid" | "large"
  timeline: "" | "right_now" | "1_3_months" | "researching"
}

export const QUALIFIED_CAL_LINK = "amphs/law-discovery-ads"
export const DQ_CAL_LINK = "amphs/dqdiscovery"

export type DQReason =
  | "budget_below_threshold"
  | "non_law_firm_marketing"
  | "non_law_firm_other"
  | "non_decision_maker"
  | "not_ready_researching"

export function getDQReason(data: FormData): DQReason | null {
  if (data.budgetCommitment === "no") return "budget_below_threshold"
  if (data.businessType === "agency") return "non_law_firm_marketing"
  if (data.businessType === "other") return "non_law_firm_other"
  if (data.decisionMaker === "someone_else") return "non_decision_maker"
  if (data.timeline === "researching") return "not_ready_researching"
  return null
}

export function isQualified(data: FormData): boolean {
  return getDQReason(data) === null
}

export function getCalLink(data: FormData): string {
  return isQualified(data) ? QUALIFIED_CAL_LINK : DQ_CAL_LINK
}

const CHALLENGE_LABELS: Record<FormData["biggestChallenge"], string> = {
  "": "",
  not_enough_cases: "Not Enough Cases",
  invisible_ai_search: "Invisible on AI Search",
  bad_lead_quality: "Bad Lead Quality",
  google_ads_expensive: "Google Ads Too Expensive",
  outranked_big_firms: "Outranked by Big Firms",
  ready_to_scale: "Ready to Scale",
}

const FIRM_SIZE_LABELS: Record<FormData["firmSize"], string> = {
  "": "",
  solo: "Solo Practitioner",
  small: "Small Firm (2-5)",
  mid: "Mid-Sized (6-15)",
  large: "Large or Multi-Office (16+)",
}

const TIMELINE_LABELS: Record<FormData["timeline"], string> = {
  "": "",
  right_now: "Right Now",
  "1_3_months": "1-3 Months",
  researching: "Just Researching",
}

const DECISION_MAKER_LABELS: Record<FormData["decisionMaker"], string> = {
  "": "",
  yes: "Decision-maker",
  influence: "Influences decision",
  someone_else: "Someone else decides",
}

export function buildCalNotes(data: FormData): string {
  const dqReason = getDQReason(data)
  const lines = [
    `Firm size: ${FIRM_SIZE_LABELS[data.firmSize]}`,
    `Biggest challenge: ${CHALLENGE_LABELS[data.biggestChallenge]}`,
    `Timeline: ${TIMELINE_LABELS[data.timeline]}`,
    `Decision-maker: ${DECISION_MAKER_LABELS[data.decisionMaker]}`,
    `Budget commitment: ${data.budgetCommitment === "yes" ? "Yes ($1500+/mo)" : "No"}`,
    `Status: ${dqReason ? `DQ — ${dqReason}` : "Qualified"}`,
  ]
  return lines.filter((l) => !l.endsWith(": ")).join("\n")
}
