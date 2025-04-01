import { createContext, useState } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  userName: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(null);

  const login = (username) => {
    setIsLoggedIn(true);
    setUserName(username);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserName(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
