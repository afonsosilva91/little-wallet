import familyBankAbi from "../config/abi.testnet.json";
import { ethers } from "ethers";

class ContractApi {
  constructor() {
    this.address = null;
    this.signer = null;
    this.contract = null;
  }

  // Needs to be called after the contructor
  async setup() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    this.address = accounts[0];
    this.signer = provider.getSigner();

    this.contract = new ethers.Contract(
      "0xd139987758C853179dB0a58c7Ebbb509a15F4c45",
      familyBankAbi,
      provider
    );
  }

  getAddress() {
    return this.address;
  }

  async checkAccount() {
    const result = await this.contract.checkAccount(this.address);
    console.log("Result", result);
    return result;
  }

  async borrow(amount) {
    console.log("Borrow");
    const tx = await this.contract.connect(this.signer).borrow(amount);

    const receipt = await tx.wait();
    return receipt;
  }

  async addChild() {
    const name = `Child - ${this.address.substr(this.address.length - 5)}`;
    const tx = await this.contract
      .connect(this.signer)
      .addChild(this.address, name);

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
