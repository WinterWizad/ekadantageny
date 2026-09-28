/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The demo deliberately serves a slow page (TTFB > 600ms) to exercise the
  // slow_pages check, and a client-only page to exercise client_rendered.
  poweredByHeader: false,
};

export default nextConfig;
