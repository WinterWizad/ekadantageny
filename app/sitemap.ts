import type { MetadataRoute } from "next";

/*
 * Sitemap contents are load-bearing for the demo:
 *
 *  - /glossary IS here and is linked from nowhere, so orphan_pages fires.
 *    Orphan detection only runs when the crawl was COMPLETE; a truncated crawl
 *    would see nearly the whole site as unlinked and decline to report.
 *
 *  - /legacy-pricing is deliberately ABSENT and does not exist. The footer links
 *    to it, so during a complete crawl it must be reported as a confirmed broken
 *    internal link, and during a truncated crawl it must be reported as
 *    `unverified` instead - because out of scope is not the same as broken.
 *
 *  - /llms.txt and /pricing.md are absent on purpose. They are the two files the
 *    agent will be asked to create under Tier 2, validated, and then reverted.
 */
const PATHS = [
  "/",
  "/services",
  "/services/revenue-attribution",
  "/services/paid-ads",
  "/services/seo",
  "/services/cro",
  "/services/legacy-offer",
  "/pricing",
  "/about",
  "/about/team",
  "/contact",
  "/contact/summer-campaign-2024",
  "/case-studies",
  "/case-studies/khaltra",
  "/blog",
  "/blog/utm-guide",
  "/blog/2024-benchmark",
  "/blog/meta-ads-guide",
  "/blog/measurement-stack",
  "/tools/roi-calculator",
  "/partners",
  "/glossary",
  "/status",
  "/legacy-brochure.html",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.SITE_ORIGIN || "http://localhost:3000";
  return PATHS.map((p, i) => ({
    url: `${base}${p === "/" ? "/" : p}`,
    lastModified: new Date(2026, 0, 1 + i),
    changeFrequency: p === "/" ? "weekly" : "monthly",
    priority: p === "/" ? 1 : 0.6,
  }));
}
