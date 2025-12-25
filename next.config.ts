import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Force these packages to be transpiled so the bundler handles ESM/CJS interop.
  transpilePackages: [
    "@coinbase/cdp-sdk",
    "@coinbase/agentkit", // Moved from external to transpile
    "@coinbase/agentkit-vercel-ai-sdk",
    "jose", 
    "viem",
  ],

  // 2. Only keep pure native/Solana binaries here if absolutely necessary.
  serverExternalPackages: [
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
