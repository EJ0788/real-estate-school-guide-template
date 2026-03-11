import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/squamish-schools',
  images: { unoptimized: true },
};

export default nextConfig;
