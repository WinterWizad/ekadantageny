import type { Metadata } from "next";
import RoiCalculator from "@/components/roi-calculator";
import { canonical } from "@/lib/meta";

/*
 * DEFECT: client_rendered  (plus thin_content on the "thin" branch)
 *
 * The audit decides this is client-rendered by a RATIO, not a bare word count:
 * the served HTML must hold fewer than 100 words while the <noscript> fallback
 * holds at least 15 and more than double that. That is the reliable tell,
 * because a genuinely short page has no such fallback - and treating a short
 * page as unrendered would send the audit chasing a bug that does not exist.
 *
 * The noscript copy below is therefore the honest fallback a careful developer
 * would have written, and it is also what the AI crawlers will actually read.
 */
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Marketing ROI calculator",
    description:
      "Work out your return on marketing spend from attributed revenue. Useful only if you can name the source of that revenue, which is the harder problem.",
    alternates: { canonical: await canonical("/tools/roi-calculator") },
  };
}

export default function Page() {
  return (
    <>
      <h1>Marketing ROI calculator</h1>
      <RoiCalculator />
      <noscript>
        <p>
          This calculator needs JavaScript, so here is the whole method in text instead.
          Take your total marketing spend for a period, and take the revenue you can
          attribute to marketing over the same period. Subtract one from the other and
          divide by the spend, and you have return on ad spend as a percentage. If the
          attributed revenue is smaller than the spend, the campaign lost money over that
          period, and the honest response is to change the campaign rather than the
          formula. The harder half of this exercise is not the arithmetic. It is being
          able to defend the attributed revenue figure to someone who does not trust you,
          because a return calculated on unattributed revenue is a number rather than a
          measurement.
        </p>
      </noscript>
    </>
  );
}
