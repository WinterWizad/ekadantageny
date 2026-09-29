import { LongBody } from "@/components/standard";
import Link from "next/link";
import { canonical } from "@/lib/meta";
import type { Metadata } from "next";

/*
 * DEFECTS: missing_images_alt + description_length
 *
 * Raw <img> tags, not next/image, because next/image refuses to render without
 * an alt prop - which is exactly why this defect is invisible on a modern build
 * and only shows up in content exported from a CMS.
 *
 * The description is 46 characters, under the 70-character floor. A real one is
 * usually truncated to something this short by a template.
 */
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "How UTM tracking actually works",
    description: "UTM parameters are a naming convention attached to a link. Learn the four parameters, what each records, and which step in the flow usually breaks.",
    alternates: { canonical: await canonical("/blog/utm-guide") },
  };
}

export default function Page() {
  return (
    <>
      <h1>How UTM tracking actually works</h1>
      <p className="lede">
        UTM parameters are a naming convention attached to a link. They tell you where
        a visit came from, provided you agreed the naming scheme before you started.
      </p>

      <h2>The diagram nobody has</h2>
      <img src="/images/utm-flow.png" alt="Diagram of the UTM flow: an ad, a link with parameters, a landing page, and a recorded visit" />
      <p>
        The diagram above is the whole flow: an ad, a link with parameters, a landing
        page, and a recorded session. Every one of those four steps can break, and
        each failure looks identical in a report.
      </p>

      <h2>What actually breaks</h2>
      <LongBody seed="utm-guide" />

      <img src="/images/utm-fields.png" alt="The UTM parameters that analytics reads: source, medium, campaign, content and term" />
      <LongBody seed="utm-fields" />

      <p>
        Next: <Link href="/blog/measurement-stack">what belongs in a measurement stack</Link>,
        and how it turns tracked clicks into something a business can defend.
      </p>
    </>
  );
}
