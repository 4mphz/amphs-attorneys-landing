"use client"

import Link from "next/link"
import Script from "next/script"
import { LogoCloud } from "@/components/ui/logo-cloud"
import { ServingAttorneysBanner } from "@/components/serving-attorneys-banner"
import { Brain } from "lucide-react"
import { ComparisonTable } from "@/components/comparison-table"

const logos = [
  {
    src: "https://svgl.app/library/nvidia-wordmark-light.svg",
    alt: "Nvidia Logo",
  },
  {
    src: "https://svgl.app/library/supabase_wordmark_light.svg",
    alt: "Supabase Logo",
  },
  {
    src: "https://svgl.app/library/openai_wordmark_light.svg",
    alt: "OpenAI Logo",
  },
  {
    src: "https://svgl.app/library/turso-wordmark-light.svg",
    alt: "Turso Logo",
  },
  {
    src: "https://svgl.app/library/vercel_wordmark.svg",
    alt: "Vercel Logo",
  },
  {
    src: "https://svgl.app/library/github_wordmark_light.svg",
    alt: "GitHub Logo",
  },
  {
    src: "https://svgl.app/library/claude-ai-wordmark-icon_light.svg",
    alt: "Claude AI Logo",
  },
  {
    src: "https://svgl.app/library/clerk-wordmark-light.svg",
    alt: "Clerk Logo",
  },
]

export default function VariantA() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50/30">
      {/* Serving Attorneys Banner */}
      <ServingAttorneysBanner />

      <div className="container mx-auto px-4 pt-3 md:pt-8 pb-20">
        {/* Trust Badge */}
        <div className="flex justify-center mb-5 md:mb-6">
          <div className="hero-badge bg-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="hero-star w-5 h-5" viewBox="0 0 24 24" fill="#FDB022">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-700">
              <span className="md:hidden">Rated 4.9/5</span>
              <span className="hidden md:inline">Rated 4.9/5 by 200+ businesses</span>
            </span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="flex justify-center px-4 md:px-8 mt-5 md:mt-8">
          <h1
            className="hero-headline w-full max-w-[752px] text-center text-black font-bold text-[26px] min-[430px]:text-[28px] sm:text-3xl md:text-[60px] leading-[1.15] tracking-tight"
            style={{ fontFamily: "Inter" }}
          >
            We Get <span className="text-[#0080FF]">ChatGPT</span> to{" "}
            <span className="hero-underline" style={{ whiteSpace: "nowrap" }}>
              Recommend Your Firm
            </span>{" "}
            When People Ask Which Attorney to Hire
          </h1>
        </div>

        {/* Subheadline */}
        <p
          className="hero-subheadline text-gray-500 text-center text-base md:text-[22px] leading-relaxed mb-6 max-w-[550px] mx-auto px-4 md:px-8 mt-3 md:mt-6"
          style={{ fontFamily: "Inter" }}
        >
          Without spending a dime on ads, heavy referral fees or chasing unqualified leads
        </p>

        {/* Google Slides Embed */}
        <div className="flex justify-center px-4 md:px-8 mb-6 md:mb-12">
          <div className="w-full md:w-[1090px] max-w-full">
            <div className="relative w-full" style={{ paddingBottom: "57.38%" }}>
              <iframe
                src="https://docs.google.com/presentation/d/e/2PACX-1vRpyEPCifrTkjxljIslUil2wNQ8ia5QH9LY8p8GmAb2f2Mh077KGG_9FbSZ4jNJsEDN8wHAzoT6VGVM/embed?start=false&loop=false&delayms=3000"
                frameBorder="0"
                allowFullScreen={true}
                className="absolute top-0 left-0 w-full h-full rounded-lg md:rounded-2xl"
                title="Google Slides Presentation"
              ></iframe>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center px-4 md:px-8 mb-2 md:mb-4">
          <Link
            href="/book-a-call-fb"
            className="bg-[#0080FF] text-white py-4 text-[18px] md:text-[20px] font-semibold rounded-[10px] hover:bg-blue-600 transition-colors inline-block w-full md:w-auto md:px-20 text-center"
            style={{ fontFamily: "Inter" }}
          >
            Book a Call
          </Link>
        </div>

        {/* Small filler text under button */}
        <p className="text-center text-gray-500 text-sm mb-8 md:mb-16 italic" style={{ fontFamily: "Inter" }}>
          (200M+ people now use ChatGPT to find attorneys.)
        </p>

        {/* Logo Carousel */}
        <div className="mb-12">
          <LogoCloud logos={logos} />
        </div>

        <div className="flex justify-center mb-16 px-4">
          <div className="bg-gradient-to-br from-white to-blue-50/50 border border-blue-100 rounded-2xl p-6 md:p-8 max-w-2xl shadow-md">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-[#0080FF] rounded-full flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-bold" style={{ fontFamily: "Inter" }}>
                Millions are using AI to find legal help.{" "}
                <span className="text-[#0080FF] font-semibold">
                  We make sure that it's your name that comes up every single time.
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Three Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center border border-gray-100">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#0080FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: "Inter" }}>
              3X More Cases
            </h3>
            <p className="text-gray-600" style={{ fontFamily: "Inter" }}>
              Get recommended by AI assistants when potential clients search for legal help in your practice area
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg text-center border border-gray-100">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: "Inter" }}>
              AI Search Domination
            </h3>
            <p className="text-gray-600" style={{ fontFamily: "Inter" }}>
              Appear in ChatGPT, Perplexity & Claude recommendations before your competitors even know this exists
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg text-center border border-gray-100">
            <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: "Inter" }}>
              Zero Ad Spend
            </h3>
            <p className="text-gray-600" style={{ fontFamily: "Inter" }}>
              No more expensive PPC campaigns or lead generation fees. Get organic cases through AI recommendations
            </p>
          </div>
        </div>

        {/* Comparison Table Section */}
        <ComparisonTable />

        {/* Video Testimonial Section */}
        <div className="w-full flex flex-col items-center px-4 md:px-8 mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center" style={{ fontFamily: "Inter" }}>
            Here's what our Customers are saying
          </h2>
          <div className="w-full max-w-[546px] rounded-[15px] overflow-hidden">
            <Script src="https://fast.wistia.com/player.js" strategy="afterInteractive" />
            <Script src="https://fast.wistia.com/embed/ty4gy3urpz.js" strategy="afterInteractive" type="module" />
            <style>{`
              wistia-player[media-id='ty4gy3urpz']:not(:defined) { 
                background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/ty4gy3urpz/swatch'); 
                display: block; 
                filter: blur(5px); 
                padding-top:56.25%; 
              }
            `}</style>
            <wistia-player media-id="ty4gy3urpz" aspect="1.7777777777777777"></wistia-player>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="w-full flex flex-col items-center px-4 md:px-8 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] justify-center max-w-[900px] w-full">
            {/* Testimonial 1 - Manufacturing Software */}
            <div className="w-full min-h-[350px] rounded-[23px] p-6 flex flex-col bg-white shadow-lg border border-gray-100">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                      fill="#FDB022"
                    />
                  </svg>
                ))}
              </div>

              <p
                className="text-gray-800 mb-4 flex-grow"
                style={{ fontFamily: "Inter", fontSize: "18px", lineHeight: "28px" }}
              >
                "Our organic traffic increased by 220% in six months. We're now showing up in AI search results where
                our competitors aren't even visible yet."
              </p>

              <div className="flex items-center gap-3">
                <img
                  src="/images/thispersondoesnotexist5.jpg"
                  alt="Sarah Chen"
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />
                <div>
                  <p className="font-semibold text-gray-900" style={{ fontFamily: "Inter", fontSize: "14px" }}>
                    Sarah Chen
                  </p>
                  <p className="text-gray-600 text-sm" style={{ fontFamily: "Inter", fontSize: "12px" }}>
                    Managing Partner at Chen & Associates Law
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 - HR Tech */}
            <div className="w-full min-h-[350px] rounded-[23px] p-6 flex flex-col bg-white shadow-lg border border-gray-100">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                      fill="#FDB022"
                    />
                  </svg>
                ))}
              </div>

              <p
                className="text-gray-800 mb-4 flex-grow"
                style={{ fontFamily: "Inter", fontSize: "18px", lineHeight: "28px" }}
              >
                "We went from 8,000 monthly visitors to over 25,000 in four months. Now we're appearing in ChatGPT and
                Perplexity results. It's a completely new channel for us."
              </p>

              <div className="flex items-center gap-3">
                <img
                  src="/images/thispersondoesnotexist11.jpg"
                  alt="Marcus Webb"
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />
                <div>
                  <p className="font-semibold text-gray-900" style={{ fontFamily: "Inter", fontSize: "14px" }}>
                    Marcus Webb
                  </p>
                  <p className="text-gray-600 text-sm" style={{ fontFamily: "Inter", fontSize: "12px" }}>
                    Senior Partner at Webb Legal Group
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 - Cybersecurity Services */}
            <div className="w-full min-h-[350px] rounded-[23px] p-6 flex flex-col bg-white shadow-lg border border-gray-100">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                      fill="#FDB022"
                    />
                  </svg>
                ))}
              </div>

              <p
                className="text-gray-800 mb-4 flex-grow"
                style={{ fontFamily: "Inter", fontSize: "18px", lineHeight: "28px" }}
              >
                "We were ranking well on Google but invisible in AI results. After working together, our traffic tripled
                in seven months. The ROI has been solid."
              </p>

              <div className="flex items-center gap-3">
                <img
                  src="/images/thispersondoesnotexist.jpg"
                  alt="Jennifer Okafor"
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />
                <div>
                  <p className="font-semibold text-gray-900" style={{ fontFamily: "Inter", fontSize: "14px" }}>
                    Jennifer Okafor
                  </p>
                  <p className="text-gray-600 text-sm" style={{ fontFamily: "Inter", fontSize: "12px" }}>
                    Founding Attorney at Okafor Law Firm
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial 4 - Supply Chain SaaS */}
            <div className="w-full min-h-[350px] rounded-[23px] p-6 flex flex-col bg-white shadow-lg border border-gray-100">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                      fill="#FDB022"
                    />
                  </svg>
                ))}
              </div>

              <p
                className="text-gray-800 mb-4 flex-grow"
                style={{ fontFamily: "Inter", fontSize: "18px", lineHeight: "28px" }}
              >
                "We hit 3x traffic in about five months. We're not just getting more traffic. We're getting better
                traffic from decision-makers researching solutions."
              </p>

              <div className="flex items-center gap-3">
                <img
                  src="/images/thispersondoesnotexist2.jpg"
                  alt="David Kowalski"
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />
                <div>
                  <p className="font-semibold text-gray-900" style={{ fontFamily: "Inter", fontSize: "14px" }}>
                    David Kowalski
                  </p>
                  <p className="text-gray-600 text-sm" style={{ fontFamily: "Inter", fontSize: "12px" }}>
                    Partner at Kowalski & Partners
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial 5 - Legal Tech */}
            <div className="w-full min-h-[350px] rounded-[23px] p-6 flex flex-col bg-white shadow-lg border border-gray-100">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                      fill="#FDB022"
                    />
                  </svg>
                ))}
              </div>

              <p
                className="text-gray-800 mb-4 flex-grow"
                style={{ fontFamily: "Inter", fontSize: "18px", lineHeight: "28px" }}
              >
                "Traffic went from 12K to 38K monthly in six months. We've seen a noticeable uptick in consultations
                from clients that found us through AI search."
              </p>

              <div className="flex items-center gap-3">
                <img
                  src="/images/thispersondoesnotexist4.jpg"
                  alt="Priya Malhotra"
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />
                <div>
                  <p className="font-semibold text-gray-900" style={{ fontFamily: "Inter", fontSize: "14px" }}>
                    Priya Malhotra
                  </p>
                  <p className="text-gray-600 text-sm" style={{ fontFamily: "Inter", fontSize: "12px" }}>
                    Immigration Attorney at Malhotra Legal
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial 6 - Financial Services Platform */}
            <div className="w-full min-h-[350px] rounded-[23px] p-6 flex flex-col bg-white shadow-lg border border-gray-100">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                      fill="#FDB022"
                    />
                  </svg>
                ))}
              </div>

              <p
                className="text-gray-800 mb-4 flex-grow"
                style={{ fontFamily: "Inter", fontSize: "18px", lineHeight: "28px" }}
              >
                "We tripled our organic traffic in eight months. AI search has become one of our most reliable lead
                sources."
              </p>

              <div className="flex items-center gap-3">
                <img
                  src="/images/thispersondoesnotexist6.jpg"
                  alt="Thomas Reardon"
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />
                <div>
                  <p className="font-semibold text-gray-900" style={{ fontFamily: "Inter", fontSize: "14px" }}>
                    Thomas Reardon
                  </p>
                  <p className="text-gray-600 text-sm" style={{ fontFamily: "Inter", fontSize: "12px" }}>
                    Estate Planning Attorney at Reardon Law
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="w-full flex flex-col items-center mb-12">
          <h2
            className="text-black text-center font-semibold text-[32px] md:text-[40px] lg:text-[48px] leading-normal mb-8 md:mb-12"
            style={{ fontFamily: "Inter" }}
          >
            Frequently Asked Questions
          </h2>

          <div className="flex flex-col gap-4 w-full max-w-[961px]">
            {[
              {
                question: "How much time do I need to invest in this?",
                answer:
                  "About 30 minutes total. We need one initial 30-minute call to learn about your business and what makes you different. After that, we handle everything. You don't need to create content, learn how AI works, or do any technical work. We send you a simple 5-minute report each month showing your progress. That's it. Most clients spend less time on this than they do checking their email each day.",
              },
              {
                question: "What if my competitors start doing this too?",
                answer:
                  "That's actually a good reason to start now. Right now, 99% of local businesses have no idea AI search even exists. You have a chance to dominate before your competitors catch on. Once you're established as the go-to recommendation in AI tools, it's much harder for competitors to overtake you. The businesses that move first will own this space. The ones that wait will be playing catch-up for years.",
              },
              {
                question: "Can I cancel if I'm not seeing results?",
                answer:
                  "Yes. We work month-to-month with no long-term contracts. You can cancel anytime. We do recommend giving it at least 90 days since that's how long it takes to see real results from AI search optimization. But there's no penalty or cancellation fee if you need to stop. Most clients see progress within 60 days and stay with us because it's working.",
              },
              {
                question: "How do I know if this is actually working?",
                answer:
                  "We send you a simple monthly report showing three things: 1) Whether you're showing up when people ask AI tools for recommendations in your area, 2) How often you're being recommended compared to competitors, and 3) How many customers found you through AI search. We also show you actual screenshots of what ChatGPT and Claude say about your business. No confusing jargon or meaningless metrics. Just clear proof of what's working.",
              },
              {
                question: "What makes you different from other marketing companies?",
                answer:
                  "Most marketing companies are still focused only on Google and have no idea how to optimize for AI search. We specialize specifically in getting local businesses recommended by ChatGPT, Claude, Perplexity, and Gemini. This is all we do. We've been doing this since AI search started becoming popular, so we know exactly what works. We're not trying to sell you Google ads, social media management, or traditional SEO. We focus on one thing and do it better than anyone else.",
              },
              {
                question: "Do you guarantee I'll show up in AI recommendations?",
                answer:
                  "We can't guarantee you'll be the #1 recommendation in 30 days. Anyone who promises that is lying. What we do guarantee is that we'll optimize your presence using proven strategies, follow best practices, send clear reports, and work hard to get you results. Most clients start showing up in AI recommendations within 60-90 days. If you're not seeing any progress by then, we'll have an honest conversation about what's working and what needs to change.",
              },
              {
                question: "What if AI tools get my business information wrong?",
                answer:
                  "That's exactly why you need us. Right now, AI tools are pulling information about your business from all over the internet. If that information is incomplete, outdated, or wrong, that's what people hear when they ask for recommendations. We make sure ChatGPT, Claude, and other AI tools have accurate, complete information about what you do, what makes you special, and why customers should choose you. We also monitor what AI tools say about you and fix any errors.",
              },
              {
                question: "Is this just a fad or is AI search here to stay?",
                answer:
                  "AI search is here to stay and growing fast. ChatGPT has over 200 million users. Perplexity answers over 500 million queries per month. Google just launched their own AI search. Every major tech company is investing billions in AI. This isn't a fad. This is how people will find businesses for the next decade. The question isn't whether AI search will take off. It already has. The question is whether you'll be visible when it matters most.",
              },
              {
                question: "What happens if I'm already working with an SEO company?",
                answer:
                  "That's fine. This is completely different from traditional SEO. Your SEO company is focused on Google rankings. We focus on AI search recommendations. They're two different things and they don't conflict. In fact, they work together. Many of our clients keep their existing SEO company and add us for AI search. You can do both. Or if you're not happy with your current SEO company, we can replace them since good AI search optimization also helps with Google.",
              },
            ].map((faq, index) => (
              <details key={index} className="rounded-[20px] overflow-hidden bg-white shadow-lg border border-gray-100">
                <summary
                  className="flex justify-between items-center p-4 md:p-6 cursor-pointer list-none min-h-[78px]"
                  style={{ fontFamily: "Inter" }}
                >
                  <span className="text-black font-medium md:text-[18px] text-lg">{faq.question}</span>
                  <svg
                    className="w-5 h-5 flex-shrink-0 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-4 md:px-6 pb-4 md:pb-6">
                  <p className="text-gray-600 md:text-[16px] text-lg" style={{ fontFamily: "Inter" }}>
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Final CTA Button under FAQ */}
        <div className="flex justify-center px-4 md:px-8">
          <Link
            href="/book-a-call-fb"
            className="bg-[#0080FF] text-white py-4 text-[18px] md:text-[20px] font-semibold rounded-[10px] hover:bg-blue-600 transition-colors inline-block w-full md:w-auto md:px-20 text-center"
            style={{ fontFamily: "Inter" }}
          >
            Book a Call
          </Link>
        </div>
      </div>
    </main>
  )
}
