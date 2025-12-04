# LimitedBidsShotgun - Frontend

A Next.js 14 frontend application for interacting with the LimitedBidsShotgun smart contract. Built with TypeScript, TailwindCSS, wagmi v2, RainbowKit, and custom scaffold-core hooks.

## Features

- 🚀 Next.js 14 with App Router
- 💎 TypeScript for type safety
- 🎨 TailwindCSS 3.4 for styling
- 🔗 wagmi v2 for Ethereum interactions
- 🌈 RainbowKit for wallet connections
- 📦 Custom scaffold-core hooks for contract interactions
- 🦊 MetaMask SDK compatibility

## Prerequisites

- Node.js 18+ and npm
- A local Hardhat/Anvil node running on `http://127.0.0.1:8545` (for development only)
- Deployed smart contracts with ABIs in `/public/abi/`

## Installation

1. Install dependencies:

```bash
npm install
```

2. Create a `.env.local` file (optional):

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

3. Ensure your contract ABIs are in `/public/abi/`:
   - `LimitedBidsShotgun.json`
   - `MockNFT.json`

4. Update contract addresses or ABIs in `scaffold-core/constants.ts` if needed (this file also keeps `scaffold.config.ts` in sync).

## Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
frontend/
├── app/                    # Next.js App Router
│   ├── components/         # React components
│   ├── initiate/          # Initiate auction page
│   ├── counter/           # Counter offer page
│   ├── finish/            # Finish auction page
│   ├── withdraw/          # Withdraw funds page
│   ├── layout.tsx         # Root layout with Providers
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles + Tailwind
├── scaffold-core/         # Custom hooks and providers
│   ├── wagmiClient.ts     # wagmi configuration
│   ├── Providers.tsx      # React providers wrapper
│   ├── constants.ts       # Contract addresses + ABIs
│   ├── useScaffoldReadContract.ts
│   ├── useScaffoldWriteContract.ts
│   └── index.ts           # Exports
├── hooks/                  # Custom React hooks
│   └── useShotgun.ts      # Main hook for auction
├── utils/                  # Utility functions
│   └── format.ts          # Formatting helpers
├── public/                # Static files
│   └── abi/               # Contract ABIs
├── scaffold.config.ts     # Contract configuration (derived from constants)
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # TailwindCSS configuration
└── tsconfig.json          # TypeScript configuration
```

## Configuration

### Contract Configuration

Edit `scaffold-core/constants.ts` to add or modify contracts:

```typescript
export const CONTRACTS = {
  LimitedBidsShotgun: {
    address: "0x...",
    abi: LimitedBidsShotgunAbi,
    abiPath: "/abi/LimitedBidsShotgun.json",
  },
};
```

Updating this file automatically updates `scaffold.config.ts` and all scaffold hooks.

### Network Configuration (Local Only)

This project is **locked to the local Hardhat/Anvil network (chainId 31337)**.

`scaffold-core/wagmiClient.ts` is configured as:

```typescript
chains: [hardhat], // only local chain
transports: {
  [hardhat.id]: http("http://127.0.0.1:8545"),
}
```

To change the RPC URL or chain, you must edit this file explicitly.

## Usage

### Using Scaffold Hooks

```typescript
import { useScaffoldReadContract, useScaffoldWriteContract } from '../scaffold-core';

// Read from contract
const { data, isLoading } = useScaffoldReadContract({
  contractName: 'LimitedBidsShotgun',
  functionName: 'currentPrice',
});

// Write to contract
const { writeAsync, isLoading } = useScaffoldWriteContract({
  contractName: 'LimitedBidsShotgun',
  functionName: 'initiate',
});

await writeAsync({
  args: [priceInWei],
  overrides: { value: halfPrice },
});
```

### Wallet Connection

The app uses RainbowKit for wallet connections. Users can connect via:
- MetaMask
- WalletConnect
- Coinbase Wallet
- And other supported wallets

## Building for Production

```bash
npm run build
npm start
```

## Troubleshooting

### MetaMask SDK Errors

The project includes webpack configuration to handle MetaMask SDK compatibility. If you encounter issues:

1. Clear `.next` folder: `rm -rf .next`
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Restart dev server

### Contract Not Found

Ensure:
- Contract ABIs are in `/public/abi/`
- Contract addresses and ABIs in `scaffold-core/constants.ts` are correct
- ABI paths match the file structure

### TailwindCSS Not Working

Check that:
- `tailwind.config.js` includes all relevant paths
- `globals.css` imports Tailwind directives
- Files are saved and dev server restarted

## Technologies

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **TailwindCSS 3.4** - Utility-first CSS
- **wagmi v2** - React Hooks for Ethereum
- **RainbowKit** - Wallet connection UI
- **viem** - TypeScript Ethereum library
- **@tanstack/react-query** - Data fetching

## License

MIT
