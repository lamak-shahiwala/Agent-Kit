import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. ONLY transpile the auth-related packages to fix the "require" error
  transpilePackages: [
    'jose', 
    '@coinbase/cdp-sdk'
  ],

  // 2. FORCE the agent-related packages to stay external to fix the ".map" error
  // This prevents Webpack from mangling the AgentKit internal structure
  serverExternalPackages: [
    '@coinbase/agentkit',
    '@coinbase/agentkit-vercel-ai-sdk',
    '@solana/web3.js',
    'viem',
    '@noble/hashes',
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
