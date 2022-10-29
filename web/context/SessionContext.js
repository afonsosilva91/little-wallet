import { createContext, useContext, useState } from "react"

const SessionContext = createContext({
    isLogged: false,
    wallet: '',
    login: (wallet) => {},
    logout: () => {}
})

export const useSessionContext = () => useContext(SessionContext)

export const SessionContextProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(true)
    const [wallet, setWallet] = useState(null)

    const login = async (wallet) => {
        setWallet(wallet)
        setIsLogged(true)
    }

    const logout = async() => {
        setIsLogged(false)
        setWallet(null)
        //disconnect()
    }

    const context = { 
        isLogged,
        wallet,
        login,
        logout
    }
    
    return (
        <SessionContext.Provider value={context}>
            {children}
        </SessionContext.Provider>
    )
}

export default SessionContext