"use client";

import { createConfig } from "wagmi";
import { hardhat } from "wagmi/chains";
import { http, createPublicClient } from "viem";
import { injected } from "wagmi/connectors";
import { QueryClient } from "@tanstack/react-query";

// React Query client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Local Hardhat public client (for direct viem usage if needed)
export const publicClient = createPublicClient({
  chain: hardhat,
  transport: http("http://127.0.0.1:8545"),
});

// wagmi v2-style config: no configureChains, connectors as functions
export const wagmiConfig = createConfig({
  chains: [hardhat],
  connectors: [injected()],
  transports: {
    [hardhat.id]: http("http://127.0.0.1:8545"),
  },
  ssr: true,
});
