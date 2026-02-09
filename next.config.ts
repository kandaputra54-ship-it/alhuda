import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  experimental: {
    // TS belum tau properti ini, tapi Next.js tau
    allowedDevOrigins: ["*"],
  } as any,
};

export default nextConfig;
