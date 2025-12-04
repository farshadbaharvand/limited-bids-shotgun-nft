// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC721 {
    function transferFrom(address from, address to, uint256 tokenId) external;
    function ownerOf(uint256 tokenId) external view returns (address);
}

contract LimitedBidsShotgun {
    enum State { Idle, Active, Finished }

    IERC721 public nft;
    uint256 public tokenId;
    address public ownerA;
    address public ownerB;
    uint256 public maxBids;

    uint256 public currentPrice;
    uint256 public bidsCount;
    State public state;
    address public initiator;
    mapping(address => uint256) public balances;

    constructor(
        address _nft,
        uint256 _tokenId,
        address _ownerA,
        address _ownerB,
        uint256 _maxBids
    ) {
        nft = IERC721(_nft);
        tokenId = _tokenId;
        ownerA = _ownerA;
        ownerB = _ownerB;
        maxBids = _maxBids;
        state = State.Idle;
    }

    function initiate(uint256 price) external payable {
        require(state == State.Idle, "Already active");
        require(msg.sender == ownerA || msg.sender == ownerB, "Not an owner");
        require(msg.value * 2 == price, "Need half of price");

        currentPrice = price;
        bidsCount = 0;
        initiator = msg.sender;
        balances[msg.sender] += msg.value;
        state = State.Active;
    }

    function counterOffer(uint256 newPrice) external payable {
        require(state == State.Active, "Not active");
        require(msg.sender == ownerA || msg.sender == ownerB, "Not a participant");
        require(msg.sender != initiator, "Initiator cannot counter");
        require(newPrice > currentPrice, "Price too low");
        require(bidsCount < maxBids, "Bid limit reached");

        uint256 half = newPrice / 2;
        require(msg.value == half, "Need half of new price");

        currentPrice = newPrice;
        balances[msg.sender] += msg.value;
        bidsCount++;
    }

    function finish() external {
        require(state == State.Active, "Not active");
        require(msg.sender == initiator, "Only initiator");

        nft.transferFrom(address(this), initiator, tokenId);
        state = State.Finished;
    }

    function withdraw() external {
        require(state == State.Finished, "Not finished");
        uint256 amount = balances[msg.sender];
        require(amount > 0, "Nothing to withdraw");
        balances[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }
}
