import { cleanMeta, LongBody } from "@/components/standard";
import Link from "next/link";

export async function generateMetadata() {
  return cleanMeta("Conversion rate optimisation", "We find the step where buyers leave and fix that step, instead of buying more traffic to send through the same leak.", "/services/cro");
}

const LINKS = [
  { href: "/services/revenue-attribution", label: "Revenue attribution" },
  { href: "/services/paid-ads", label: "Paid advertising" },
  { href: "/services/seo", label: "Search optimisation" },
  { href: "/services/cro", label: "Conversion rate optimisation" },
  { href: "/case-studies/khaltra", label: "Case study: Khaltra" },
  { href: "/blog/utm-guide", label: "How UTM tracking actually works" },
  { href: "/blog/2024-benchmark", label: "The 2024 local marketing benchmark" },
  { href: "/blog/meta-ads-guide", label: "A short guide to Meta ads" },
  { href: "/tools/roi-calculator", label: "ROI calculator" },
  { href: "/partners", label: "Partners" },
  { href: "/about/team", label: "The team" },
  { href: "/services/legacy-offer", label: "Legacy offer" },
  { href: "/contact/summer-campaign-2024", label: "Summer campaign 2024" },
];

export default function Page() {
  return (
    <>
      <h1>Conversion rate optimisation</h1>
      <p className="lede">We find the step where buyers leave and fix that step, instead of buying more traffic to send through the same leak.</p>

      <h2>In detail</h2>
      <LongBody seed="cro" />

      <h2>Where to go next</h2>
      <ul>
        {LINKS.map((l) => (
          <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
        ))}
      </ul>
    </>
  );
}
