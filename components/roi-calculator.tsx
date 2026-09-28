"use client";

import { useEffect, useState } from "react";

/**
 * Renders nothing until it has mounted in the browser.
 *
 * This is the real-world shape of the defect, not a caricature of it: a team
 * builds a tool in Next.js, marks it "use client" because it needs state, and
 * ships a page whose served HTML contains no numbers. Google will usually render
 * it. Most AI crawlers, every social unfurl, and every link previewer will not.
 */
export default function RoiCalculator() {
  const [spend, setSpend] = useState("");
  const [revenue, setRevenue] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const s = Number(spend) || 0;
  const r = Number(revenue) || 0;
  const roi = s > 0 ? ((r - s) / s) * 100 : 0;

  return (
    <div>
      <p>
        <label>
          Monthly marketing spend (NPR)
          <input value={spend} onChange={(e) => setSpend(e.target.value)} inputMode="numeric" />
        </label>
      </p>
      <p>
        <label>
          Attributed revenue (NPR)
          <input value={revenue} onChange={(e) => setRevenue(e.target.value)} inputMode="numeric" />
        </label>
      </p>
      <p>
        <strong>
          {s > 0 ? `${roi.toFixed(1)}% return on ad spend` : "Enter a spend figure to see the return."}
        </strong>
      </p>
      <p>
        This figure is only as good as your attribution. If you cannot name the source of
        the revenue, you are dividing a guess by another guess.
      </p>
    </div>
  );
}
