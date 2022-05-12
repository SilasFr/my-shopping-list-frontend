import { createContext, useState } from 'react';

export const UserContext = createContext();

const LOCAL_STORAGE_KEY = 'my-sopping-list-token';
const persistedToken = localStorage.getItem(LOCAL_STORAGE_KEY);

export default function UserProvider({ children }) {
  const [token, setToken] = useState(persistedToken);

  function login(token) {
    setToken(token);
    localStorage.setItem(LOCAL_STORAGE_KEY, token);
  }

  function logout() {
    setToken(null);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }

  return (
    <UserContext.Provider value={{ token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
