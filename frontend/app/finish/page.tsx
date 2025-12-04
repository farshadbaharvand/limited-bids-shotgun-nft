'use client';

import { useState } from 'react';
import { useShotgun } from '../../hooks/useShotgun';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function FinishPage() {
  const { address, isConnected } = useAccount();
  const { finishWrite } = useShotgun();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleFinish = async () => {
    if (!isConnected) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await finishWrite.writeAsync({
        args: [],
      });

      setSuccess(true);
    } catch (err: any) {
      console.error('Finish error:', err);
      setError(err?.message || 'Failed to finish auction');
    } finally {
      setLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="card max-w-md mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-4">Connect Wallet</h2>
        <p className="text-gray-600 mb-6">
          Please connect your wallet to finish the auction
        </p>
        <ConnectButton />
      </div>
    );
  }

  return (
    <div className="card max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Finish Auction</h2>

      <p className="text-gray-600 mb-6">
        Complete the auction and transfer assets to the winner. This action is final.
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
          Auction finished successfully!
        </div>
      )}

      <button
        onClick={handleFinish}
        className="btn w-full"
        disabled={loading}
      >
        {loading ? 'Finishing...' : 'Finish Auction'}
      </button>
    </div>
  );
}
