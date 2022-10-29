const hre = require("hardhat");
const { ethers, run, network } = require("hardhat")

async function main() {
  console.log(`Start deployment on chain (${network.config.chainId})`)

  const littleWalletFactory = await ethers.getContractFactory("LittleWalletFactory")

  console.log(`Deploying collection contract: ${collectionName}`)
  const littleWalletContract = await littleWalletFactory.deploy()
  await littleWalletContract.deployed()
  console.log(`Contract deployed to: ${littleWalletContract.address}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});