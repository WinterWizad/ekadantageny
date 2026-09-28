import { cleanMeta, LongBody } from "@/components/standard";

/*
 * DEFECT: orphan_pages
 *
 * This page is in the sitemap and it is linked from NOWHERE else in the site.
 * That combination is the whole check: a page nothing links to is a page nothing
 * finds, and the only thing keeping it reachable is a sitemap entry that a
 * crawler happens to read.
 *
 * Note the audit only trusts orphan detection when the crawl was COMPLETE. With a
 * truncated crawl, almost everything looks unlinked, so the check declines to run
 * rather than emit 600 false positives.
 */
export async function generateMetadata() {
  return cleanMeta(
    "Glossary",
    "Plain definitions of the measurement terms we use: attribution, qualified enquiry, blended cost, incrementality and the rest.",
    "/glossary"
  );
}

export default function Page() {
  return (
    <>
      <h1>Glossary</h1>
      <p className="lede">
        The terms we use in reports, defined the way we use them, because half of
        marketing disagreement is really a disagreement about definitions.
      </p>
      <h2>Measurement terms</h2>
      <LongBody seed="glossary" />
    </>
  );
}
