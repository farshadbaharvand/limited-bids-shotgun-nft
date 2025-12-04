import { CONTRACTS } from "./scaffold-core/constants";

// Scaffold config — used to register contracts for scaffold hooks
export const contracts = Object.entries(CONTRACTS).map(([name, contract]) => ({
  name,
  address: contract.address,
  abiPath: contract.abiPath,
}));

export default {
  contracts,
};

