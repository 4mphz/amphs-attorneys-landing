"use client"

import { Check, X } from "lucide-react"

interface ComparisonItem {
  feature: string
  subtitle?: string
  traditional: string | boolean
  amphs: string | boolean
  highlight?: boolean
}

const comparisonData: ComparisonItem[] = [
  {
    feature: "AI Search Visibility",
    subtitle: "ChatGPT, Claude, Perplexity",
    traditional: false,
    amphs: true,
    highlight: true,
  },
  {
    feature: "Lead Quality",
    traditional: "Mixed/Unqualified",
    amphs: "High-Intent Only",
    highlight: true,
  },
  {
    feature: "Exclusive Leads",
    traditional: "Shared with Other Businesses",
    amphs: "100% Exclusive to You",
    highlight: true,
  },
  {
    feature: "Competition Level",
    traditional: "Extremely High",
    amphs: "First Movers Advantage",
    highlight: true,
  },
  {
    feature: "No Long-term Contracts",
    traditional: false,
    amphs: true,
    highlight: false,
  },
  {
    feature: "Cancel Anytime",
    traditional: false,
    amphs: true,
    highlight: false,
  },
]

const renderValue = (value: string | boolean, isGood: boolean) => {
  if (typeof value === "boolean") {
    if (value) {
      return (
        <div className="flex items-center justify-center">
          <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center">
            <Check className="w-4 h-4 text-white" strokeWidth={3} />
          </div>
        </div>
      )
    } else {
      return (
        <div className="flex items-center justify-center">
          <div className="w-7 h-7 rounded-full bg-red-500 flex items-center justify-center">
            <X className="w-4 h-4 text-white" strokeWidth={3} />
          </div>
        </div>
      )
    }
  }

  return <span className={`text-sm font-semibold ${isGood ? "text-green-600" : "text-gray-600"}`}>{value}</span>
}

export function ComparisonTable() {
  return (
    <section className="w-full py-12 md:py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2
            className="text-black font-semibold text-[28px] md:text-[40px] lg:text-[48px] leading-tight mb-4"
            style={{ fontFamily: "Inter" }}
          >
            Traditional Marketing vs <span className="text-[#0080FF]">AI Search Optimization</span>
          </h2>
          <p className="text-gray-500 text-[16px] md:text-[18px] max-w-2xl mx-auto" style={{ fontFamily: "Inter" }}>
            See why forward-thinking attorneys are switching to AI search
          </p>
        </div>

        {/* Mobile View - Stacked Cards */}
        <div className="md:hidden space-y-3">
          {comparisonData.map((item, index) => (
            <div
              key={index}
              className={`rounded-xl overflow-hidden ${
                item.highlight
                  ? "shadow-[0_0_15px_rgba(0,128,255,0.3)] border border-[#0080FF]/30"
                  : "border border-gray-200"
              }`}
            >
              {/* Feature Header */}
              <div className={`px-4 py-3 ${item.highlight ? "bg-blue-50" : "bg-gray-50"}`}>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900 text-[15px]" style={{ fontFamily: "Inter" }}>
                    {item.feature}
                  </span>
                  {item.highlight && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#0080FF] text-white uppercase tracking-wide">
                      Key
                    </span>
                  )}
                </div>
                {item.subtitle && (
                  <span className="block text-[12px] text-gray-500 mt-0.5" style={{ fontFamily: "Inter" }}>
                    {item.subtitle}
                  </span>
                )}
              </div>

              {/* Comparison Row */}
              <div className="grid grid-cols-2 divide-x divide-gray-200 bg-white">
                {/* Traditional */}
                <div className="px-4 py-4 flex flex-col items-center justify-center">
                  <span
                    className="text-[11px] uppercase tracking-wider text-gray-400 mb-2 font-medium"
                    style={{ fontFamily: "Inter" }}
                  >
                    Traditional
                  </span>
                  {renderValue(item.traditional, false)}
                </div>

                {/* Amphs AI */}
                <div className="px-4 py-4 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50/50 to-white">
                  <span
                    className="text-[11px] uppercase tracking-wider text-[#0080FF] mb-2 font-semibold"
                    style={{ fontFamily: "Inter" }}
                  >
                    Amphs AI
                  </span>
                  {renderValue(item.amphs, true)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View - Full Table */}
        <div className="hidden md:block">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            {/* Table Header */}
            <div className="grid grid-cols-3 bg-gradient-to-r from-gray-50 to-gray-100">
              <div className="px-6 py-5 border-b border-gray-200">
                <span className="font-semibold text-gray-700 text-[15px]" style={{ fontFamily: "Inter" }}>
                  Feature
                </span>
              </div>
              <div className="px-6 py-5 border-b border-gray-200 text-center">
                <span className="font-semibold text-gray-500 text-[15px]" style={{ fontFamily: "Inter" }}>
                  Traditional Marketing
                </span>
              </div>
              <div className="px-6 py-5 border-b border-gray-200 text-center bg-gradient-to-r from-blue-50 to-blue-100/50">
                <span className="font-bold text-[#0080FF] text-[15px]" style={{ fontFamily: "Inter" }}>
                  Amphs AI ✨
                </span>
              </div>
            </div>

            {/* Table Body */}
            {comparisonData.map((item, index) => (
              <div
                key={index}
                className={`grid grid-cols-3 ${
                  index !== comparisonData.length - 1 ? "border-b border-gray-100" : ""
                } ${item.highlight ? "bg-yellow-50/30" : index % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}
              >
                <div className="px-6 py-4 flex items-center">
                  <div>
                    <span
                      className={`text-[15px] ${item.highlight ? "font-semibold text-gray-900" : "text-gray-700"}`}
                      style={{ fontFamily: "Inter" }}
                    >
                      {item.feature}
                      {item.highlight && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#0080FF] text-white uppercase tracking-wide">
                          Key
                        </span>
                      )}
                    </span>
                    {item.subtitle && (
                      <span className="block text-[12px] text-gray-500 mt-0.5" style={{ fontFamily: "Inter" }}>
                        {item.subtitle}
                      </span>
                    )}
                  </div>
                </div>
                <div className="px-6 py-4 flex items-center justify-center border-l border-gray-100">
                  {renderValue(item.traditional, false)}
                </div>
                <div className="px-6 py-4 flex items-center justify-center border-l border-gray-100 bg-gradient-to-r from-blue-50/30 to-transparent">
                  {renderValue(item.amphs, true)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Summary Card */}
        <div className="mt-8 md:mt-12 bg-gradient-to-br from-[#0080FF] to-blue-600 rounded-2xl p-6 md:p-8 text-white text-center">
          <h3 className="text-xl md:text-2xl font-bold mb-3" style={{ fontFamily: "Inter" }}>
            The Bottom Line
          </h3>
          <p
            className="text-blue-100 text-[15px] md:text-[17px] max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "Inter" }}
          >
            When someone asks AI for your services/product, they&apos;re ready to buy - not browsing. Amphs AI delivers
            these high-intent leads exclusively to you. No bidding wars. No shared leads. Just clients who are actively
            looking for exactly what you offer.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center items-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-sm font-medium">🎯 Qualified High-Intent Leads</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-sm font-medium">🏆 Zero Competition = 99% Success Rate</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-sm font-medium">🚀 First-mover advantage</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
