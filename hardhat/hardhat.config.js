require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()

const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL || ''
const CHIADO_GNOSIS_RPC_URL = process.env.CHIADO_GNOSIS_RPC_URL || ''
const PRIVATE_KEY = process.env.PRIVATE_KEY || ''

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    mainnet: {
      url: MAINNET_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 1
    },
    gnosis: {
      url: CHIADO_GNOSIS_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 10200,
    },
    localhost: {
      url: "http://localhost:8545",
      chainId: 31337,
    },
  },
  etherscan: {
    apiKey: '__API_KEY__'
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
};
