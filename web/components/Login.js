import { Web3Modal } from '@web3modal/react'
import { Web3Button, useAccount } from '@web3modal/react';
import { useDisconnect } from '@web3modal/react'

const config = {
  projectId: '8f6b3f536190073bbe77b9d66f4d22da',
  theme: 'dark',
  accentColor: 'default',
  ethereum: {
    appName: 'web3Modal'
  }
}

export default function Login() {
  const { account } = useAccount()
  const disconnect = useDisconnect()

  const disconnectWallet = () => {
    disconnect()
  };

  return (
    <>
      {account.isConnected ? <h1>{account.address}</h1> : null}
      {account.isConnected ? <button onClick={()=> disconnectWallet()}>Disconnect</button> : <Web3Button />}
      <Web3Modal config={config} />
    </>
  );
}