import {
  useScaffoldReadContract,
  useScaffoldWriteContract
} from "../scaffold-core";

export function useShotgun() {
  // Read contract values
  const { data: currentPrice } = useScaffoldReadContract({
    contractName: 'LimitedBidsShotgun',
    functionName: 'currentPrice',
  });

  const { data: bidsCount } = useScaffoldReadContract({
    contractName: 'LimitedBidsShotgun',
    functionName: 'bidsCount',
  });

  const { data: state } = useScaffoldReadContract({
    contractName: 'LimitedBidsShotgun',
    functionName: 'state',
  });

  const { data: ownerA } = useScaffoldReadContract({
    contractName: 'LimitedBidsShotgun',
    functionName: 'ownerA',
  });

  const { data: ownerB } = useScaffoldReadContract({
    contractName: 'LimitedBidsShotgun',
    functionName: 'ownerB',
  });

  const { data: initiator } = useScaffoldReadContract({
    contractName: 'LimitedBidsShotgun',
    functionName: 'initiator',
  });

  // Write functions
  const initiateWrite = useScaffoldWriteContract({
    contractName: 'LimitedBidsShotgun',
    functionName: 'initiate',
  });

  const counterWrite = useScaffoldWriteContract({
    contractName: 'LimitedBidsShotgun',
    functionName: 'counterOffer',
  });

  const finishWrite = useScaffoldWriteContract({
    contractName: 'LimitedBidsShotgun',
    functionName: 'finish',
  });

  const withdrawWrite = useScaffoldWriteContract({
    contractName: 'LimitedBidsShotgun',
    functionName: 'withdraw',
  });

  return {
    // Read data
    currentPrice,
    bidsCount,
    state,
    ownerA,
    ownerB,
    initiator,
    // Write functions
    initiateWrite,
    counterWrite,
    finishWrite,
    withdrawWrite,
  };
}
