const STORAGE_KEY = "attorneys_v2_form_data"
const ONE_HOUR_MS = 60 * 60 * 1000

export function saveFormData<T>(data: T): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ data, savedAt: Date.now() }),
    )
  } catch {
    // ignore (quota exceeded, private browsing, etc.)
  }
}

export function loadFormData<T>(): T | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as { data: T; savedAt: number }
    if (Date.now() - parsed.savedAt > ONE_HOUR_MS) {
      localStorage.removeItem(STORAGE_KEY)
      return null
    }
    return parsed.data
  } catch {
    return null
  }
}

export function clearFormData(): void {
  if (typeof window === "undefined") return
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
}
