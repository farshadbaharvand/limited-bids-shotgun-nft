import './globals.css';
import { PropsWithChildren } from 'react';

export const metadata = {
  title: 'LimitedBidsShotgun',
  description: 'Limited Bids Shotgun Auction - Frontend',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <div className="max-w-5xl mx-auto p-6">
          <header className="mb-6">
            <h1 className="text-2xl font-semibold">LimitedBidsShotgun</h1>
            <p className="text-sm text-gray-600">Single-shotgun auction demo (Scaffold style)</p>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}