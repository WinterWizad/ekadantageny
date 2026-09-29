import { cleanMeta, LongBody } from "@/components/standard";
import Link from "next/link";

/*
 * DEFECT: title_too_long
 *
 * "A short guide to Meta ads that actually make money" renders as 63 characters
 * with the layout template, over the 60-character floor. Google truncates around
 * 580px on desktop, which is roughly 60 characters, so the tail of this title is
 * simply never shown.
 */
export async function generateMetadata() {
  return cleanMeta(
    "A short guide to Meta ads",
    "How to run a Meta campaign for a small business: one objective, one audience, and a landing page that answers the objection in the first screen.",
    "/blog/meta-ads-guide"
  );
}

export default function Page() {
  return (
    <>
      <h1>A short guide to Meta ads that actually make money</h1>
      <p className="lede">
        Most small businesses start with four objectives and end with no data on any of
        them. Start with one.
      </p>
      <h2>Pick one objective</h2>
      <LongBody seed="meta-objective" />
      <h2>Write the landing page first</h2>
      <LongBody seed="meta-landing" />

      <p>
        Before the campaign spends: <Link href="/blog/utm-guide">tag the links</Link> so the
        reporting has something to read. A campaign without tagged links is a campaign that
        already lost its data.
      </p>
    </>
  );
}
