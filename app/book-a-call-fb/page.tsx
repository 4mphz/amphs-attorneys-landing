import ContactFormAttorneys from "@/components/contact-form-attorneys"
import { Check } from "lucide-react"

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50/30 py-8 md:py-16 px-4">
      <div className="text-center mb-8 md:mb-12 max-w-4xl mx-auto">
        <div className="flex justify-center mb-4">
          <div className="bg-white px-4 py-2 rounded-full shadow-md flex items-center gap-2">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <span className="text-xs font-semibold text-gray-700">Rated 4.9/5 by 200+ attorneys</span>
          </div>
        </div>

        <h1
          className="font-inter text-3xl md:text-5xl font-bold text-black mb-4 leading-tight"
          style={{ fontSize: "clamp(28px, 5vw, 48px)" }}
        >
          25 Qualified Cases in 90 Days.
          <br />
          <span className="text-[#0080FF]">Or We Work Free Until You Get Them.</span>
        </h1>

        <p className="text-gray-600 text-base md:text-lg px-2 max-w-2xl mx-auto">
          When potential clients ask ChatGPT for the best attorney in your city, your competitor&apos;s name comes up.
          We fix that. Book your free 15-minute AI visibility audit below.
        </p>
      </div>

      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 items-start justify-center">
        <div className="rounded-2xl p-6 md:p-8 w-full lg:w-auto lg:max-w-[588px] bg-white shadow-lg border border-gray-100">
          <div className="text-center mb-5 md:mb-6">
            <p className="font-inter text-base md:text-lg font-semibold text-gray-700 mb-2">
              Answer 4 quick questions
            </p>
            <h2
              className="font-inter text-2xl md:text-3xl font-bold text-black px-2"
              style={{ fontSize: "clamp(22px, 4.5vw, 32px)" }}
            >
              See if your firm qualifies for the guarantee
            </h2>
          </div>

          <ContactFormAttorneys />
        </div>

        <div className="w-full lg:w-auto lg:max-w-md pt-2 md:pt-4">
          <h2
            className="font-inter text-xl md:text-2xl font-bold text-black mb-6 md:mb-8 text-center lg:text-left"
            style={{ fontSize: "clamp(20px, 4vw, 28px)" }}
          >
            What to expect on our call
          </h2>

          <div className="space-y-4 md:space-y-6">
            {[
              "We audit your AI visibility live on the call. You&apos;ll see exactly what ChatGPT, Claude, and Perplexity say about your firm right now.",
              "We walk you through the same system that&apos;s ranking attorneys #1 for ChatGPT searches in their city in under 90 days.",
              "If we&apos;re a fit, we map out exactly how we&apos;ll get you 25 qualified cases in 90 days. If not, you walk away with the audit data.",
              "No pushy sales tactics. 15 minutes, real insights, you decide what to do with them.",
            ].map((text, index) => (
              <div key={index} className="flex gap-3 md:gap-4 items-start">
                <div className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full bg-blue-500 flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 md:w-4 md:h-4 text-white" strokeWidth={3} />
                </div>
                <p
                  className="font-inter text-base md:text-xl font-semibold text-gray-800"
                  style={{ fontSize: "clamp(15px, 3vw, 18px)" }}
                  dangerouslySetInnerHTML={{ __html: text }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
