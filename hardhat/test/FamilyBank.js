const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("FamilyBank", function () {
  async function deployFamilyBankFixture() {
    const [owner, parent, child] = await ethers.getSigners();

    const FamilyBank = await ethers.getContractFactory("FamilyBank");
    const familyBank = await FamilyBank.deploy(parent.address, child.address);

    return { familyBank, owner, parent, child };
  }

  describe("Weekly Payout", function () {
    it("Should pay out $20 to child when deployed", async function () {
      const { familyBank, child } = await loadFixture(deployFamilyBankFixture);

      expect(await familyBank.balanceOf(child.address)).to.equal("2000");
    });
  });
});
