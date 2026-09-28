import { cleanMeta, LongBody } from "@/components/standard";
import Link from "next/link";

/*
 * CLEAN PAGE, but it is the anchor for the site-level no_pricing_markdown check.
 *
 * That check fires only because a /pricing page exists AND no /pricing.md does.
 * Both are load-bearing for the Tier 2 test: llms.txt and pricing.md are the two
 * files the agent will be asked to create, validated, and then revert.
 */
export async function generateMetadata() {
  return cleanMeta(
    "Pricing and what is included",
    "Three ways to work with us, priced in Nepali rupees, with what each one includes stated up front rather than revealed after the first call.",
    "/pricing"
  );
}

const TIERS = [
  { name: "Audit", price: "NPR 25,000 one-off", body: "A two-week teardown of your tracking and your site. You keep the document whether or not you work with us." },
  { name: "Retainer", price: "NPR 90,000 per month", body: "Ongoing measurement, paid media management and monthly reporting against cost per qualified enquiry." },
  { name: "Build", price: "From NPR 180,000", body: "A measurement rebuild: server-side tracking, offline conversion import, and a dashboard you can defend." },
];

export default function Page() {
  return (
    <>
      <h1>Pricing and what is included</h1>
      <p className="lede">
        Three ways to work together. Every number below is the number you pay.
      </p>

      <table>
        <thead>
          <tr><th>Engagement</th><th>Price</th><th>What it includes</th></tr>
        </thead>
        <tbody>
          {TIERS.map((t) => (
            <tr key={t.name}>
              <td>{t.name}</td>
              <td>{t.price}</td>
              <td>{t.body}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>What every engagement includes</h2>
      <LongBody seed="pricing-includes" />

      <h2>What none of them include</h2>
      <LongBody seed="pricing-excludes" />

      <p><Link href="/contact">Talk to us about which one fits</Link></p>
    </>
  );
}
