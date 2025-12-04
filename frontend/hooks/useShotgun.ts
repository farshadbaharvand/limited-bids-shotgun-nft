"use client";

import { useCallback, useMemo } from "react";
import {
  useScaffoldReadContract,
  useScaffoldWriteContract,
  publicClient,
} from "../scaffold-core";

export function useShotgun() {
  // Reactive contract reads (with automatic refetching).
  const currentPriceResult = useScaffoldReadContract({
    contractName: "LimitedBidsShotgun",
    functionName: "currentPrice",
    watch: true,
  });

  const bidsCountResult = useScaffoldReadContract({
    contractName: "LimitedBidsShotgun",
    functionName: "bidsCount",
    watch: true,
  });

  const stateResult = useScaffoldReadContract({
    contractName: "LimitedBidsShotgun",
    functionName: "state",
    watch: true,
  });

  const ownerAResult = useScaffoldReadContract({
    contractName: "LimitedBidsShotgun",
    functionName: "ownerA",
    watch: true,
  });

  const ownerBResult = useScaffoldReadContract({
    contractName: "LimitedBidsShotgun",
    functionName: "ownerB",
    watch: true,
  });

  const initiatorResult = useScaffoldReadContract({
    contractName: "LimitedBidsShotgun",
    functionName: "initiator",
    watch: true,
  });

  const refetchAll = useCallback(async () => {
    await Promise.all([
      currentPriceResult.refetch?.(),
      bidsCountResult.refetch?.(),
      stateResult.refetch?.(),
      ownerAResult.refetch?.(),
      ownerBResult.refetch?.(),
      initiatorResult.refetch?.(),
    ]);
  }, [
    currentPriceResult.refetch,
    bidsCountResult.refetch,
    stateResult.refetch,
    ownerAResult.refetch,
    ownerBResult.refetch,
    initiatorResult.refetch,
  ]);

  // Enhance write hooks so they wait for the tx receipt and then refetch all reads.
  const enhanceWrite = useCallback(
    (writeHook: ReturnType<typeof useScaffoldWriteContract>) => ({
      ...writeHook,
      async writeAsync(options?: Parameters<typeof writeHook.writeAsync>[0]) {
        const hash = await writeHook.writeAsync(options);
        await publicClient.waitForTransactionReceipt({ hash });
        await refetchAll();
        return hash;
      },
    }),
    [refetchAll]
  );

  const initiateWriteHook = useScaffoldWriteContract({
    contractName: "LimitedBidsShotgun",
    functionName: "initiate",
  });
  const counterWriteHook = useScaffoldWriteContract({
    contractName: "LimitedBidsShotgun",
    functionName: "counterOffer",
  });
  const finishWriteHook = useScaffoldWriteContract({
    contractName: "LimitedBidsShotgun",
    functionName: "finish",
  });
  const withdrawWriteHook = useScaffoldWriteContract({
    contractName: "LimitedBidsShotgun",
    functionName: "withdraw",
  });

  const initiateWrite = useMemo(
    () => enhanceWrite(initiateWriteHook),
    [enhanceWrite, initiateWriteHook]
  );
  const counterWrite = useMemo(
    () => enhanceWrite(counterWriteHook),
    [enhanceWrite, counterWriteHook]
  );
  const finishWrite = useMemo(
    () => enhanceWrite(finishWriteHook),
    [enhanceWrite, finishWriteHook]
  );
  const withdrawWrite = useMemo(
    () => enhanceWrite(withdrawWriteHook),
    [enhanceWrite, withdrawWriteHook]
  );

  const participants = useMemo(() => {
    const addresses = [
      ownerAResult.data,
      ownerBResult.data,
      initiatorResult.data,
    ];
    return Array.from(
      new Set(
        addresses.filter((addr): addr is string => typeof addr === "string" && addr.length > 0)
      )
    );
  }, [ownerAResult.data, ownerBResult.data, initiatorResult.data]);

  const isLoading =
    currentPriceResult.isLoading ||
    bidsCountResult.isLoading ||
    stateResult.isLoading ||
    ownerAResult.isLoading ||
    ownerBResult.isLoading ||
    initiatorResult.isLoading;

  return {
    currentPrice: currentPriceResult.data as bigint | undefined,
    bidsCount: bidsCountResult.data as bigint | undefined,
    state: stateResult.data as number | undefined,
    ownerA: ownerAResult.data as string | undefined,
    ownerB: ownerBResult.data as string | undefined,
    initiator: initiatorResult.data as string | undefined,
    participants,
    isLoading,
    initiateWrite,
    counterWrite,
    finishWrite,
    withdrawWrite,
    refetchAll,
  };
}
