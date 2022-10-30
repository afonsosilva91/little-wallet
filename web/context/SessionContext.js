import { createContext, useContext, useState } from "react";

const SessionContext = createContext({
  isLogged: false,
  contractApi: null,
  login: (contractApi) => {},
  logout: () => {},
});

export const useSessionContext = () => useContext(SessionContext);

export const SessionContextProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(true);
  const [contractApi, setContractApi] = useState(null);

  const login = async (contractApi) => {
    setContractApi(contractApi);
    setIsLogged(true);
  };

  const logout = async () => {
    setIsLogged(false);
    setContractApi(null);
    //disconnect()
  };

  const context = {
    isLogged,
    contractApi,
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
