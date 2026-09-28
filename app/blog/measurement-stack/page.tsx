import { cleanMeta, LongBody } from "@/components/standard";

/*
 * DEFECT: slow_pages
 *
 * TTFB over 600ms. The page blocks on a lookup it does not actually need before
 * rendering, which is the ordinary way a page gets slow: a server component that
 * awaits something slow just in case, on every request, forever.
 *
 * `force-dynamic` is load-bearing. Without it Next prerenders the page at build
 * time, the 900ms is paid during `next build` instead of during the request, and
 * the page is served FAST - so the defect silently disappears from the audit
 * while the code that caused it is still sitting in the repo. A planted defect
 * that stops reproducing is worse than no defect, because it teaches the reader
 * that the audit is unreliable.
 */
export const dynamic = "force-dynamic";

async function slowLookup() {
  // Stands in for a third-party analytics or ad-platform call with no timeout.
  await new Promise((resolve) => setTimeout(resolve, 900));
  return { currency: "NPR" };
}

export async function generateMetadata() {
  return cleanMeta(
    "Measurement stack",
    "What actually needs to be in a small business measurement stack, in order, and which parts of it are optional until you have volume.",
    "/blog/measurement-stack"
  );
}

export default async function Page() {
  await slowLookup();
  return (
    <>
      <h1>Measurement stack</h1>
      <p className="lede">
        Most small businesses need three things, in this order. The fourth thing is the
        one they buy first.
      </p>
      <h2>One: server-side tracking</h2>
      <LongBody seed="stack-one" />
      <h2>Two: offline conversion import</h2>
      <LongBody seed="stack-two" />
    </>
  );
}
