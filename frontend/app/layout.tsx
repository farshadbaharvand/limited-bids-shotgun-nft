import './globals.css';
import { PropsWithChildren } from 'react';
import { Providers } from '../scaffold-core';

export const metadata = {
  title: 'LimitedBidsShotgun - Shotgun Auction Demo',
  description: 'Limited Bids Shotgun Auction - Frontend Demo',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Providers>
          <div className="min-h-screen">
            <header className="bg-white border-b border-gray-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <h1 className="text-2xl font-bold text-gray-900">LimitedBidsShotgun</h1>
                <p className="text-sm text-gray-600 mt-1">
                  Shotgun Auction Demo - Connect your wallet to interact
                </p>
              </div>
            </header>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
