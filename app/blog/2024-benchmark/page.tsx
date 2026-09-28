import { cleanMeta, LongBody } from "@/components/standard";

/*
 * DEFECT: images_missing_dimensions
 *
 * <img> tags WITH alt text but WITHOUT width/height. The alt is present because
 * someone was asked to add it; the dimensions were never considered, which is the
 * usual order. Cumulative Layout Shift is the cost, and it is measurable on field
 * data for any page with traffic.
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
      <img src="/images/benchmark-spend.png" alt="Bar chart comparing marketing spend against attributable revenue for 140 businesses" />
      <LongBody seed="benchmark-chart" />

      <h2>What the businesses that could measure had in common</h2>
      <img src="/images/benchmark-channels.png" alt="Channel mix for businesses with working attribution" />
      <LongBody seed="benchmark-findings" />
    </>
  );
}
