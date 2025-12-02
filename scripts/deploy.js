// scripts/deploy.js
const { ethers } = require("hardhat");

async function main() {
  // ====== 1. Deploy MockNFT ======
  const NFT = await ethers.getContractFactory("MockNFT");
  const nft = await NFT.deploy();
  await nft.deployed();
  console.log("MockNFT deployed to:", nft.address);

  // ====== 2. تنظیم ownerها با checksum درست ======
  const ownerA = ethers.utils.getAddress("0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"); // Hardhat Account #0
  const ownerB = ethers.utils.getAddress("0x70997970c51812dc3a010c7d01b50e0d17dc79c8"); // Hardhat Account #1

  // ====== 3. Mint یک NFT واقعی ======
  const mintTx = await nft.mint(ownerA);
  const receipt = await mintTx.wait(); // منتظر confirmation
  const tokenId = 0; // اولین NFT mint شده در MockNFT معمولا tokenId = 0
  console.log(`NFT minted to ownerA: tokenId = ${tokenId}`);

  // ====== 4. Deploy LimitedBidsShotgun ======
  const Shotgun = await ethers.getContractFactory("LimitedBidsShotgun");
  const shotgun = await Shotgun.deploy(
    nft.address,
    tokenId,   // tokenId واقعی
    ownerA,
    ownerB,
    3          // maxBids
  );
  await shotgun.deployed();
  console.log("LimitedBidsShotgun deployed to:", shotgun.address);

  // ====== 5. انتقال NFT به قرارداد Shotgun ======
  const signerA = ethers.provider.getSigner(ownerA);
  const transferTx = await nft.connect(signerA).transferFrom(
    ownerA,
    shotgun.address,
    tokenId
  );
  await transferTx.wait();
  console.log(`NFT tokenId ${tokenId} transferred to Shotgun contract`);

  // ====== 6. همه آدرس‌ها و tokenId برای فرانت‌اند ======
  console.log("\n===== Deployment Complete =====");
  console.log("MockNFT Address:", nft.address);
  console.log("Shotgun Contract Address:", shotgun.address);
  console.log("NFT tokenId:", tokenId);
  console.log("OwnerA:", ownerA);
  console.log("OwnerB:", ownerB);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
