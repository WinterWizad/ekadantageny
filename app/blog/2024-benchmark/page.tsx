import { cleanMeta, LongBody } from "@/components/standard";
import Link from "next/link";

/*
 * FIXED (2026-09-29, tier-2, validate-gated): images_missing_dimensions — the
 * two <img> tags had alt (someone asked for that) but no width/height, so the
 * browser reserved no space until download. The assets are 8x8 placeholder PNGs;
 * declared dimensions now match and layout shift is gone.
 */
export async function generateMetadata() {
  return cleanMeta(
    "The 2024 local marketing benchmark",
    "What 140 small businesses in Jhapa and Darjeeling actually spent on marketing in 2024, and which channels paid for themselves inside a year.",
    "/blog/2024-benchmark"
  );
}

export default function Page() {
  return (
    <>
      <h1>The 2024 local marketing benchmark</h1>
      <p className="lede">
        We asked 140 businesses across Jhapa and Darjeeling what they spent, and what
        they could prove came back. The gap between the two columns is the finding.
      </p>

      <h2>Spend against attributable revenue</h2>
      <img src="/images/benchmark-spend.png" width="8" height="8" alt="Bar chart comparing marketing spend against attributable revenue for 140 businesses" />
      <LongBody seed="benchmark-chart" />

      <h2>What the businesses that could measure had in common</h2>
      <img src="/images/benchmark-channels.png" width="8" height="8" alt="Channel mix for businesses with working attribution" />
      <LongBody seed="benchmark-findings" />

      <p>
        On what being able to measure actually requires, in order:{" "}
        <Link href="/blog/measurement-stack">the measurement stack</Link>.
      </p>
    </>
  );
}
