import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Force Next.js to bundle and transpile these packages.
  // This solves the "require() of ES Module" error by converting 
  // them into the format the hosted server expects.
  transpilePackages: [
    '@coinbase/agentkit',
    '@coinbase/agentkit-vercel-ai-sdk',
    'jose', 
    '@coinbase/cdp-sdk'
  ],

  // 2. Remove them from serverExternalPackages
  // Keeping them here was causing the "require" error on the hosted site.
  serverExternalPackages: [
    '@noble/hashes',
    'viem',
    '@solana/web3.js',
    'bs58'
  ],

  webpack: (config) => {
    config.resolve.extensionAlias = {
      ".js": [".ts", ".tsx", ".js", ".jsx"],
      ".mjs": [".mts", ".mjs"],
      ".cjs": [".cts", ".cjs"],
    };
    return config;
  },
};

export default nextConfig;
