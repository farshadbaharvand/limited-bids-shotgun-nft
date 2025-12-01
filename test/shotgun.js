
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LimitedBidsShotgun", function() {
  it("works basic flow", async () => {
    const [owner, a, b] = await ethers.getSigners();

    const MockNFT = await ethers.getContractFactory("MockNFT");
    const nft = await MockNFT.deploy();
    await nft.mint(a.address, 1);

    const Shotgun = await ethers.getContractFactory("LimitedBidsShotgun");
    const sg = await Shotgun.deploy(await nft.getAddress(),1,a.address,b.address,3);

    await nft.connect(a).transferFrom(a.address, await sg.getAddress(),1);

    await sg.connect(a).initiate(100, { value: 50 });

    await sg.connect(b).counterOffer(120, { value: 60 });

    await sg.connect(b).finish();

    expect(await nft.ownerOf(1)).to.equal(b.address);
  });
});
