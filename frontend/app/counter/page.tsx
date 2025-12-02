'use client';
import { useState } from 'react';
import { useShotgun } from '../../hooks/useShotgun';

export default function CounterPage() {
  const [price, setPrice] = useState('');
  const { counterWrite } = useShotgun();
  const [loading, setLoading] = useState(false);

  const submit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      await counterWrite.writeAsync({ args: [price], overrides: { value: (Number(price) / 2).toString() } });
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="text-lg font-semibold">Counter Offer</h3>
      <form onSubmit={submit} className="mt-3 space-y-3">
        <div>
          <label className="block text-sm">New total pric