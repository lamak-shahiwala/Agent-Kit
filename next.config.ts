import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Transpile only what is necessary for CJS/ESM interop on Vercel
  transpilePackages: [
    "jose",
    "@coinbase/agentkit-vercel-ai-sdk",
    "@coinbase/cdp-sdk",
  ],

  // 2. KEEP THESE EXTERNAL. This prevents the "Y is not a function" error
  // because it tells Webpack NOT to bundle these into the route.js file.
  serverExternalPackages: [
    "viem",
    "@noble/hashes",
    "@coinbase/agentkit",
    "@solana/web3.js",
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
