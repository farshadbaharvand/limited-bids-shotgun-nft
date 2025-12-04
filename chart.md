'''mermaid

sequenceDiagram
    participant OwnerA
    participant OwnerB
    participant Contract

    Note over OwnerA,OwnerB: Auction not started yet (State = Idle)

    OwnerA->>Contract: initiate(price = 2 ETH) + send 1 ETH
    Contract-->>OwnerA: State = Active, initiator = OwnerA, currentPrice = 2 ETH, bidsCount = 0
    Note over OwnerA,OwnerB: OwnerA cannot make counter offers

    OwnerB->>Contract: counterOffer(newPrice = 2.5 ETH) + send 1.25 ETH
    Contract-->>OwnerB: currentPrice = 2.5 ETH, bidsCount = 1
    Note over OwnerA,OwnerB: OwnerA can now counter

    OwnerA->>Contract: counterOffer(newPrice = 3 ETH) + send 1.5 ETH
    Contract-->>OwnerA: currentPrice = 3 ETH, bidsCount = 2

    OwnerB->>Contract: counterOffer(newPrice = 3.5 ETH) + send 1.75 ETH
    Contract-->>OwnerB: currentPrice = 3.5 ETH, bidsCount = 3

    Note over OwnerA,OwnerB: Bidding continues until maxBids is reached

    OwnerA->>Contract: finish()
    Contract-->>OwnerA: NFT transferred to initiator (OwnerA)
    Contract-->>OwnerB: Bidding ended, balances can be withdrawn

    OwnerA->>Contract: withdraw()
    Contract-->>OwnerA: 1.5 ETH returned

    OwnerB->>Contract: withdraw()
    Contract-->>OwnerB: 1.25 + 1.75 ETH returned
'''