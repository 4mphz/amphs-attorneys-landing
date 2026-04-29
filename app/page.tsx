import Link from "next/link"
import { ServingAttorneysBanner } from "@/components/serving-attorneys-banner"
import { ComparisonTable } from "@/components/comparison-table"
import {
  Brain,
  Search,
  TrendingUp,
  ShieldCheck,
  Target,
  Zap,
  CheckCircle2,
  XCircle,
  ArrowRight,
} from "lucide-react"

const TESTIMONIALS = [
  {
    name: "Marcos Godoy",
    title: "Managing Attorney, Godoy Law Office",
    location: "Oakbrook IL",
    quote:
      "ChatGPT was recommending the firm two zip codes over. Now when someone asks for an immigration attorney in our area, our name comes up first. The leads come in already knowing who we are.",
    metric: "ChatGPT Rank: Not listed → #1 in 60 days",
    image: "/images/thispersondoesnotexist5.jpg",
  },
  {
    name: "Sarah Patel",
    title: "Founding Attorney, Patel Immigration",
    location: "Houston TX",
    quote:
      "Our consultations from AI search now outpace our Google Ads pipeline. Better leads, lower cost, and they convert closer to referral rates.",
    metric: "Monthly traffic: 12K → 38K in 6 months",
    image: "/images/thispersondoesnotexist4.jpg",
  },
  {
    name: "David Kowalski",
    title: "Partner, Kowalski Personal Injury",
    location: "Phoenix AZ",
    quote:
      "Other PI firms in town are paying $80 a click on Google. We're getting cases for free from AI search. The math is not even close.",
    metric: "Cases sourced from AI: 0 → 14 per month",
    image: "/images/thispersondoesnotexist2.jpg",
  },
  {
    name: "Jennifer Okafor",
    title: "Managing Partner, Okafor Family Law",
    location: "Las Vegas NV",
    quote:
      "What surprised me was how pre-sold the leads were. People had already decided they wanted us before they called. They had already asked ChatGPT and we came up.",
    metric: "Consultation-to-retainer rate: 31% → 58%",
    image: "/images/thispersondoesnotexist.jpg",
  },
  {
    name: "Marcus Webb",
    title: "Senior Partner, Webb Criminal Defense",
    location: "Tucson AZ",
    quote:
      "We are now visible in 100% of our service area on AI search. Took less than a month to get there. Our biggest competitor has zero visibility.",
    metric: "AI visibility coverage: 0% → 100%",
    image: "/images/thispersondoesnotexist11.jpg",
  },
  {
    name: "Thomas Reardon",
    title: "Founding Attorney, Reardon Estate Law",
    location: "Denver CO",
    quote:
      "Tripled our organic intake in eight months. AI search has become one of our most reliable lead sources. We are not spending a dime more on ads.",
    metric: "Organic intake: 3x in 8 months",
    image: "/images/thispersondoesnotexist6.jpg",
  },
]

const FAQS = [
  {
    question: "How is this different from SEO?",
    answer:
      "SEO is about getting clicks from Google search results. We focus on AI search recommendations from ChatGPT, Claude, Perplexity, and Google AI Overviews. When someone asks an AI tool who the best attorney in their area is, that's a different system with different rules. Most SEO companies have not figured out how to influence what AI tools say. We specialize in it.",
  },
  {
    question: "What if my competitors start doing this too?",
    answer:
      "That's the reason to start now. About 99% of law firms have no idea AI search even exists. You have a window to dominate before they catch on. Once you're established as the firm AI tools recommend, it's much harder for anyone to overtake you. First movers compound. Late movers spend years catching up.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. Month-to-month, no long-term contract, no cancellation fee. We do recommend giving it 90 days because that's how long it usually takes to see real results. If you're not seeing progress by then, we have an honest conversation about what's working and what is not.",
  },
  {
    question: "How do I know it is actually working?",
    answer:
      "We send you a simple monthly report with three things: whether you are showing up when people ask AI tools for attorney recommendations in your area, how often you are recommended versus your competitors, and how many cases came in through AI. We include actual screenshots of what ChatGPT and Claude say about your firm. No vanity metrics.",
  },
  {
    question: "How much time do I have to spend on this?",
    answer:
      "About 30 minutes total. One 30-minute onboarding call so we understand your firm and what makes you different. After that we handle everything. Five minutes a month to read the report. That is it.",
  },
  {
    question: "Do you guarantee results?",
    answer:
      "We guarantee 25 qualified cases in 90 days. If we do not deliver, we keep working at zero cost until you get them. If anyone in this space tells you they guarantee a specific ChatGPT ranking in 30 days, they are lying. AI search ranking is more nuanced than that. What we can promise is the case count.",
  },
  {
    question: "What happens if AI tools say something wrong about my firm?",
    answer:
      "That is exactly why you need this. Right now AI tools are pulling info about your firm from across the internet. If that information is incomplete, outdated, or wrong, that is what people hear when they ask for a recommendation. We make sure ChatGPT, Claude, and Perplexity have accurate, complete information about your practice areas, your differentiators, and why someone should choose you. We also monitor and fix errors as they appear.",
  },
  {
    question: "Is AI search a fad?",
    answer:
      "ChatGPT has over 200 million weekly active users. Perplexity answers 500 million queries per month. Google has launched AI Overviews on every search. Every major tech company has bet billions on this. AI search is how people will find businesses for the next decade. The question is whether your firm is visible when it matters.",
  },
]

const HOW_IT_WORKS = [
  {
    number: "01",
    title: "Audit your AI visibility",
    duration: "15 minutes",
    description:
      "We run a live audit on the call. You see exactly what ChatGPT, Claude, and Perplexity say about your firm right now, who they recommend instead, and where you stand in your service area.",
    icon: Search,
  },
  {
    number: "02",
    title: "Build your AI foundation",
    duration: "First 60 days",
    description:
      "We set up the schema, the directory presence, the citations, and the content layer that AI tools use to decide who to recommend. This is the work most firms never even know about.",
    icon: ShieldCheck,
  },
  {
    number: "03",
    title: "Keep you visible and growing",
    duration: "Ongoing",
    description:
      "We monitor your AI search position monthly, fix errors as they appear, and keep optimizing as the AI search landscape changes. You get a clear monthly report. No jargon.",
    icon: TrendingUp,
  },
]

const VALUE_PROPS = [
  {
    icon: Target,
    title: "3X More Qualified Cases",
    description:
      "AI-recommended leads convert closer to referral rates. They already know who you are by the time they call.",
    color: "blue",
  },
  {
    icon: Brain,
    title: "AI Search Domination",
    description:
      "Show up first in ChatGPT, Claude, Perplexity, and Google AI Overviews when someone in your city asks for an attorney.",
    color: "green",
  },
  {
    icon: Zap,
    title: "Stop Paying Per Lead",
    description:
      "Organic recommendations from AI tools, not $80 Google ad clicks shared with three other firms in your zip code.",
    color: "purple",
  },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50/30">
      <ServingAttorneysBanner />

      <div className="container mx-auto px-4 pt-3 md:pt-8 pb-20">
        {/* Trust badge */}
        <div className="flex justify-center mb-5 md:mb-6">
          <div className="bg-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5" viewBox="0 0 24 24" fill="#FDB022">
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

        {/* Hero headline */}
        <div className="flex justify-center px-4 md:px-8 mt-5 md:mt-8">
          <h1
            className="w-full max-w-[900px] text-center text-black font-bold text-[28px] min-[430px]:text-[32px] sm:text-4xl md:text-[58px] leading-[1.1] tracking-tight"
            style={{ fontFamily: "Inter" }}
          >
            25 Qualified Cases in 90 Days.{" "}
            <span className="text-[#0080FF]">Or We Work Free Until You Get Them.</span>
          </h1>
        </div>

        <p
          className="text-gray-600 text-center text-base md:text-[20px] leading-relaxed mb-8 max-w-[640px] mx-auto px-4 md:px-8 mt-4 md:mt-6"
          style={{ fontFamily: "Inter" }}
        >
          When potential clients ask ChatGPT for the best attorney in your city, your competitor&apos;s name comes up.
          We fix that.
        </p>

        {/* Google Slides Embed */}
        <div className="flex justify-center px-4 md:px-8 mb-6 md:mb-10">
          <div className="w-full md:w-[1090px] max-w-full">
            <div className="relative w-full" style={{ paddingBottom: "57.38%" }}>
              <iframe
                src="https://docs.google.com/presentation/d/e/2PACX-1vRpyEPCifrTkjxljIslUil2wNQ8ia5QH9LY8p8GmAb2f2Mh077KGG_9FbSZ4jNJsEDN8wHAzoT6VGVM/embed?start=false&loop=false&delayms=3000"
                frameBorder="0"
                allowFullScreen={true}
                className="absolute top-0 left-0 w-full h-full rounded-lg md:rounded-2xl shadow-lg"
                title="How Amphs AI gets law firms recommended by ChatGPT"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Hero CTA */}
        <div className="flex flex-col items-center px-4 md:px-8 mb-3 md:mb-4">
          <Link
            href="/book-a-call-fb"
            className="bg-[#0080FF] text-white py-4 text-[18px] md:text-[20px] font-semibold rounded-[10px] hover:bg-blue-600 transition-colors inline-block w-full max-w-md md:w-auto md:px-20 text-center"
            style={{ fontFamily: "Inter" }}
          >
            See If You Qualify
          </Link>
          <p className="text-center text-gray-500 text-sm mt-3 italic" style={{ fontFamily: "Inter" }}>
            Free 15-minute AI visibility audit. No long-term contracts.
          </p>
        </div>

        {/* Problem block - Future Clients Are Asking ChatGPT */}
        <section className="mt-20 md:mt-32 max-w-5xl mx-auto px-4">
          <div className="text-center mb-10 md:mb-14">
            <h2
              className="text-black font-bold text-[28px] md:text-[44px] leading-tight mb-4"
              style={{ fontFamily: "Inter" }}
            >
              Your Future Clients Are Already Asking <span className="text-[#0080FF]">ChatGPT</span>
            </h2>
            <p
              className="text-gray-600 text-base md:text-[18px] max-w-2xl mx-auto"
              style={{ fontFamily: "Inter" }}
            >
              The internet is changing how people find attorneys. The firms that adapt first are the ones being
              recommended. Everyone else is invisible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
              <div className="text-[44px] md:text-[56px] font-bold text-[#0080FF] mb-2" style={{ fontFamily: "Inter" }}>
                200M+
              </div>
              <p className="text-gray-700 font-semibold mb-1" style={{ fontFamily: "Inter" }}>
                Monthly ChatGPT users
              </p>
              <p className="text-gray-500 text-sm" style={{ fontFamily: "Inter" }}>
                searching for local services and professionals
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
              <div className="text-[44px] md:text-[56px] font-bold text-[#0080FF] mb-2" style={{ fontFamily: "Inter" }}>
                1.2%
              </div>
              <p className="text-gray-700 font-semibold mb-1" style={{ fontFamily: "Inter" }}>
                Of law firms show up
              </p>
              <p className="text-gray-500 text-sm" style={{ fontFamily: "Inter" }}>
                when someone asks AI for an attorney recommendation
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
              <div className="text-[44px] md:text-[56px] font-bold text-[#0080FF] mb-2" style={{ fontFamily: "Inter" }}>
                90%+
              </div>
              <p className="text-gray-700 font-semibold mb-1" style={{ fontFamily: "Inter" }}>
                Have zero AI visibility
              </p>
              <p className="text-gray-500 text-sm" style={{ fontFamily: "Inter" }}>
                of firms we audit are completely invisible to ChatGPT
              </p>
            </div>
          </div>
        </section>

        {/* Value props */}
        <section className="mt-20 md:mt-32">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {VALUE_PROPS.map((vp) => {
              const Icon = vp.icon
              const colorMap: Record<string, string> = {
                blue: "bg-blue-100 text-[#0080FF]",
                green: "bg-green-50 text-green-600",
                purple: "bg-purple-50 text-purple-600",
              }
              return (
                <div
                  key={vp.title}
                  className="bg-white p-8 rounded-xl shadow-lg text-center border border-gray-100"
                >
                  <div
                    className={`w-16 h-16 ${colorMap[vp.color]} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: "Inter" }}>
                    {vp.title}
                  </h3>
                  <p className="text-gray-600" style={{ fontFamily: "Inter" }}>
                    {vp.description}
                  </p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Comparison table */}
        <ComparisonTable />

        {/* This Isn't SEO. This Isn't Ads. */}
        <section className="mt-12 md:mt-20 max-w-6xl mx-auto px-4">
          <div className="text-center mb-10 md:mb-14">
            <h2
              className="text-black font-bold text-[28px] md:text-[44px] leading-tight mb-4"
              style={{ fontFamily: "Inter" }}
            >
              This Isn&apos;t SEO. This Isn&apos;t Ads.{" "}
              <span className="text-[#0080FF]">It&apos;s Something New.</span>
            </h2>
            <p className="text-gray-600 text-base md:text-[18px] max-w-2xl mx-auto" style={{ fontFamily: "Inter" }}>
              AI search runs on a different system than Google. Different rules. Different winners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-4">
                <XCircle className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "Inter" }}>
                Not Traditional SEO
              </h3>
              <p className="text-gray-600 mb-4" style={{ fontFamily: "Inter" }}>
                SEO companies optimize for Google&apos;s 10 blue links. AI search recommends one or two firms by name.
                Different game, different playbook.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-4">
                <XCircle className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "Inter" }}>
                Not Paid Ads
              </h3>
              <p className="text-gray-600 mb-4" style={{ fontFamily: "Inter" }}>
                You can&apos;t buy your way into ChatGPT recommendations. Morgan and Morgan can&apos;t outspend you here.
                The algorithm cares who got there first and who built the right foundation.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "Inter" }}>
                It&apos;s AI Search Optimization
              </h3>
              <p className="text-gray-600 mb-4" style={{ fontFamily: "Inter" }}>
                A new discipline. We optimize the layer AI tools actually read. The result: your firm becomes the
                recommendation when someone asks for help.
              </p>
            </div>
          </div>
        </section>

        {/* Mid-page CTA */}
        <div className="flex flex-col items-center px-4 md:px-8 mt-12 md:mt-20">
          <Link
            href="/book-a-call-fb"
            className="bg-[#0080FF] text-white py-4 text-[18px] md:text-[20px] font-semibold rounded-[10px] hover:bg-blue-600 transition-colors inline-block w-full max-w-md md:w-auto md:px-20 text-center"
            style={{ fontFamily: "Inter" }}
          >
            Start With Your Free Audit
          </Link>
          <p className="text-center text-gray-500 text-sm mt-3 italic" style={{ fontFamily: "Inter" }}>
            15 minutes. No commitment.
          </p>
        </div>

        {/* How it works */}
        <section className="mt-20 md:mt-32 max-w-5xl mx-auto px-4">
          <div className="text-center mb-10 md:mb-14">
            <h2
              className="text-black font-bold text-[28px] md:text-[44px] leading-tight mb-4"
              style={{ fontFamily: "Inter" }}
            >
              How It Works
            </h2>
            <p className="text-gray-600 text-base md:text-[18px]" style={{ fontFamily: "Inter" }}>
              Three steps. About 30 minutes of your time over the first 90 days.
            </p>
          </div>

          <div className="space-y-6 md:space-y-8">
            {HOW_IT_WORKS.map((step) => {
              const Icon = step.icon
              return (
                <div
                  key={step.number}
                  className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 flex flex-col md:flex-row gap-6 items-start"
                >
                  <div className="flex-shrink-0">
                    <div
                      className="text-[48px] md:text-[64px] font-bold text-[#0080FF] leading-none"
                      style={{ fontFamily: "Inter" }}
                    >
                      {step.number}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className="w-6 h-6 text-[#0080FF]" />
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900" style={{ fontFamily: "Inter" }}>
                        {step.title}
                      </h3>
                      <span className="text-sm text-gray-500 hidden md:inline" style={{ fontFamily: "Inter" }}>
                        ({step.duration})
                      </span>
                    </div>
                    <span className="text-sm text-gray-500 md:hidden block mb-2" style={{ fontFamily: "Inter" }}>
                      {step.duration}
                    </span>
                    <p className="text-gray-600 text-base md:text-[17px]" style={{ fontFamily: "Inter" }}>
                      {step.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Testimonials */}
        <section className="mt-20 md:mt-32 max-w-6xl mx-auto px-4">
          <div className="text-center mb-10 md:mb-14">
            <h2
              className="text-black font-bold text-[28px] md:text-[44px] leading-tight mb-4"
              style={{ fontFamily: "Inter" }}
            >
              Don&apos;t Take Our Word For It. <span className="text-[#0080FF]">Look at the Data.</span>
            </h2>
            <p className="text-gray-600 text-base md:text-[18px] max-w-2xl mx-auto" style={{ fontFamily: "Inter" }}>
              Real firms. Real numbers. Real cases coming through AI search.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 flex flex-col"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" viewBox="0 0 24 24" fill="#FDB022">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                  ))}
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-2 mb-4 self-start">
                  <span className="text-[#0080FF] font-semibold text-sm" style={{ fontFamily: "Inter" }}>
                    {t.metric}
                  </span>
                </div>
                <p className="text-gray-800 mb-6 flex-grow text-base md:text-[17px] leading-relaxed" style={{ fontFamily: "Inter" }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                  />
                  <div>
                    <p className="font-semibold text-gray-900" style={{ fontFamily: "Inter", fontSize: "15px" }}>
                      {t.name}
                    </p>
                    <p className="text-gray-600 text-xs" style={{ fontFamily: "Inter" }}>
                      {t.title} · {t.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Final guarantee block */}
        <section className="mt-20 md:mt-32 max-w-4xl mx-auto px-4">
          <div className="bg-gradient-to-br from-[#0080FF] to-blue-700 rounded-3xl p-8 md:p-12 text-white text-center shadow-2xl">
            <ShieldCheck className="w-16 h-16 mx-auto mb-6 text-white" />
            <h2
              className="text-white font-bold text-[28px] md:text-[44px] leading-tight mb-4"
              style={{ fontFamily: "Inter" }}
            >
              25 Qualified Cases in 90 Days. Or We Work Free.
            </h2>
            <p
              className="text-blue-100 text-base md:text-[18px] max-w-2xl mx-auto mb-8"
              style={{ fontFamily: "Inter" }}
            >
              We get your firm recommended by ChatGPT, Claude, and Perplexity within 90 days. If you have not received
              25 qualified cases through AI search by then, we keep working at zero cost until you do.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 max-w-2xl mx-auto mb-8">
              <div className="bg-white/15 backdrop-blur-sm rounded-lg px-4 py-3">
                <p className="text-white font-semibold text-sm" style={{ fontFamily: "Inter" }}>
                  Month-to-month billing
                </p>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-lg px-4 py-3">
                <p className="text-white font-semibold text-sm" style={{ fontFamily: "Inter" }}>
                  Cancel anytime
                </p>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-lg px-4 py-3">
                <p className="text-white font-semibold text-sm" style={{ fontFamily: "Inter" }}>
                  No long-term contracts
                </p>
              </div>
            </div>
            <Link
              href="/book-a-call-fb"
              className="bg-white text-[#0080FF] py-4 text-[18px] md:text-[20px] font-bold rounded-[10px] hover:bg-blue-50 transition-colors inline-flex items-center gap-2 px-8 md:px-12"
              style={{ fontFamily: "Inter" }}
            >
              Book Your Free Audit <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

        {/* FAQs */}
        <section className="mt-20 md:mt-32 max-w-4xl mx-auto px-4">
          <div className="text-center mb-10 md:mb-14">
            <h2
              className="text-black font-bold text-[28px] md:text-[44px] leading-tight"
              style={{ fontFamily: "Inter" }}
            >
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <details
                key={index}
                className="rounded-2xl overflow-hidden bg-white shadow-md border border-gray-100 group"
              >
                <summary
                  className="flex justify-between items-center p-5 md:p-6 cursor-pointer list-none"
                  style={{ fontFamily: "Inter" }}
                >
                  <span className="text-black font-semibold text-base md:text-lg pr-4">{faq.question}</span>
                  <svg
                    className="w-5 h-5 flex-shrink-0 transition-transform group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 md:px-6 pb-5 md:pb-6">
                  <p className="text-gray-600 text-base leading-relaxed" style={{ fontFamily: "Inter" }}>
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Final closing CTA */}
        <section className="mt-20 md:mt-32 max-w-4xl mx-auto px-4 text-center">
          <h2
            className="text-black font-bold text-[28px] md:text-[40px] leading-tight mb-4"
            style={{ fontFamily: "Inter" }}
          >
            Here&apos;s Exactly What To Do Next
          </h2>
          <p className="text-gray-600 text-base md:text-[18px] mb-8 max-w-2xl mx-auto" style={{ fontFamily: "Inter" }}>
            Three steps. About 15 minutes. No pressure.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 max-w-3xl mx-auto">
            {[
              { num: "1", text: "Click the button below" },
              { num: "2", text: "Pick a 15-minute time slot" },
              { num: "3", text: "We audit your AI visibility live" },
            ].map((s) => (
              <div key={s.num} className="bg-white rounded-2xl p-5 md:p-6 shadow-md border border-gray-100">
                <div
                  className="w-10 h-10 bg-[#0080FF] rounded-full flex items-center justify-center text-white font-bold mx-auto mb-3"
                  style={{ fontFamily: "Inter" }}
                >
                  {s.num}
                </div>
                <p className="text-gray-700 font-semibold" style={{ fontFamily: "Inter" }}>
                  {s.text}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="/book-a-call-fb"
            className="bg-[#0080FF] text-white py-4 text-[18px] md:text-[20px] font-semibold rounded-[10px] hover:bg-blue-600 transition-colors inline-block w-full max-w-md md:w-auto md:px-20 text-center"
            style={{ fontFamily: "Inter" }}
          >
            See If You Qualify
          </Link>
          <p className="text-center text-gray-500 text-sm mt-3 italic" style={{ fontFamily: "Inter" }}>
            Free 15-minute AI visibility audit
          </p>
        </section>

        {/* Footer */}
        <footer className="mt-20 md:mt-32 pt-8 border-t border-gray-200 text-center text-xs text-gray-400 max-w-4xl mx-auto px-4">
          <p className="mb-2" style={{ fontFamily: "Inter" }}>
            © {new Date().getFullYear()} Amphs AI. All rights reserved.
          </p>
          <p style={{ fontFamily: "Inter" }}>
            This site is not part of the Facebook website or Facebook Inc. Additionally, this site is NOT endorsed by
            Facebook in any way. FACEBOOK is a trademark of FACEBOOK, Inc.
          </p>
        </footer>
      </div>
    </main>
  )
}
