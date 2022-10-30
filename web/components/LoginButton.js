import {
    Web3Modal,
    useConnectModal,
    useAccount,
    useNetwork,
    useSwitchNetwork
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
    const router = useRouter()
    const { login, wallet, isLogged } = useSessionContext()
    const { account } = useAccount()
    const { network, isReady: isNetworkReady } = useNetwork()
    const { open } = useConnectModal()
    const [joinFamily, setJoinFamily] = useState(false)


    const { switchNetwork } = useSwitchNetwork();
    const [isNetworkSupported, setIsNetworkSupported] = useState(false)

    useEffect(() => {
        if (isNetworkReady) {
            const filteredChains = supportedChains.filter((chain) => chain.id == network?.chain?.id)
            setIsNetworkSupported(filteredChains.length > 0)
        }
    }, [isNetworkReady])

    const networkName = () => {
        const filteredNetwork = supportedChains.filter(
            (chain) => chain.id == network?.chain?.id
        )
        return filteredNetwork[0]?.name
    }

    const checkAccount = async () => {
        try {
            console.log('checkAccount > ContractApi')
            const contractApi = new ContractApi()
            await contractApi.setup()

            const result = await contractApi.checkAccount(account.address)
            if (result.existingAccount) {
                console.log(account)
                login(account.address)
                router.push("/")
                return;
            } else {
                setJoinFamily(true)
                await contractApi.addChild();
                checkAccount()
            }

        } catch (ex) {
            const disconnect = useDisconnect()
            disconnect()

            console.log('[checkAccount] exception: ', ex)
        }
    }

    const joinFamilyAccount = () => {
        
        try {
            //const contractApi = new ContractApi()
            //console.log(contractApi)
        } catch (ex) {
            console.log('[joinFamilyAccount] exception: ', ex)
        }
    }

    useEffect(() => {
        if (account.isConnected && isNetworkSupported) {
            console.log('useEffect > checkAccount')
            checkAccount()
        }
    }, [account.isConnected, isNetworkSupported])

    return (
        <>
            {!account.isConnected ? (
                <div className="btn-red hover:btn-red-hover w-4/5" onClick={open}>Connect Wallet</div>
            ) : 
                !isNetworkSupported ? (
                    supportedChains.map((chain) => (
                        <button
                            key={chain.id}
                            className="btn-red hover:btn-red-hover w-4/5 mb-4"
                            onClick={async () => await switchNetwork({ chainId: chain.id }).then(_ => setIsNetworkSupported(true))}>
                            Switch to {chain.name}
                        </button>
                    ))
                ) :
                    joinFamily ? (
                        <div className="btn-red hover:btn-red-hover w-4/5" onClick={joinFamilyAccount}>Join Family Account</div>
                    ) : (
                        <p>{`You're connected to ${networkName()}`}</p>
                    )
            }

            <Web3Modal config={config} />
        </>
    )
}
