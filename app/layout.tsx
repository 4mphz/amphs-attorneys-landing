import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import FacebookPixel from "@/components/facebook-pixel"
import { PostHogProvider } from "@/components/posthog-provider"
import "./globals.css"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "Amphs AI for Attorneys | AI Search Optimization",
  description:
    "Get your law firm recommended by ChatGPT, Claude, and Perplexity when potential clients search for attorneys in your city. 25 qualified cases in 90 days or we work free.",
  generator: "",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>{/* MetaPixel import and component removed */}</head>
      <body className={`font-sans antialiased`}>
        <FacebookPixel />
        <PostHogProvider>
          {children}
        </PostHogProvider>
        <Analytics />
      </body>
    </html>
  )
}
