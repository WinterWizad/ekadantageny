import { LongBody } from "@/components/standard";
import { canonical } from "@/lib/meta";
import type { Metadata } from "next";

/*
 * DEFECTS: canonical_mismatch + missing_og_image
 *
 * canonical_mismatch: the canonical is hardcoded to the production domain instead
 * of being derived from the serving host, exactly the kind of thing that happens
 * when someone copies a metadata block from another page. The audit compares it to
 * the page's own URL and reports the difference, which is worth surfacing because
 * on a real site this is either a duplication bug or a deliberate canonical - and
 * the page cannot tell you which, so a human has to.
 *
 * missing_og_image: openGraph.images is emptied here, overriding the layout default,
 * so the page has no og:image and will render without a preview card.
 */
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Partner and tool policy",
    description:
      "The tools, hosts and agencies we work alongside in Bhadrapur, and the ones we deliberately do not use because their reporting cannot be verified.",
    alternates: { canonical: await canonical("/partners") },
  };
}

export default function Page() {
  return (
    <>
      <h1>Partner and tool policy</h1>
      <p className="lede">
        Most of what we recommend is a tool we do not resell. This page lists the ones we
        do work with, and the ones we refuse to.
      </p>
      <h2>What we work with</h2>
      <LongBody seed="partners-yes" />
      <h2>What we refuse to work with</h2>
      <LongBody seed="partners-no" />
    </>
  );
}
