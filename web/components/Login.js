import Image from "next/image";
import Link from "next/link";
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

export default function LoginPage() {
  const { account } = useAccount();
  const { network } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const { open } = useConnectModal();

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

  return (
    <>
      <div className="h-screen flex flex-col">
        <div className="basis-1/12"></div>
        <div className="basis-2/12">
          <Image
            width={450}
            height={150}
            style={{ margin: "auto", maxWidth: "350px", marginBottom: "40px" }}
            src={"/images/logo-red-450x150.png"}
            alt=""
          />
        </div>
        <div className="basis-5/12">
          <h2 style={{ marginBottom: "20px" }}>Create New account</h2>

          <Link className="box-account-type box-shadow" href="/dashboard">
            <div className="grid grid-rows-2 grid-flow-col gap-4">
              <div className="row-span-2">
                <Image
                  width={150}
                  height={150}
                  src={"/images/parents.jpg"}
                  alt=""
                />
              </div>
              <div className="title">Family</div>
              <div>
                <p>For parents and children accounts</p>
              </div>
            </div>
          </Link>
          <div className="box-account-type box-shadow">
            <div className="grid grid-rows-2 grid-flow-col gap-4">
              <div className="row-span-2">
                <Image
                  width={150}
                  height={150}
                  style={{ filter: "grayscale(100%)" }}
                  src={"/images/school.jpg"}
                  alt=""
                />
              </div>
              <div className="title">School</div>
              <div>
                <p>COMING SOON - For school teachers programs</p>
              </div>
            </div>
          </div>
        </div>

        <div className="basis-1/12"></div>
        <div className="basis-3/12">
          <h2 style={{ marginBottom: "20px" }}>Already have an account?</h2>
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
        </div>
      </div>
    </>
  );
}
