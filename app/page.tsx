import type { Metadata } from "next";
import Link from "next/link";
import { prose } from "@/lib/prose";
import { canonical } from "@/lib/meta";

/*
 * CLEAN PAGE. This one must produce no findings other than nothing at all.
 * The homepage is the only page that missing_org_schema ever fires on, so it
 * carries Organization schema and nothing else is planted here.
 */

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Revenue-focused marketing agency",
    description:
      "Ekadantageny builds marketing campaigns measured by revenue, not impressions, for businesses in Bhadrapur, Jhapa and across Nepal.",
    alternates: { canonical: await canonical("/") },
  };
}

const ORG = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Ekadantageny",
  url: "https://ekadantageny.com",
  description:
    "A marketing agency in Bhadrapur, Jhapa that builds campaigns measured by revenue rather than impressions.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bhadrapur",
    addressRegion: "Jhapa",
    addressCountry: "NP",
  },
  areaServed: ["Bhadrapur", "Jhapa", "Koshi Province", "Nepal"],
  knowsAbout: ["revenue attribution", "paid advertising", "search optimisation", "conversion rate optimisation"],
};

const SERVICES = [
  { href: "/services/revenue-attribution", title: "Revenue attribution", body: "Find out which channel produced the enquiry, before the next budget meeting decides it for you." },
  { href: "/services/paid-ads", title: "Paid advertising", body: "Meta and Google campaigns built against cost per qualified enquiry rather than cost per click." },
  { href: "/services/seo", title: "Search optimisation", body: "Technical and editorial work that makes the pages you already have findable and quotable." },
  { href: "/services/cro", title: "Conversion rate optimisation", body: "Find the step where the buyer leaves, and fix that step rather than buying more traffic." },
];

export default function Home() {
  const body = prose("home", 9);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG) }} />

      <h1>Marketing that moves the revenue needle</h1>
      <p className="lede">
        We are a marketing agency in Bhadrapur, Jhapa. We build campaigns, measure them
        against revenue, and tell you plainly when a channel is not working.
      </p>

      <p>
        <Link className="cta" href="/contact">Book a free revenue audit</Link>
      </p>

      <h2>What we do</h2>
      {body.slice(0, 4).map((p, i) => (
        <p key={i}>{p}</p>
      ))}

      <div className="grid">
        {SERVICES.map((s) => (
          <div className="card" key={s.href}>
            <h3><Link href={s.href}>{s.title}</Link></h3>
            <p>{s.body}</p>
          </div>
        ))}
      </div>

      <h2>How we work</h2>
      {body.slice(4, 7).map((p, i) => (
        <p key={i}>{p}</p>
      ))}

      <h2>Where we work</h2>
      {body.slice(7, 9).map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </>
  );
}
