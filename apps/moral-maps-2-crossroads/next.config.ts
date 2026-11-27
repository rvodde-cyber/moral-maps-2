import type { NextConfig } from "next";

const CANONICAL = "https://moral-maps-2.vercel.app/";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        destination: CANONICAL,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
