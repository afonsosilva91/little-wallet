import familyBankAbi from "../config/abi.testnet.json";

class ContractApi {
  constructor() {
    this.signer = null;
    this.contract = null;
  }

  // Needs to be called after the contructor
  async setup(provider) {
    const signer = await provider.getSigner();
    this.signer = signer;
    this.contract = new ethers.Contract(
      "0x1F262A6654F709b534Ab2F60985f09D1C23aCE4d",
      familyBankAbi,
      provider
    );
  }

  async checkAccount() {
    const tx = await this.contract
      .connect(this.signer)
      .checkAccount(this.signer.getAddress());

    const receipt = await tx.wait();
    return receipt;
  }

  async borrow(amount) {
    const tx = await this.contract.connect(this.signer).borrow(amount);

    const receipt = await tx.wait();
    return receipt;
  }

  async addChild(address, name) {
    const tx = await this.contract.connect(this.signer).addChild(address, name);

    const receipt = await tx.wait();
    return receipt;
  }

  async removeChild(address) {
    const tx = await this.contract.connect(this.signer).removeChild(address);

    const receipt = await tx.wait();
    return receipt;
  }

  async triggerWeeklyPayout(address) {
    const tx = await this.contract
      .connect(this.signer)
      .triggerWeeklyPayout(address);

    const receipt = await tx.wait();
    return receipt;
  }

  async invest(amount) {
    const tx = await this.contract.connect(this.signer).invest(amount);

    const receipt = await tx.wait();
    return receipt;
  }

  async withdrawInvestments() {
    const tx = await this.contract.connect(this.signer).withdrawInvestments();

    const receipt = await tx.wait();
    return receipt;
  }
}

export { ContractApi };
