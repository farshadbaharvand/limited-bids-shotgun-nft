\"use client\";

import { useWriteContract } from \"wagmi\";
import { getContractDefinition, type ContractName } from \"./constants\";

interface UseScaffoldWriteContractProps {
  contractName: ContractName;
  functionName: string;
}

interface WriteOptions {
  args?: readonly unknown[];
  overrides?: { value?: bigint | string };
}

export function useScaffoldWriteContract({
  contractName,
  functionName,
}: UseScaffoldWriteContractProps) {
  const { address, abi } = getContractDefinition(contractName);
  const { writeContractAsync, data, isPending, isError, error, reset } = useWriteContract();

  const writeAsync = async (options?: WriteOptions) => {
    const args = options?.args ?? [];
    const rawValue = options?.overrides?.value;
    const value = typeof rawValue === \"string\" ? BigInt(rawValue) : rawValue;

    return writeContractAsync({
      address,
      abi,
      functionName,
      args,
      value,
    } as any);
  };

  return {
    writeAsync,
    writeContract: writeAsync, // alias for compatibility
    data,
    isPending,
    isError,
    error,
    reset,
  };
}
