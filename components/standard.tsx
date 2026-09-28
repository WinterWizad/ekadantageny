import type { Metadata } from "next";
import { prose } from "@/lib/prose";
import { canonical } from "@/lib/meta";

/**
 * Metadata for a page that is meant to come back CLEAN.
 *
 * Titles must land in 25..60 chars *after* the layout template appends
 * " | Ekadantageny" (16 chars), so the raw string stays within 9..44. Getting
 * this wrong turns a clean page into a title_too_short / title_too_long
 * finding, which is exactly the kind of accidental defect that makes a test
 * suite lie.
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
