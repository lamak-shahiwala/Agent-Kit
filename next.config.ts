import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Force Next.js to use these as native Node modules (No bundling)
  serverExternalPackages: [
    '@coinbase/agentkit',
    '@coinbase/agentkit-vercel-ai-sdk',
    '@solana/web3.js',
    'viem',
    '@noble/hashes',
    'bs58'
  ],

  // 2. Clear out any previous transpilePackages or problematic webpack mocks
  transpilePackages: [], 

  webpack: (config) => {
    // 3. Ensure ESM/CJS interop for Solana/Crypto libs
    config.resolve.extensionAlias = {
      ".js": [".ts", ".tsx", ".js", ".jsx"],
      ".mjs": [".mts", ".mjs"],
      ".cjs": [".cts", ".cjs"],
    };
    return config;
  },
};

export default nextConfig;
