"use client";

import { useReadContract } from "wagmi";
import { getContractDefinition, type ContractName } from "./constants";

interface UseScaffoldReadContractProps {
  contractName: ContractName;
  functionName: string;
  args?: readonly unknown[];
  account?: `0x${string}`;
  watch?: boolean;
  refetchInterval?: number;
}

/**
 * Consistent read wrapper that auto-resolves address+ABI from CONTRACTS
 * and keeps data fresh either by watching or periodic polling.
 */
export function useScaffoldReadContract({
  contractName,
  functionName,
  args = [],
  account,
  watch = true,
  refetchInterval = 3000,
}: UseScaffoldReadContractProps) {
  const { address, abi } = getContractDefinition(contractName);

  return useReadContract({
    address,
    abi,
    functionName,
    args,
    account,
    query: {
      enabled: Boolean(address && functionName),
      refetchInterval: watch ? refetchInterval : false,
      refetchOnReconnect: watch,
      refetchOnWindowFocus: watch,
    },
  });
}
