import LimitedBidsShotgunArtifact from "../abi/LimitedBidsShotgun.json";
import MockNFTArtifact from "../abi/MockNFT.json";

type AbiShape = { abi?: readonly unknown[] };

export type ContractDefinition = {
  address: `0x${string}`;
  abi: readonly unknown[];
  abiPath: string;
};

const limitedBidsShotgunAbi =
  (LimitedBidsShotgunArtifact as AbiShape).abi ?? LimitedBidsShotgunArtifact;
const mockNftAbi = (MockNFTArtifact as AbiShape).abi ?? MockNFTArtifact;

export const CONTRACTS = {
  LimitedBidsShotgun: {
    address: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
    abi: limitedBidsShotgunAbi,
    abiPath: "/abi/LimitedBidsShotgun.json",
  },
  MockNFT: {
    address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    abi: mockNftAbi,
    abiPath: "/abi/MockNFT.json",
  },
} as const satisfies Record<string, ContractDefinition>;

export type ContractName = keyof typeof CONTRACTS;

export function getContractDefinition(name: ContractName): ContractDefinition {
  const contract = CONTRACTS[name];
  if (!contract) throw new Error(`Contract "${name}" is not defined in constants.ts`);
  return contract;
}
