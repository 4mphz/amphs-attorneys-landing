"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, Suspense } from "react"
import posthog from "posthog-js"
import { PostHogProvider as PHProvider } from "posthog-js/react"

function PostHogPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!pathname) return
    let url = window.origin + pathname
    if (searchParams?.toString()) {
      url = url + "?" + searchParams.toString()
    }
    posthog.capture("$pageview", { $current_url: url })
  }, [pathname, searchParams])

  return null
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
    const apiHost = "/ingest"
    const uiHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.posthog.com"

    console.log("[PostHogProvider] mounting. key present:", !!key, "api_host:", apiHost, "ui_host:", uiHost)

    if (!key) {
      console.warn("[PostHogProvider] NEXT_PUBLIC_POSTHOG_KEY missing, PostHog disabled")
      return
    }
    if (posthog.__loaded) {
      console.log("[PostHogProvider] already loaded, skipping init")
      return
    }

    posthog.init(key, {
      api_host: apiHost,
      ui_host: uiHost,
      capture_pageview: false,
      capture_pageleave: true,
      person_profiles: "always",
      session_recording: {
        maskAllInputs: false,
        maskInputOptions: {
          password: true,
        },
      },
      autocapture: true,
      loaded: (ph) => {
        console.log("[PostHogProvider] init complete, distinct_id:", ph.get_distinct_id())
        ph.debug()
      },
    })
  }, [])

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </PHProvider>
  )
}
