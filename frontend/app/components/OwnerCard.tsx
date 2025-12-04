"use client";

interface OwnerCardProps {
  label: string;
  address: `0x${string}` | undefined;
}

export default function OwnerCard({ label, address }: OwnerCardProps) {
  if (!address) {
    return (
      <div className="p-4 border border-gray-200 rounded-lg">
        <div className="text-sm font-medium text-gray-600 mb-1">{label}</div>
        <div className="text-sm text-gray-400">Not set</div>
      </div>
    );
  }

  const shortened = `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <div className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors">
      <div className="text-sm font-medium text-gray-600 mb-1">{label}</div>
      <div className="text-sm font-mono text-gray-900 break-all">{address}</div>
      <div className="text-xs text-gray-500 mt-1">{shortened}</div>
    </div>
  );
}

