'use client';

import { useShotgun } from '../../hooks/useShotgun';
import { formatEther } from 'viem';

export default function AuctionStatus() {
  const {
    currentPrice,
    bidsCount,
    state,
    ownerA,
    ownerB,
    initiator,
    participants,
    isLoading
  } = useShotgun();

  const formatAddress = (address: string | undefined) => {
    if (!address) return '—';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatPrice = (price: unknown) => {
    if (!price || typeof price !== 'bigint') return '—';
    try {
      return `${formatEther(price)} ETH`;
    } catch {
      return '—';
    }
  };

  const getStateLabel = (state: unknown) => {
    if (state === undefined || state === null) return '—';
    const stateNum = Number(state);
    if (isNaN(stateNum)) return '—';
    if (stateNum === 0) return 'Not Started';
    if (stateNum === 1) return 'Active';
    if (stateNum === 2) return 'Finished';
    return `State ${stateNum}`;
  };

  const formatAddressSafe = (addr: unknown): string => {
    if (!addr || typeof addr !== 'string') return '—';
    return formatAddress(addr);
  };

  return (
    <div className="card">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <div className="text-sm font-medium text-gray-500 mb-1">State</div>
          <div className="text-xl font-semibold">{getStateLabel(state)}</div>
        </div>
        <div>
          <div className="text-sm font-medium text-gray-500 mb-1">Current Price</div>
          <div className="text-xl font-semibold">{formatPrice(currentPrice)}</div>
        </div>
        <div>
          <div className="text-sm font-medium text-gray-500 mb-1">Bids Count</div>
          <div className="text-xl font-semibold">{bidsCount?.toString() ?? '—'}</div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Participants</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="text-sm font-medium text-gray-500 mb-1">Owner A</div>
            <div className="font-mono text-sm">{formatAddressSafe(ownerA)}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500 mb-1">Owner B</div>
            <div className="font-mono text-sm">{formatAddressSafe(ownerB)}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500 mb-1">Initiator</div>
            <div className="font-mono text-sm">{isLoading ? 'Loading…' : formatAddressSafe(initiator)}</div>
          </div>
        </div>

        <div className="mt-6">
          <div className="text-sm font-medium text-gray-500 mb-2">Active Participants</div>
          {participants.length ? (
            <ul className="space-y-1 font-mono text-sm">
              {participants.map((participant) => (
                <li key={participant}>{formatAddressSafe(participant)}</li>
              ))}
            </ul>
          ) : (
            <div className="text-sm text-gray-500">
              {isLoading ? 'Loading participants…' : 'No participants yet.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
