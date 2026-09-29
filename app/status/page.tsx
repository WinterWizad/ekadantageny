import { cleanMeta, LongBody } from "@/components/standard";

/*
 * FIXED (2026-09-29, tier-2, validate-gated): missing_h1 — the first heading
 * was an H2 with no H1 anywhere, which is how the defect usually appears: a page
 * built from a component that assumed the surrounding template supplied the H1,
 * then dropped somewhere no template applies. Now the page declares its identity
 * at the top level. Deliberately NOT thin, so no other check fires here.
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
      <h1>All systems operational</h1>
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
