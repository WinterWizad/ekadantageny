/** @type {import('next').NextConfig} */

// Pinned to this project. Next otherwise walks up looking for a lockfile and
// found one at C:\Users\prajw\package-lock.json, which made it treat the home
// directory as the workspace root. That inflates the traced file set and is a
// real deployment hazard on Vercel, not just a noisy warning.
const projectRoot = new URL(".", import.meta.url).pathname.replace(/\/$/, "");

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  outputFileTracingRoot: projectRoot,
};

export default nextConfig;
