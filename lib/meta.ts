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
 * Build-time deployment origin.
 *
 * Resolution order:
 *   SITE_ORIGIN                     operator override (custom domain / local)
 *   VERCEL_PROJECT_PRODUCTION_URL   Vercel's STABLE production alias, present
 *                                   in every deployment. Use this BEFORE
 *                                   VERCEL_URL: VERCEL_URL is the per-deployment
 *                                   host (e.g. project-xxxx.vercel.app) and
 *                                   committing it to robots.txt / the sitemap
 *                                   makes those URLs change on every deploy and
 *                                   never match the host a visitor used.
 *   VERCEL_URL                      fallback for preview deployments
 *   http://localhost:3000           local fallback only
 *
 * Must never fall back to localhost on a deployed site, or robots.txt and the
 * sitemap ship sitemap URLs that only resolve on the dev machine.
 */
export const BASE_URL =
  process.env.SITE_ORIGIN ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

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
