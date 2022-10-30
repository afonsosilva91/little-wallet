//import { useDisconnect } from "@web3modal/react"
import { Router, useRouter } from "next/router"
import { useEffect } from "react"
import Ellipsis from "../components/Loading/Ellipsis"
import { useSessionContext } from "../context/SessionContext"

export default function Logout() {
    const router = useRouter()
    const {wallet, logout, isLogged } = useSessionContext()

    useEffect(() => {
       // useDisconnect()
        logout()

        router.push('/')
    })

    return (
        <>
            <div className="h-screen flex px-20 text-center">
                <Ellipsis color={'#333'} />
            </div>
        </>
    )
}
