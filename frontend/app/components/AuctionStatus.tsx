'use client';
import { useEffect, useState } from 'react';
import { useShotgun } from '../../hooks/useShotgun';
import NFTViewer from './NFTViewer';

export default function AuctionStatus() {
  const { currentPrice, bidsCount, state, ownerA, ownerB, initiator } = useShotgun();
  const [charging, setCharging] = useState(false);

  useEffect(() => {
    setCharging(false);
  }, [currentPrice, bidsCount, state]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="col-span-2 p-4 bg-white rounded shadow">
        <h3 className="text-lg font-semibold">Shotgun</h3>
        <div className="mt-3">
          <div className="flex items-center gap-4">
            <div>
              <div className="text-sm text-gray-500">State</div>
              <div className="font-medium">{String(state)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Current Price</div>
              <div className="font-medium">{currentPrice ? `${currentPrice} wei` : '—'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Bids Count</div>
              <div className="font-medium">{bidsCount ?? '-'}</div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <div>
              <div className="text-sm text-gray-500">Owner A</div>
              <div className="font-medium">{ownerA ?? '-'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Owner B</div>
              <div className="font-medium">{ownerB ?? '-'}</div>
            </div>
            <div className="col-span-2 mt-2">
              <div className="text-sm text-gray-500">Initiator</div>
              <div className="font-medium">{initiator ?? '-'}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white rounded shadow">
        <h4 className="font-medium">NFT</h4>
        <div className="mt-3">
          <NFTViewer />
        </div>
      </div>
    </div>
  );
}