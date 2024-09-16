"use client";

import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { SolanaWalletConnectors } from "@dynamic-labs/solana";
import { BitcoinWalletConnectors } from "@dynamic-labs/bitcoin";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { config } from "@/lib/wagmi";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  if (!process.env.NEXT_PUBLIC_ENVIROMENT_ID) {
    return;
  }

  return (
    // Get all connector for the chains you want to use
    <DynamicContextProvider
      theme="auto"
      settings={{
        environmentId: process.env.NEXT_PUBLIC_ENVIROMENT_ID,
        walletConnectors: [
          EthereumWalletConnectors,
          SolanaWalletConnectors,
          BitcoinWalletConnectors,
        ],
      }}
    >
      {/* Wagmi setup */}
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>{children}</DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
}
