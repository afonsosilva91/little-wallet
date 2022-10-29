import {
  Web3Modal,
  useConnectModal,
  useAccount,
  useNetwork,
  useSwitchNetwork,
} from "@web3modal/react";
import { providers } from "@web3modal/ethereum";
import {
  gnosisTestnet,
  cronosTestnet,
  supportedChains,
} from "../utils/networks";

import { ContractApi } from "../utils/contractApi";
import { useEffect, useState } from "react";
import { useSessionContext } from "../context/SessionContext";
import { useRouter } from "next/router";

const config = {
  projectId: "8f6b3f536190073bbe77b9d66f4d22da",
  theme: "light",
  accentColor: "default",
  ethereum: {
    appName: "Little Wallet",
    autoConnect: true,
    chains: [gnosisTestnet, cronosTestnet],
    providers: [
      providers.walletConnectProvider({
        projectId: "8f6b3f536190073bbe77b9d66f4d22da",
      }),
    ],
  },
};

export default function LoginButton() {
  const router = useRouter();
  const { login } = useSessionContext();
  const { account } = useAccount();
  const { network } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const { open } = useConnectModal();
  const [accountCreated, setAccountCreated] = useState(false);
  const [creatingAccount, setCreatingAccount] = useState(false);

  const supportedNetwork = () => {
    const filteredChains = supportedChains.filter(
      (chain) => chain.id == network.chain.id
    );
    return filteredChains.length > 0;
  };

  const networkName = () => {
    const filteredNetwork = supportedChains.filter(
      (chain) => chain.id == network.chain.id
    );
    return filteredNetwork[0]?.name;
  };

  const upsertAccount = async () => {
    console.log("upsertAccount");
    const contractApi = new ContractApi();
    await contractApi.setup();

    const result = await contractApi.checkAccount();
    if (result[0]) {
      setAccountCreated(true);
    } else {
      await contractApi.addChild();
      const result = await contractApi.checkAccount();
      setAccountCreated(result[0]);
    }
  };

  useEffect(() => {
    if (account.isConnected && supportedNetwork() && !creatingAccount) {
      setCreatingAccount(true);
      upsertAccount();
      setCreatingAccount(false);
      return;
    }
  }, [account]);

  useEffect(() => {
    if (account.isConnected && supportedNetwork() && accountCreated) {
      login(account.address);
      router.push("/");
      return;
    }
  }, [accountCreated]);

  return (
    <>
      {!account.isConnected ? (
        <div className="btn-red hover:btn-red-hover w-4/5" onClick={open}>
          Connect Wallet
        </div>
      ) : (
        <div>
          {!supportedNetwork() ? (
            supportedChains.map((chain) => (
              <button
                key={chain.id}
                className="btn-red hover:btn-red-hover w-4/5 mb-4"
                onClick={async () => switchNetwork({ chainId: chain.id })}
              >
                Switch to {chain.name}
              </button>
            ))
          ) : (
            <p>{`You're connected to ${networkName()}`}</p>
          )}
        </div>
      )}
      <Web3Modal config={config} />
    </>
  );
}
