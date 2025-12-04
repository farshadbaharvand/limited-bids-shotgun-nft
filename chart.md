# 1 Limited Bids Shotgun Auction - Introduction Diagram

This diagram shows the basic idea of the project: resolving NFT co-ownership disputes via a turn-based shotgun auction.

```mermaid
flowchart TD
    NFT[NFT co-owned by 2 users] -->|Disagreement| Auction[Turn-Based Shotgun Auction]
    Auction -->|Highest Bidder Wins| Winner[NFT Ownership Updated]
    Auction -->|Other withdraws funds| Loser[ETH Returned]
    
    style NFT fill:#f9f,stroke:#333,stroke-width:1px
    style Auction fill:#bbf,stroke:#333,stroke-width:1px
    style Winner fill:#bfb,stroke:#333,stroke-width:1px
    style Loser fill:#fdd,stroke:#333,stroke-width:1px
```

---

# 2 Limited Bids Shotgun Auction - Contract & Frontend Structure

This diagram shows the main components of the LimitedBidsShotgun contract and the corresponding frontend actions for interacting with the auction.

```mermaid
flowchart TD
    UI[Frontend Interface] --> Status[Auction Status]
    Status --> State[State: Idle / Active / Finished]
    Status --> Price[Current Price]
    Status --> Bids[Bids Count]
    Status --> Participants[Participants]
    Participants --> OwnerA[Owner A]
    Participants --> OwnerB[Owner B]
    Participants --> Initiator[Initiator]

    UI --> Actions[User Actions]
    Actions --> Initiate[Initiate Auction]
    Actions --> Counter[Counter Offer]
    Actions --> Finish[Finish Auction]
    Actions --> Withdraw[Withdraw Funds]

    style UI fill:#bbf,stroke:#333,stroke-width:1px
    style Status fill:#8bf,stroke:#333,stroke-width:1px
    style State fill:#f9f,stroke:#333,stroke-width:1px
    style Price fill:#fdd,stroke:#333,stroke-width:1px
    style Bids fill:#fdd,stroke:#333,stroke-width:1px
    style Participants fill:#fdd,stroke:#333,stroke-width:1px
    style OwnerA fill:#bfb,stroke:#333,stroke-width:1px
    style OwnerB fill:#bfb,stroke:#333,stroke-width:1px
    style Initiator fill:#bfb,stroke:#333,stroke-width:1px
    style Actions fill:#8bf,stroke:#333,stroke-width:1px
    style Initiate fill:#8f8,stroke:#333,stroke-width:1px
    style Counter fill:#8f8,stroke:#333,stroke-width:1px
    style Finish fill:#8f8,stroke:#333,stroke-width:1px
    style Withdraw fill:#8f8,stroke:#333,stroke-width:1px

```



---

# 2
# Limited Bids Shotgun Auction - Contract Flow

This sequence diagram shows the interaction between the two owners and the contract during a shotgun auction.

```mermaid
sequenceDiagram
    participant OwnerA
    participant OwnerB
    participant Contract

    Note over OwnerA,OwnerB: Auction starts with two co-owners of an NFT

    OwnerA->>Contract: initiate(price, half deposit)
    Contract-->>OwnerA: Auction active, currentPrice set, highestBidder=OwnerA
    Note over Contract: State = Active, bidsCount=0

    OwnerB->>Contract: counterOffer(newPrice, half deposit)
    Contract-->>OwnerB: currentPrice updated, highestBidder=OwnerB, bidsCount++

    OwnerA->>Contract: counterOffer(newPrice, half deposit)
    Contract-->>OwnerA: currentPrice updated, highestBidder=OwnerA, bidsCount++

    Note over Contract: Repeat until maxBids reached or initiator calls finish()

    OwnerA->>Contract: finish()
    Contract-->>OwnerA: NFT transferred to highestBidder
    Contract-->>OwnerB: Auction finished

    OwnerA->>Contract: withdraw()
    Contract-->>OwnerA: ETH returned if not highestBidder

    OwnerB->>Contract: withdraw()
    Contract-->>OwnerB: ETH returned if not highestBidder

    Note over Contract: Auction complete, NFT ownership updated, all funds handled
```


---

# 11

# Limited Bids Shotgun Auction - Contract Flow (Simplified)
# Limited Bids Shotgun Auction - Contract Flow (Simplified)

```mermaid
flowchart TD
    Start[NFT co-owned by OwnerA & OwnerB] --> Initiate[Owner initiates auction]
    Initiate --> Active[Auction Active: state=Active, currentPrice set, highestBidder=Initiator]
    
    subgraph Bidding_Loop
        direction TB
        OwnerB[OwnerB counterOffer] --> Active
        OwnerA[OwnerA counterOffer] --> Active
    end
    
    Active -->|maxBids reached or initiator finishes| Finish[finish() called]
    Finish --> NFTTransfer[NFT transferred to highestBidder]
    Finish --> Withdraw[Owners withdraw ETH]
    Withdraw --> End[Auction Complete]

    style Start fill:#f9f,stroke:#333,stroke-width:1px
    style Initiate fill:#8bf,stroke:#333,stroke-width:1px
    style Active fill:#bbf,stroke:#333,stroke-width:1px
    style Bidding_Loop fill:#def,stroke:#333,stroke-width:1px,stroke-dasharray: 5 5
    style Finish fill:#8f8,stroke:#333,stroke-width:1px
    style NFTTransfer fill:#bfb,stroke:#333,stroke-width:1px
    style Withdraw fill:#ffb,stroke:#333,stroke-width:1px
    style End fill:#fdd,stroke:#333,stroke-width:1px

```