"use client";

import { formatEther } from "viem";

interface PriceDisplayProps {
  price: bigint | undefined;
}

export default function PriceDisplay({ price }: PriceDisplayProps) {
  if (price === undefined) {
    return (
      <div className="flex items-center justify-between py-3 border-b border-gray-200">
        <span className="text-sm font-medium text-gray-600">
          Current Price
        </span>
        <span className="text-sm font-semibold text-gray-900">—</span>
      </div>
    );
  }

  const priceInEth = formatEther(price);
  const priceInWei = price.toString();

  return (
    <div className="py-3 border-b border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-600">
          Current Price
        </span>
        <span className="text-lg font-bold text-primary-600">
          {parseFloat(priceInEth).toFixed(4)} ETH
        </span>
      </div>
      <div className="text-xs text-gray-500 font-mono">{priceInWei} wei</div>
    </div>
  );
}

