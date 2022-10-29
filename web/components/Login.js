import { Web3Modal, Web3Button, useAccount, useDisconnect } from '@web3modal/react'
import { providers } from '@web3modal/ethereum'
import { gnosisTestnet, cronosTestnet } from "../utils/networks"

const config = {
  projectId: '8f6b3f536190073bbe77b9d66f4d22da',
  theme: 'light',
  accentColor: "default",
  ethereum: {
    appName: 'Little Wallet',
    autoConnect: true,
    chains: [
      gnosisTestnet,
      cronosTestnet
    ],
    providers: [
      providers.walletConnectProvider({
        projectId: "8f6b3f536190073bbe77b9d66f4d22da",
      }),
    ],
  },
}

export default function Login() {
  const { account } = useAccount()
  const disconnect = useDisconnect()

  return (
    <>
      {account.isConnected ? <h1>{account.address}</h1> : null}
      {account.isConnected ? <button onClick={disconnect}>Disconnect</button> : <Web3Button />}
      <Web3Modal config={config} />
    </>
  );
}