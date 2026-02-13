/* Praxis Systems — Config (edit this first) */
window.SITE = {
  brand: "Praxis Systems",
  tagline: "Build the machine.",
  oneLiner:
    "Digital systems for service businesses: booking, recruiting, filtering, tracking.",
  locationShort: "Tri-State • Remote",
  contactEmail: "praxis.systems.co@gmail.com", // change later to hello@...
  contactPhoneDisplay: "(573) 288-4254", // optional; set blank "" to hide
  contactPhoneE164: "+15732884254", // optional
  primaryCtaLabel: "Get a Free Bottleneck Audit",
  primaryCtaHref: "audit.html",
  secondaryCtaLabel: "See Proof",
  secondaryCtaHref: "proof.html",

  // Socials (optional)
  socials: {
    instagram: "https://www.instagram.com/praxis.systems/",
    facebook: "https://www.facebook.com/profile.php?id=61587394565423",
    tiktok: "",
  },

  // GA4
  ga4MeasurementId: "G-1J7TSK4ERV", // put real ID later; leave as-is for now

  // Proof tiles (start with Emma + 1 concept)
  caseStudies: [
    {
      title: "Hair Therapy by Emma",
      subtitle: "Booking link + tracking + Google presence",
      bullets: [
        "Mobile-first site built for bookings and trust",
        "Event tracking installed (CTA clicks + form submits)",
        "Google Business Profile support + posting plan",
      ],
      href: "proof.html#emma",
      tag: "Live Build",
    },
    {
      title: "Pressure Washing Quote Funnel",
      subtitle: "Concept build for high-intent quote requests",
      bullets: [
        "One-link quote system (call/text/form)",
        "Service-area and minimum-job filtering",
        "Simple proof stack + before/after flow",
      ],
      href: "proof.html#pressure",
      tag: "Concept",
    },
  ],

  // Offer packages (adjust prices whenever)
  pricing: {
    launch: {
      name: "Launch System",
      price: "Starting at $400",
      bullets: [
        "One conversion page (quote/booking/hiring)",
        "Tracking installed + key events",
        "Copy polish + proof stack",
        "Launch + handoff (1 revision round)",
      ],
    },
    optimize: {
      name: "Optimize",
      price: "Starting at $200/mo",
      bullets: [
        "Monthly performance check + improvements",
        "One update sprint/month (conversion + clarity)",
        "Tracking review + simple report",
        "Priority fixes when something breaks",
      ],
    },
    growth: {
      name: "Growth",
      price: "By application",
      bullets: [
        "Google presence + review system",
        "Content system + offers",
        "Optional ad landing pages",
        "Weekly iteration + measurement",
      ],
    },
  },

  // Rolling announcements (top bar)
  announcements: [
    {
      text: "Free Bottleneck Audit: find the leak in 15 minutes.",
      href: "audit.html",
      cta: "Start",
    },
    {
      text: "Launch Systems ship fast (often ~48 hours).",
      href: "services.html",
      cta: "See lanes",
    },
    {
      text: "Proof is starting now — builds + concept systems.",
      href: "proof.html",
      cta: "View",
    },
    {
      text: "Stop leaking leads. Start controlling the flow.",
      href: "pricing.html",
      cta: "Pricing",
    },
  ],

  // Footer / legal
  footerNote:
    "© " + new Date().getFullYear() + " Praxis Systems. All rights reserved.",
};
