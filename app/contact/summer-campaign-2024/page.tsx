import { cleanMeta, LongBody } from "@/components/standard";

/*
 * DEFECT: noindex_directive  (severity: critical)
 *
 * A campaign page from summer 2024 that was set to noindex at launch and never
 * unset. It is still linked from the nav on every clean page, so it is the
 * clearest kind of noindex bug: the business thinks the page is live, and the
 * page is silently absent from every index.
 *
 * The check fires on ANY page carrying noindex, not only the homepage, so this
 * does not compromise the rest of the site.
 */
export async function generateMetadata() {
  const m = await cleanMeta(
    "Summer campaign 2024",
    "Our summer 2024 offer page, kept for the record after the campaign finished and the discount expired.",
    "/contact/summer-campaign-2024"
  );
  return { ...m, robots: { index: false, follow: false } };
}

export default function Page() {
  return (
    <>
      <h1>Summer campaign 2024</h1>
      <p className="lede">
        This page carried a seasonal offer that is no longer valid. It is retained as a
        record of what we ran, and it is not meant to be found in search.
      </p>
      <h2>What the campaign was</h2>
      <LongBody seed="summer-2024" />
    </>
  );
}
