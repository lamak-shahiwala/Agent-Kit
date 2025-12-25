import {
  ActionProvider,
  AgentKit,
  cdpApiActionProvider,
  jupiterActionProvider,
  PrivySvmWalletConfig,
  PrivyWalletProvider,
  splActionProvider,
  walletActionProvider,
  WalletProvider,
} from "@coinbase/agentkit";

export async function prepareAgentkitAndWalletProvider(): Promise<{
  agentkit: AgentKit;
  walletProvider: WalletProvider;
}> {
  // Check basics
  if (!process.env.PRIVY_APP_ID || !process.env.PRIVY_APP_SECRET) {
    throw new Error("Missing Privy credentials");
  }

  const config: PrivySvmWalletConfig = {
    appId: process.env.PRIVY_APP_ID,
    appSecret: process.env.PRIVY_APP_SECRET,
    walletId: process.env.PRIVY_WALLET_ID || undefined,
    authorizationPrivateKey: process.env.PRIVY_WALLET_AUTHORIZATION_PRIVATE_KEY,
    authorizationKeyId: process.env.PRIVY_WALLET_AUTHORIZATION_KEY_ID,
    networkId: process.env.NETWORK_ID || "mainnet-beta",
    walletType: "server",
  };

  const walletProvider = await PrivyWalletProvider.configureWithWallet(config);
  
  const actionProviders: any[] = [
    walletActionProvider(),
    splActionProvider(),
    jupiterActionProvider(),
  ];

  if (process.env.CDP_API_KEY_ID && process.env.CDP_API_KEY_SECRET) {
    actionProviders.push(cdpApiActionProvider());
  }

  const agentkit = await AgentKit.from({
    walletProvider,
    actionProviders,
  });

  return { agentkit, walletProvider };
}
