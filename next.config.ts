import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Force these auth-related packages to be bundled.
  transpilePackages: [
    "@coinbase/cdp-sdk",
    "@coinbase/agentkit-vercel-ai-sdk",
  ],

  // 2. Keep these specific Agent/Solana packages as external.
  // This is required to prevent the ".map of undefined" error.
  serverExternalPackages: [
    '@coinbase/agentkit',
    '@solana/web3.js',
    'viem',
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
