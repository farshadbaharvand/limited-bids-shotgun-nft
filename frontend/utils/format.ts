import { formatEther, formatUnits } from 'viem';

/**
 * Format an address to show first 6 and last 4 characters
 */
export function formatAddress(address: string | undefined | null): string {
  if (!address) return '—';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

/**
 * Format wei to ETH string
 */
export function formatEth(value: bigint | undefined | null): string {
  if (!value) return '—';
  try {
    return formatEther(value);
  } catch {
    return '—';
  }
}

/**
 * Format wei to ETH with decimals
 */
export function formatEthWithDecimals(
  value: bigint | undefined | null,
  decimals: number = 4
): string {
  if (!value) return '—';
  try {
    const eth = formatEther(value);
    const num = parseFloat(eth);
    return num.toFixed(decimals);
  } catch {
    return '—';
  }
}

/**
 * Format any unit value
 */
export function formatUnitsValue(
  value: bigint | undefined | null,
  decimals: number = 18
): string {
  if (!value) return '—';
  try {
    return formatUnits(value, decimals);
  } catch {
    return '—';
  }
}
