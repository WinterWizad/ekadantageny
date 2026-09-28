import type { Metadata } from "next";

/*
 * DEFECTS (four on one page, which is what a neglected page actually looks like):
 *   missing_title      - title.absolute:"" bypasses the layout's "%s | Ekadantageny"
 *                        template, so the tag is genuinely empty. Using title:""
 *                        would have rendered " | Ekadantageny" instead, which is
 *                        15 characters of title, not a missing title.
 *   missing_description - no description emitted at all
 *   heading_skip        - h1 jumps to h3 with no h2 between them
 *   multiple_h1        - two h1 elements
 */
export const metadata: Metadata = {
  title: { absolute: "" },
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
