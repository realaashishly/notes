import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['@mdxeditor/editor'],
  reactStrictMode: true,
};

export default nextConfig;
