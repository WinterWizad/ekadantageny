import type { Metadata } from "next";
import Link from "next/link";
import { BASE_URL } from "@/lib/meta";
import BreadcrumbJsonLd from "@/components/breadcrumb-json-ld";
import "./globals.css";

/*
 * FIXED (2026-09-29, tier-2, validate-gated): missing_breadcrumb_schema — the
 * shared layout used to ship no BreadcrumbList JSON-LD, which the audit reported
 * on every non-home page. BreadcrumbJsonLd (components/breadcrumb-json-ld.tsx)
 * now emits it per path from this one mount point. The homepage still carries
 * Organization schema, and missing_org_schema remains exercised by a clean page.
 */

/*
 * metadataBase is what Next uses to resolve a RELATIVE og:image into an absolute
 * URL. Without it, every social preview falls back to localhost, which is
 * invisible in local testing and broken in production - the build only warns
 * about it, and a demo that cannot see its own warning is not a useful test bed.
 *
 * BASE_URL (lib/meta.ts) derives it from VERCEL_URL, which Vercel injects at
 * build time, so the deployed build needs no configuration; SITE_ORIGIN
 * overrides it for local testing on another port.
 */
const metadataBase = new URL(BASE_URL);

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "Ekadantageny - revenue-focused marketing",
    template: "%s | Ekadantageny",
  },
  description:
    "Ekadantageny is a marketing agency in Bhadrapur, Jhapa that builds campaigns tied to revenue rather than impressions, and reports the attribution honestly.",
  openGraph: {
    type: "website",
    siteName: "Ekadantageny",
    title: "Ekadantageny - revenue-focused marketing",
    description:
      "A marketing agency in Bhadrapur, Jhapa that measures campaigns by the revenue they produce, and says so when they do not.",
    images: ["/og-default.jpg"],
  },
};

const NAV = [
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/blog", label: "Blog" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <BreadcrumbJsonLd />
        <header>
          <Link href="/">Ekadantageny</Link>
          <nav>
            {NAV.map((n) => (
              <Link key={n.href} href={n.href}>
                {n.label}
              </Link>
            ))}
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          <p>Ekadantageny, Bhadrapur, Jhapa, Koshi Province, Nepal.</p>
          {/*
            DELIBERATE BROKEN LINK - the honesty pair.
            /legacy-pricing does not exist and is not in the sitemap.
              * During a COMPLETE crawl, scopeComplete is true, so the audit must
                report this as broken_internal_links with confidence: confirmed.
              * During a TRUNCATED crawl, the target is out of scope, so it must
                be reported as `unverified` and NOT as broken.
            One URL, two different honest answers, decided entirely by whether
            the crawl was able to see the whole site.
          */}
          <Link href="/legacy-pricing">Archive pricing (2023)</Link>
          <Link href="/status">Service status</Link>
        </footer>
      </body>
    </html>
  );
}
