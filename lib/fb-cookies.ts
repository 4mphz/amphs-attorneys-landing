export function getFbCookie(name: "fbc" | "fbp"): string | undefined {
  if (typeof document === "undefined") return undefined
  const match = document.cookie.match(new RegExp(`_${name}=([^;]+)`))
  return match ? match[1] : undefined
}
