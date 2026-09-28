import type { Metadata } from "next";

/*
 * DEFECTS (four on one page, which is what a neglected page actually looks like):
 *   missing_title      - title.absolute:"" bypasses the layout's "%s | Ekadantageny"
 *                        template, so the tag is genuinely empty. Using title:""
 *                        would have rendered " | Ekadantageny" instead, which is
 *                        15 characters of title, not a missing title.
 *   missing_description - `description: ""`, which is the only way to actually
 *                        suppress the tag. Simply omitting the key does NOT
 *                        produce a page with no description: Next.js merges
 *                        metadata down from the root layout, so the page would
 *                        silently inherit the layout's description and look
 *                        clean. That inheritance is why "no description" is a
 *                        rare defect in an App Router site and a common one in
 *                        plain HTML, and it is worth knowing which you are
 *                        looking at before recommending a fix.
 *   heading_skip        - h1 jumps to h3 with no h2 between them
 *   multiple_h1        - two h1 elements
 */
export const metadata: Metadata = {
  title: { absolute: "" },
  description: "",
};

export default function Page() {
  return (
    <>
      <h1>Legacy offer</h1>
      <h3>This offer is still here because nobody deleted the page</h3>
      <p>
        A retired bundle from 2023 that is still indexed, still linked from an old
        newsletter, and still confusing people who arrive from search.
      </p>
      <h1>Second H1 that should not exist</h1>
      <p>
        Two h1 tags split the page topic in half. Screen readers treat this as two
        separate documents, and so do several crawler heuristics.
      </p>
    </>
  );
}
