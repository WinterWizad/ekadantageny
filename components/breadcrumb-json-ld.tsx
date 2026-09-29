"use client";

import { usePathname } from "next/navigation";

/*
 * BreadcrumbList JSON-LD for every non-home page.
 *
 * This replaces the one shared-layout omission the audit reported on every page.
 * It is mounted once in the root layout and derives the trail from the pathname,
 * which is the honest generic shape a small agency site actually ships: the
 * layout cannot know each page's title, so the breadcrumb is built from the
 * path segments, with a label map for the ones that would otherwise read badly.
 *
 * The static validator in tools/validate.js reads the __html expression: the
 * object literal is passed straight to JSON.stringify (mode "stringify", judged
 * on brace balance), and the served HTML contains the real serialized JSON-LD,
 * which is what audit.html parses for json_ld_types.
 *
 * The origin is resolved here rather than imported from lib/meta.ts: this is a
 * client component, and lib/meta.ts imports next/headers, which is server-only.
 * This is the same three-step SITE_ORIGIN / VERCEL_PROJECT_PRODUCTION_URL /
 * VERCEL_URL / localhost resolution that lib/meta.ts applies to BASE_URL, so the
 * deployed and local behaviour match.
 */

const ORIGIN =
  process.env.SITE_ORIGIN ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

const LABELS: Record<string, string> = {
  "/about": "About",
  "/about/team": "Team",
  "/blog": "Blog",
  "/blog/utm-guide": "UTM tracking guide",
  "/blog/2024-benchmark": "Nepali marketing budgets, 2024",
  "/blog/meta-ads-guide": "Meta ads guide",
  "/blog/measurement-stack": "Measurement stack",
  "/case-studies": "Case studies",
  "/case-studies/khaltra": "Khaltra",
  "/contact": "Contact",
  "/contact/summer-campaign-2024": "Summer campaign 2024",
  "/glossary": "Glossary",
  "/partners": "Partners",
  "/pricing": "Pricing",
  "/services": "Services",
  "/services/seo": "SEO",
  "/services/cro": "CRO",
  "/services/paid-ads": "Paid ads",
  "/services/revenue-attribution": "Revenue attribution",
  "/services/legacy-offer": "Legacy offer",
  "/status": "Service status",
  "/tools": "Tools",
  "/tools/roi-calculator": "ROI calculator",
};

export default function BreadcrumbJsonLd() {
  const pathname = usePathname();
  if (!pathname || pathname === "/") return null;

  const parts = pathname.split("/").filter(Boolean);
  const segments = [];
  for (let i = 0; i < parts.length; i += 1) {
    segments.push(`/${parts.slice(0, i + 1).join("/")}`);
  }

  const itemListElement = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: ORIGIN + "/",
    },
    ...segments.map((seg, i) => ({
      "@type": "ListItem",
      position: i + 2,
      name: LABELS[seg] || parts[i].replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase()),
      item: ORIGIN + seg,
    })),
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement,
        }),
      }}
    />
  );
}