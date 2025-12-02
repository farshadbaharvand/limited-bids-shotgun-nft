import { useScaffoldReadContract, useScaffoldWriteContract } from '@scaffold-eth/core';

export function useShotgun() {
  // read contract values
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

  const { data: ownerA } = useScaffoldReadContract({ contractName: 'LimitedBidsShotgun', functionName: 'ownerA' });
  const { data: ownerB } = useScaffoldReadContract({ contractName: 'LimitedBidsShotgun', functionName: 'ownerB' });
  const { data: initiator } = useScaffoldReadContract({ contractName: 'LimitedBidsShotgun', functionName: 'initiator' });

  // write functions
  const initiateWrite = useScaffoldWriteContract({ contractName: 'LimitedBidsShotgun', functionName: 'initiate' });
  const counterWrite = useScaffoldWriteContract({ contractName: 'LimitedBidsShotgun', functionName: 'counterOffer' });
  const finishWrite = useScaffoldWriteContract({ contractName: 'LimitedBidsShotgun', functionName: 'finish' });
  const withdrawWrite = useScaffoldWriteContract({ contractName: 'LimitedBidsShotgun', functionName: 'withdraw' });

  return {
    currentPrice,
    bidsCount,
    state,
    ownerA,
    ownerB,
    initiator,
    initiateWrite,
    counterWrite,
    finishWrite,
    withdrawWrite,
  };
}