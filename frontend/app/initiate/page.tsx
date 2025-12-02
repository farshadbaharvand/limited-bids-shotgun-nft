'use client';
import { useState } from 'react';
import { useShotgun } from '../../hooks/useShotgun';

export default function InitiatePage() {
  const [price, setPrice] = useState('');
  const { initiateWrite } = useShotgun();
  const [loading, setLoading] = useState(false);

  const submit = async (e: any) => {
    e.preventDefault();
    if (!price) return;
    // price is expected in ETH string - convert to wei via frontend util or rely on scaffold hook options
    setLoading(true);
    try {
      await initiateWrite.writeAsync({ args: [price], overrides: { value: (Number(price) / 2).toString() } });
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="text-lg font-semibold">Initiate Auction</h3>
      <form onSubmit={submit} className="mt-3 space-y-3">
        <div>
          <label className="block text-sm">Total price (in ETH)</label>
          <input value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1 input" placeholder="2" />
        </div>
        <button className="btn" disabled={loading}>{loading ? 'Submitting...' : 'Initiate'}</button>
      </form>
    </div>
  );
}