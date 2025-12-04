'use client';

import { useState } from 'react';
import { useShotgun } from '../../hooks/useShotgun';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function WithdrawPage() {
  const { address, isConnected } = useAccount();
  const { withdrawWrite } = useShotgun();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleWithdraw = async () => {
    if (!isConnected) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await withdrawWrite.writeAsync({
        args: [],
      });

      setSuccess(true);
    } catch (err: any) {
      console.error('Withdraw error:', err);
      setError(err?.message || 'Failed to withdraw funds');
    } finally {
      setLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="card max-w-md mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-4">Connect Wallet</h2>
        <p className="text-gray-600 mb-6">
          Please connect your wallet to withdraw funds
        </p>
        <ConnectButton />
      </div>
    );
  }

  return (
    <div className="card max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Withdraw Funds</h2>

      <p className="text-gray-600 mb-6">
        Withdraw your funds from the auction contract.
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
          Funds withdrawn successfully!
        </div>
      )}

      <button
        onClick={handleWithdraw}
        className="btn w-full"
        disabled={loading}
      >
        {loading ? 'Withdrawing...' : 'Withdraw Funds'}
      </button>
    </div>
  );
}
