//import { useDisconnect } from "@web3modal/react"
import { Router, useRouter } from "next/router"
import { useEffect } from "react"
import { useSessionContext } from "../context/SessionContext"

export default function Logout() {
    const router = useRouter()
    const {wallet, logout, isLogged } = useSessionContext()

    useEffect(() => {
       // useDisconnect()
        logout()

        console.log(wallet, isLogged)
        //router.push('/')
    })

    return (
        <>
            <div className="h-screen flex flex-col px-8">
               LOGOUT
            </div>
        </>
    )
}
