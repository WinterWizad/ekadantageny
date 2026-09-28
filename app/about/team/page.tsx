import { cleanMeta, LongBody } from "@/components/standard";

/*
 * DEFECT: invalid_json_ld
 * A hand-edited Organization block with a trailing comma. It renders, it looks
 * fine in devtools, and every consumer that tries to parse it gets nothing.
 * This is the most common structured-data failure there is, precisely because
 * nothing on the page reports an error.
 */
export async function generateMetadata() {
  return cleanMeta(
    "The team behind the work",
    "Four people in Bhadrapur doing measurement, paid media, search and design. No account managers, no subcontractors you never meet.",
    "/about/team"
  );
}

const BROKEN_LD = `{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Ekadantageny",
  "url": "https://ekadantageny.com",
  "foundingDate": "2021"
}`;

export default function Page() {
  return (
    <>
      <h1>The team behind the work</h1>
      <p className="lede">
        Four people, one office in Bhadrapur, and no subcontracted account management.
      </p>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: BROKEN_LD }} />
      <h2>Who you actually work with</h2>
      <LongBody seed="team" />
    </>
  );
}
