\"use client\";

import { useReadContract } from \"wagmi\";
import { getContractDefinition, type ContractName } from \"./constants\";

interface UseScaffoldReadContractProps {
  contractName: ContractName;
  functionName: string;
  args?: readonly unknown[];
}

export function useScaffoldReadContract({
  contractName,
  functionName,
  args = [],
}: UseScaffoldReadContractProps) {
  const { address, abi } = getContractDefinition(contractName);

  return useReadContract({
    address,
    abi,
    functionName,
    args,
  });
}
