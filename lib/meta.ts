import { headers } from "next/headers";

/**
 * Canonical tags are built from the serving host, not hardcoded.
 *
 * The audit compares `<link rel=canonical>` against the page's own URL. If we
 * hardcoded https://ekadantageny.com/ then every page served from localhost
 * during testing would report canonical_mismatch, and a "clean" page would be
 * indistinguishable from a genuinely mismatched one. Deriving it from the
 * request is also what a real agency needs: the same build is correct on
 * ekadantageny.com, on a Vercel preview domain, and on a staging host.
 */
/**
 * Build-time deployment origin. Vercel injects VERCEL_URL (host only, no
 * scheme); SITE_ORIGIN overrides it for a custom domain or local testing.
 * Must never fall back to localhost on a deployed site, or robots.txt and the
 * sitemap ship sitemap URLs that only resolve on the dev machine.
 */
export const BASE_URL =
  process.env.SITE_ORIGIN ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export async function origin(): Promise<string> {
  const h = await headers();
  const host = h.get("x-forwarded-host") || h.get("host") || "localhost:3000";
  const local = /^localhost|^127\.0\.0\.1/.test(host);
  const proto = h.get("x-forwarded-proto") || (local ? "http" : "https");
  return `${proto}://${host}`;
}

export async function canonical(path: string): Promise<string> {
  const p = path === "/" ? "/" : path.replace(/\/$/, "");
  return `${await origin()}${p}`;
}
