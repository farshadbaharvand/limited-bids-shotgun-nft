
// Hardhat deploy script
const hre = require("hardhat");

async function main() {
  const [deployer, a, b] = await hre.ethers.getSigners();

  const MockNFT = await hre.ethers.getContractFactory("MockNFT");
  const nft = await MockNFT.deploy();
  await nft.waitForDeployment();
  const addrNFT = await nft.getAddress();

  await nft.mint(a.address, 1);

  const Shotgun = await hre.ethers.getContractFactory("LimitedBidsShotgun");
  const shotgun = await Shotgun.deploy(addrNFT,1,a.address,b.address,5);
  await shotgun.waitForDeployment();

  console.log("NFT:", addrNFT);
  console.log("Shotgun:", await shotgun.getAddress());
}

main().catch(console.error);
