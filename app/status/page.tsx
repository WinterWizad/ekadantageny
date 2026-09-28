import { cleanMeta, LongBody } from "@/components/standard";

/*
 * DEFECT: missing_h1
 *
 * The page's first heading is an H2. There is no H1 anywhere, so the page never
 * states what it is at the top level.
 *
 * This is the ordinary way the defect appears: a page is built from a component
 * that assumes the surrounding template already supplied the H1, then it is
 * dropped somewhere that template does not apply - a status page, a print view,
 * an embedded panel, a CMS block. It is not a typo anyone would catch by reading
 * the page, which is why an automated check earns its keep.
 *
 * Deliberately NOT thin, so the only finding this page produces is missing_h1.
 * A page that trips three checks proves nothing about any of them.
 */
export async function generateMetadata() {
  return cleanMeta(
    "Service status and incidents",
    "Current state of our measurement stack, with every incident since the service began, including the ones we did not cause.",
    "/status"
  );
}

const INCIDENTS = [
  ["2026-08-14", "Conversion API delivery delayed 6h", "Enquiries were tracked but not sent to the ad platforms. Attribution under-reported; we issued a correction."],
  ["2026-07-02", "Reporting dashboard unavailable 40m", "Tracking kept running. The dashboard was the only affected component."],
  ["2026-05-19", "Call tracking dropped 3 days", "Our fault. Fixed, and we backfilled from the platform records."],
];

export default function Page() {
  return (
    <>
      {/* No H1. The first heading on the page is an H2, which is the defect. */}
      <h2>All systems operational</h2>
      <p className="lede">
        Tracking is running. Last checked six minutes ago.
      </p>

      <h2>Recent incidents</h2>
      <table>
        <thead>
          <tr><th>Date</th><th>What happened</th><th>What it affected</th></tr>
        </thead>
        <tbody>
          {INCIDENTS.map(([d, what, effect]) => (
            <tr key={d}><td>{d}</td><td>{what}</td><td>{effect}</td></tr>
          ))}
        </tbody>
      </table>

      <h2>Why this page exists</h2>
      <LongBody seed="status-why" />
    </>
  );
}
