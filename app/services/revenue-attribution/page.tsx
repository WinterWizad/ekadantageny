import { LongBody } from "@/components/standard";
import { canonical } from "@/lib/meta";
import type { Metadata } from "next";
import Link from "next/link";

/*
 * DEFECT: canonical_missing
 * No `alternates.canonical` is emitted, so the page ships with no canonical tag.
 * Everything else here is clean.
 */
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Revenue attribution",
    description:
      "Attribution tells you which channel produced the enquiry. We instrument the whole path so the next budget decision has evidence behind it.",
  };
}

export default function Page() {
  return (
    <>
      <h1>Revenue attribution</h1>
      <p className="lede">
        The question this service answers is simple: which channel produced the revenue?
      </p>
      <h2>What we instrument</h2>
      <LongBody seed="attribution" />
      <h2>What you get</h2>
      <LongBody seed="attribution-output" />
      <p><Link href="/contact">Book a free revenue audit</Link></p>
    </>
  );
}
