
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract LimitedBidsShotgun is ReentrancyGuard {
    IERC721 public nft;
    uint256 public tokenId;

    address public ownerA;
    address public ownerB;

    uint256 public currentPrice;
    uint256 public maxBids;
    uint256 public bidCount;

    address public initiator;
    address public counterparty;

    mapping(address => uint256) public balances;

    enum State { Idle, Active, Finished }
    State public state;

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

    modifier onlyOwners() {
        require(msg.sender == ownerA || msg.sender == ownerB, "Not owner");
        _;
    }

    function initiate(uint256 price) external payable onlyOwners {
        require(state == State.Idle, "Already started");
        require(msg.value == price / 2, "Need half of price");
        require(nft.ownerOf(tokenId) == address(this), "Contract not NFT owner");

        initiator = msg.sender;
        counterparty = (msg.sender == ownerA ? ownerB : ownerA);
        currentPrice = price;
        balances[msg.sender] += msg.value;
        state = State.Active;
    }

    function counterOffer(uint256 newPrice) external payable onlyOwners {
        require(state == State.Active, "Not active");
        require(msg.sender == counterparty, "Not counterparty");
        require(newPrice > currentPrice, "Price too low");
        require(bidCount < maxBids, "Bid limit reached");

        uint256 requiredHalf = newPrice / 2;
        require(msg.value + balances[msg.sender] == requiredHalf, "Must reach half");

        currentPrice = newPrice;
        balances[msg.sender] += msg.value;
        bidCount++;
        initiator = msg.sender;
        counterparty = (msg.sender == ownerA ? ownerB : ownerA);
    }

    function finish() external nonReentrant {
        require(state == State.Active, "Not active");
        require(msg.sender == initiator, "Only initiator");

        state = State.Finished;
        nft.transferFrom(address(this), initiator, tokenId);
    }

    function withdraw() external nonReentrant {
        require(state == State.Finished, "Not finished");
        uint256 amount = balances[msg.sender];
        balances[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }
}
