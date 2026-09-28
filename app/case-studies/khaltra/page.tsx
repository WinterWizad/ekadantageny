import type { Metadata } from "next";
import { canonical } from "@/lib/meta";

/*
 * DEFECTS: thin_content + title_too_short
 *
 * "Khaltra" alone renders as "Khaltra | Ekadantageny" = 23 characters, under the
 * 25-character floor. A longer raw title would have to be trimmed to hit it, which
 * is the more realistic version of the bug - but either way the page has to be
 * genuinely short for thin_content to fire, so both thresholds are set here.
 */
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Khaltra",
    description:
      "How a local retailer in Bhadrapur cut paid spend by a third and doubled the enquiries that arrived, by fixing measurement before buying anything else.",
    alternates: { canonical: await canonical("/case-studies/khaltra") },
  };
}

export default function Page() {
  return (
    <>
      <h1>Khaltra</h1>
      <p>
        Khaltra sells home and kitchenware across Jhapa. They were spending on three
        channels with no way to tell which one produced an order, so we instrumented
        checkout first and paused two channels for a month. Enquiries per rupee
        roughly doubled, and the board could see why.
      </p>
    </>
  );
}
