import { createContext, useContext, useState } from "react";

const SessionContext = createContext({
    isLogged: false,
    wallet: '',
    login: (wallet) => {},
    logout: () => {},
    setProvider: () => {}
})


export const useSessionContext = () => useContext(SessionContext);

export const SessionContextProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false)
    const [wallet, setWallet] = useState(null)

  const login = async (_wallet) => {
    setWallet(_wallet)
    setIsLogged(true);
  };

  const logout = async () => {
    setIsLogged(false);
    //disconnect()
  };

  const context = {
    isLogged,
    wallet,
    login,
    logout,
  };

  return (
    <SessionContext.Provider value={context}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContext;
