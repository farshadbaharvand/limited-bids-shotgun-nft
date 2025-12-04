'use client';

import { useState } from 'react';
import { useShotgun } from '../../hooks/useShotgun';
import { parseEther } from 'viem';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function InitiatePage() {
  const { address, isConnected } = useAccount();
  const { initiateWrite } = useShotgun();
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!price || !isConnected) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const priceInWei = parseEther(price);
      const halfPrice = priceInWei / BigInt(2);

      await initiateWrite.writeAsync({
        args: [priceInWei],
        overrides: { value: halfPrice },
      });

      setSuccess(true);
      setPrice('');
    } catch (err: any) {
      console.error('Initiate error:', err);
      setError(err?.message || 'Failed to initiate auction');
    } finally {
      setLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="card max-w-md mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-4">Connect Wallet</h2>
        <p className="text-gray-600 mb-6">
          Please connect your wallet to initiate an auction
        </p>
        <ConnectButton />
      </div>
    );
  }

  return (
    <div className="card max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Initiate Auction</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
          Auction initiated successfully!
        </div>
      )}

      <form onSubmit={submit} className="space-y-4">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
            Total Price (ETH)
          </label>
          <input
            id="price"
            type="number"
            step="0.001"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="input"
            placeholder="2.0"
            required
            disabled={loading}
          />
          <p className="mt-2 text-xs text-gray-500">
            You will need to send half of this amount ({price ? (Number(price) / 2).toFixed(4) : '0'} ETH) as payment
          </p>
        </div>

        <button
          type="submit"
          className="btn w-full"
          disabled={loading || !price}
        >
          {loading ? 'Initiating...' : 'Initiate Auction'}
        </button>
      </form>
    </div>
  );
}
