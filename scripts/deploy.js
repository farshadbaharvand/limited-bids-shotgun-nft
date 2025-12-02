import { ethers } from "hardhat";

async function main() {
  const [ownerA, ownerB] = await ethers.getSigners();

  const NFT_ADDRESS = "0x0000000000000000000000000000000000000001";
  const TOKEN_ID = 1;
  const MAX_BIDS = 5;

  const Shotgun = await ethers.getContractFactory("LimitedBidsShotgun");

  const contract = await Shotgun.deploy(
    NFT_ADDRESS,
    TOKEN_ID,
    ownerA.address,
    ownerB.address,
    MAX_BIDS
  );

  await contract.waitForDeployment();

  console.log("Shotgun deployed at:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
