# Complete Project Structure

## Frontend Project - LimitedBidsShotgun

```
frontend/
├── app/                          # Next.js 14 App Router
│   ├── components/
│   │   └── AuctionStatus.tsx     # Main auction status display component
│   ├── initiate/
│   │   └── page.tsx              # Initiate auction page
│   ├── counter/
│   │   └── page.tsx              # Counter offer page
│   ├── finish/
│   │   └── page.tsx              # Finish auction page
│   ├── withdraw/
│   │   └── page.tsx               # Withdraw funds page
│   ├── layout.tsx                 # Root layout with Providers
│   ├── page.tsx                  # Home page with auction status
│   └── globals.css                # Global styles + TailwindCSS
│
├── scaffold-core/                 # Custom blockchain integration
│   ├── wagmiClient.ts            # wagmi v2 configuration
│   ├── Providers.tsx             # React providers (Wagmi, RainbowKit, Query)
│   ├── constants.ts              # Contract addresses + ABIs
│   ├── useScaffoldReadContract.ts # Custom read hook
│   ├── useScaffoldWriteContract.ts # Custom write hook
│   └── index.ts                   # Barrel exports
│
├── hooks/
│   └── useShotgun.ts              # Main hook for auction interactions
│
├── utils/
│   └── format.ts                 # Formatting utilities (address, ETH, etc.)
│
├── public/
│   └── abi/                       # Contract ABIs (JSON files)
│       ├── LimitedBidsShotgun.json
│       └── MockNFT.json
│
├── scaffold.config.ts             # Contract registry (derived from constants)
├── package.json                   # Dependencies
├── tsconfig.json                   # TypeScript configuration
├── next.config.js                 # Next.js configuration
├── tailwind.config.js             # TailwindCSS configuration
├── postcss.config.js              # PostCSS configuration
├── .gitignore                     # Git ignore rules
├── .eslintrc.json                 # ESLint configuration
├── README.md                      # Project documentation
└── .env.example                    # Environment variables example
```

## Key Features

### 1. Next.js 14 App Router
- Modern React Server Components
- TypeScript support
- App directory structure

### 2. Blockchain Integration
- **wagmi v2**: React hooks for Ethereum
- **RainbowKit**: Wallet connection UI
- **viem**: TypeScript Ethereum library
- **Custom hooks**: Scaffold-style contract interactions

### 3. Styling
- **TailwindCSS 3.4**: Utility-first CSS
- Custom component classes
- Responsive design

### 4. Type Safety
- Full TypeScript coverage
- Type-safe contract interactions
- Proper error handling

## Configuration Files

### `next.config.js`
- Webpack configuration for MetaMask SDK compatibility
- Resolves React Native module issues
- Handles pino-pretty in browser builds

### `tailwind.config.js`
- Content paths for all project directories
- Custom theme colors
- Component class definitions

### `tsconfig.json`
- Strict TypeScript settings
- Path aliases configured
- Next.js plugin support

### `scaffold-core/constants.ts`
- Source of truth for contract addresses & ABIs
- Provides helper exports for hooks

### `scaffold.config.ts`
- Automatically generated from constants
- Used by tooling that expects the original format

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Add contract ABIs:**
   - Place `LimitedBidsShotgun.json` in `/public/abi/`
   - Place `MockNFT.json` in `/public/abi/`

3. **Configure contracts:**
   - Update addresses and ABIs in `scaffold-core/constants.ts`

4. **Start development:**
   ```bash
   npm run dev
   ```

## All Files Created

✅ Configuration files (package.json, tsconfig, next.config, etc.)
✅ Scaffold-core hooks and providers
✅ App pages and components
✅ Custom hooks and utilities
✅ Documentation (README, PROJECT_STRUCTURE)
✅ Git and linting configs

## Ready to Run

The project is fully configured and ready to run with:
- `npm install` - Install all dependencies
- `npm run dev` - Start development server

All TypeScript errors resolved, all imports/exports correct, MetaMask SDK compatible.

