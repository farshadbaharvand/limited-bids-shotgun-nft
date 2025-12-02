const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("LimitedBidsShotgun", function () {
  let nft, shotgun;
  let ownerA, ownerB, other;
  let tokenId;

  const INITIAL_PRICE = ethers.utils.parseEther("2"); // 2 ETH
  const MAX_BIDS = 3;

  beforeEach(async () => {
    [ownerA, ownerB, other] = await ethers.getSigners();

    // Deploy Mock NFT
    const NFT = await ethers.getContractFactory("MockNFT");
    nft = await NFT.deploy();
    await nft.deployed();

    // Mint NFT to ownerA → returns tokenId
    const tx = await nft.mint(ownerA.address);
    const receipt = await tx.wait();
    tokenId = receipt.events[0].args.tokenId;

    // Deploy Shotgun contract
    const Shotgun = await ethers.getContractFactory("LimitedBidsShotgun");
    shotgun = await Shotgun.deploy(
      nft.address,
      tokenId,
      ownerA.address,
      ownerB.address,
      MAX_BIDS
    );
    await shotgun.deployed();

    // Transfer NFT to shotgun contract
    await nft.connect(ownerA).transferFrom(ownerA.address, shotgun.address, tokenId);
  });

  // --------------------------------------------------------------
  it("should initialize correctly", async () => {
    expect(await shotgun.state()).to.equal(0); // Idle
    expect(await shotgun.maxBids()).to.equal(MAX_BIDS);
    expect(await shotgun.currentPrice()).to.equal(0);
    expect(await nft.ownerOf(tokenId)).to.equal(shotgun.address);
  });

  // --------------------------------------------------------------
  it("should allow an owner to initiate", async () => {
    const half = INITIAL_PRICE.div(2);

    await shotgun.connect(ownerA).initiate(INITIAL_PRICE, { value: half });

    expect(await shotgun.state()).to.equal(1); // Active
    expect(await shotgun.currentPrice()).to.equal(INITIAL_PRICE);
  });

  // --------------------------------------------------------------
  it("should revert if deposit != half of price", async () => {
    await expect(
      shotgun.connect(ownerA).initiate(INITIAL_PRICE, {
        value: ethers.utils.parseEther("0.1"),
      })
    ).to.be.revertedWith("Need half of price");
  });

  // --------------------------------------------------------------
  it("should allow counterOffer with higher price", async () => {
    const half = INITIAL_PRICE.div(2);
    await shotgun.connect(ownerA).initiate(INITIAL_PRICE, { value: half });

    const newPrice = INITIAL_PRICE.add(ethers.utils.parseEther("1"));
    const counterHalf = newPrice.div(2);

    await shotgun.connect(ownerB).counterOffer(newPrice, { value: counterHalf });

    expect(await shotgun.currentPrice()).to.equal(newPrice);
    expect(await shotgun.bidsCount()).to.equal(1);
  });

  // --------------------------------------------------------------
  it("should revert if counterOffer is too low", async () => {
    const half = INITIAL_PRICE.div(2);
    await shotgun.connect(ownerA).initiate(INITIAL_PRICE, { value: half });

    const lowPrice = INITIAL_PRICE.sub(ethers.utils.parseEther("0.1"));

    await expect(
      shotgun.connect(ownerB).counterOffer(lowPrice, { value: lowPrice.div(2) })
    ).to.be.revertedWith("Price too low");
  });

  // --------------------------------------------------------------
  it("should revert if bid limit reached", async () => {
    const half = INITIAL_PRICE.div(2);
    await shotgun.connect(ownerA).initiate(INITIAL_PRICE, { value: half });
  
    let currentPrice = INITIAL_PRICE;
  
    // فقط ownerB حق counterOffer دارد
    for (let i = 0; i < MAX_BIDS; i++) {
      currentPrice = currentPrice.add(ethers.utils.parseEther("1"));
      await shotgun.connect(ownerB).counterOffer(currentPrice, {
        value: currentPrice.div(2),
      });
    }
  
    // تلاش برای bid بعدی باید fail شود
    const nextPrice = currentPrice.add(ethers.utils.parseEther("1"));
    await expect(
      shotgun.connect(ownerB).counterOffer(nextPrice, { value: nextPrice.div(2) })
    ).to.be.revertedWith("Bid limit reached");
  });

  // --------------------------------------------------------------
  it("should allow initiator to finish and receive NFT", async () => {
    const half = INITIAL_PRICE.div(2);
    await shotgun.connect(ownerA).initiate(INITIAL_PRICE, { value: half });

    await shotgun.connect(ownerA).finish();

    expect(await shotgun.state()).to.equal(2); // Finished
    expect(await nft.ownerOf(tokenId)).to.equal(ownerA.address);
  });

  // --------------------------------------------------------------
  it("should revert finish by non-initiator", async () => {
    const half = INITIAL_PRICE.div(2);
    await shotgun.connect(ownerA).initiate(INITIAL_PRICE, { value: half });

    await expect(shotgun.connect(ownerB).finish()).to.be.revertedWith("Only initiator");
  });

  // --------------------------------------------------------------
  it("should allow withdrawing after finish", async () => {
    const half = INITIAL_PRICE.div(2);

    await shotgun.connect(ownerA).initiate(INITIAL_PRICE, { value: half });
    await shotgun.connect(ownerA).finish();

    const before = await ethers.provider.getBalance(ownerA.address);
    const tx = await shotgun.connect(ownerA).withdraw();
    await tx.wait();
    const after = await ethers.provider.getBalance(ownerA.address);

    expect(after).to.be.gt(before);
  });

  // --------------------------------------------------------------
  it("should revert withdraw before finish", async () => {
    const half = INITIAL_PRICE.div(2);
    await shotgun.connect(ownerA).initiate(INITIAL_PRICE, { value: half });

    await expect(shotgun.connect(ownerA).withdraw()).to.be.revertedWith("Not finished");
  });
});

