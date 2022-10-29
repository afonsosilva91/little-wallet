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
    const familyBank = await FamilyBank.deploy(parent.address);
    await familyBank.connect(parent).addChild(child.address, "Peter");
    await familyBank.triggerWeeklyPayout(child.address);

    return { familyBank, owner, parent, child };
  }

  describe("Weekly Payout", function () {
    it("Should pay out $20 to child when deployed", async function () {
      const { familyBank, child } = await loadFixture(deployFamilyBankFixture);

      expect(await familyBank.balanceOf(child.address)).to.equal("2000");
    });
  });

  describe("Investing", async function () { 
    it("Should present to the child interest on the investment", async function () {
      const { familyBank, child } = await loadFixture(deployFamilyBankFixture);

      const sumToInvest = 2000;
      const interest = await familyBank.connect(child).calculateInterest(sumToInvest);

      expect(interest).to.equal(400);
    });

    it("Should lock the invested tokens", async function () {
      const { familyBank, child } = await loadFixture(deployFamilyBankFixture);

      const sumToInvest = 2000;
      await familyBank.connect(child).invest(sumToInvest);

      expect(await familyBank.balanceOf(child.address)).to.equal(0);
    });

    it("Should allow to withdraw investment with interest after 1 week", async function () {
      const { familyBank, child } = await loadFixture(deployFamilyBankFixture);
      const sumToInvest = 2000;
      await familyBank.connect(child).invest(sumToInvest);

      await familyBank.connect(child).withdrawInvestments();

      expect(await familyBank.balanceOf(child.address)).to.equal(2400);
    })
  });
});
