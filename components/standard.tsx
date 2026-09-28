import type { Metadata } from "next";
import { prose } from "@/lib/prose";
import { canonical } from "@/lib/meta";

/**
 * Metadata for a page that is meant to come back CLEAN.
 *
 * Titles must land in 25..60 chars *after* the layout template appends
 * " | Ekadantageny", which is 15 characters including the leading space. So the
 * raw string must sit within 10..45; a bare noun like "Pricing" is 7 and comes
 * out at 22, which is a real title_too_short finding and not a rounding error.
 *
 * This is not hypothetical. Eight of the twenty-three demo pages shipped short
 * titles the first time, and the audit was right about every one of them.
 */
export async function cleanMeta(
  rawTitle: string,
  description: string,
  path: string
): Promise<Metadata> {
  return {
    title: rawTitle,
    description,
    alternates: { canonical: await canonical(path) },
  };
}

/** 500+ words so classifyContent() returns "solid" and thin_content cannot fire. */
export function LongBody({ seed, paragraphs = 9 }: { seed: string; paragraphs?: number }) {
  return (
    <>
      {prose(seed, paragraphs).map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </>
  );
}
