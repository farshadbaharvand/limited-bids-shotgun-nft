\"use client\";

import { PropsWithChildren } from \"react\";
import { WagmiProvider } from \"wagmi\";
import { QueryClientProvider } from \"@tanstack/react-query\";
import { RainbowKitProvider } from \"@rainbow-me/rainbowkit\";
import { wagmiConfig, queryClient } from \"./wagmiClient\";

export function Providers({ children }: PropsWithChildren) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider chains={wagmiConfig.chains}>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
