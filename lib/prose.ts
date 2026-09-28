/**
 * Deterministic prose pool.
 *
 * The demo needs pages to hit specific word-count bands so the audit's
 * thin_content threshold (<200 words) fires where intended and nowhere else.
 * Hand-writing 600 words per page would make word counts drift every time a
 * sentence is edited, and a "clean" page that accidentally drops under 200
 * words is indistinguishable from a deliberately thin one.
 *
 * So: a fixed pool, combined by seed. Same seed, same page, every build.
 */

const SENTENCES = [
  "Most marketing reports are written for the person who commissioned them, not the person who has to act on them.",
  "A campaign that lifts impressions but leaves revenue flat has not worked, however good it looks in a screenshot.",
  "We start by finding the gap between what a business sells and what a buyer can actually verify from public evidence.",
  "Attribution is not a reporting problem. It is a measurement design problem, and it is decided before the first rupee is spent.",
  "The honest question is not which channel deserves credit but which decision would change if the credit moved.",
  "Dashboards are persuasive precisely when they are least reliable, because a clean chart implies an answer nobody verified.",
  "Local buyers compare on speed, proof and proximity long before they compare on brand.",
  "A landing page that cannot answer the buyer's objection in the first screen is a page that pays for clicks and returns nothing.",
  "We write for the sentence that gets quoted, because that is the unit an answer engine actually retrieves.",
  "Specificity is the cheapest credibility available: a number, a date and a named constraint beat an adjective every time.",
  "Every claim a business makes publicly is either supportable or it is a liability waiting for a competitor to test it.",
  "The cost of being wrong about attribution is not the wrong attribution. It is the next quarter built on it.",
  "Measurement infrastructure should survive a change of agency, and survive a change of platform.",
  "Small businesses lose more to unmeasured spend than to bad spend, because bad spend at least announces itself.",
  "A brand that cannot be found in an answer is not invisible. It is merely not quoted.",
  "We would rather tell a client that a channel does not work than find a chart that says otherwise.",
  "Positioning is a claim about who you are for, and it is worthless if the rest of the site contradicts it.",
  "Search demand is a report on what people ask, not a forecast of what they will buy.",
  "The gap between a first click and a signed invoice is where most marketing budgets quietly disappear.",
  "Review volume and rating are two separate signals, and only one of them is a ranking factor.",
  "If a page cannot be summarised in one quotable sentence, an answer engine will summarise it without you.",
  "We measure the distance between a promise made and a promise kept, because that distance is the brand.",
  "Content written for a human reader and a crawler disagreeing is the most common and most expensive mistake in the category.",
  "A number without a caveat is a marketing claim, and marketing claims do not survive contact with an auditor.",
  "Buying attention is easy. Earning the next enquiry is the actual discipline.",
  "We measure what a buyer did, not what a platform reported, and we are explicit about which of the two we have.",
  "The cheapest keyword to rank for is the one your customers already type when they trust you.",
  "Structure beats volume in almost every local market we have measured.",
  "A competitor citing you is a distribution channel you did not have to pay for.",
  "Nothing on a website is a cost centre until it is a sales tool that does not sell.",
  "The question behind every SEO brief is whether anyone is being asked to change their mind, and by what evidence.",
  "We treat absence of data as a finding, not as a pass, because the two look identical in a spreadsheet.",
  "An answer that is merely acceptable is indistinguishable from one that was never produced.",
  "Speed is a ranking factor and a conversion factor, which is why it is rare to argue with it.",
  "The best-performing page on most sites is the one nobody edited after launch, because nobody had a hypothesis to test.",
  "Revenue is a lagging indicator, which is precisely why you need a leading one you can trust.",
  "If you cannot name the next experiment, you are not running a strategy, you are running a habit.",
  "Two weeks of clean data beats two years of interrupted tracking.",
  "Every service page should be able to answer why this and not the alternative, in the first hundred words.",
  "We do not sell rankings. We sell the next enquiry arriving from a source you can name.",
];

function hash(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

/**
 * Returns `count` paragraphs of prose for `seed`.
 * Roughly 22 words per sentence, 4 sentences per paragraph.
 */
export function prose(seed: string, paragraphs: number): string[] {
  const out: string[] = [];
  let idx = hash(seed) % SENTENCES.length;
  for (let p = 0; p < paragraphs; p += 1) {
    const picked: string[] = [];
    for (let s = 0; s < 4; s += 1) {
      picked.push(SENTENCES[idx % SENTENCES.length]);
      idx += 7;
    }
    out.push(picked.join(" "));
  }
  return out;
}

/** Approximate rendered word count for `prose(seed, n)`, excluding nav/footer. */
export function words(seed: string, paragraphs: number): number {
  return prose(seed, paragraphs).join(" ").split(/\s+/).filter(Boolean).length;
}
