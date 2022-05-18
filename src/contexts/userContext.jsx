import { createContext, useState } from 'react';

export const UserContext = createContext();

const LOCAL_STORAGE_KEY = 'my-shopping-list-token';

export default function UserProvider({ children }) {
  const persistedToken = localStorage.getItem(LOCAL_STORAGE_KEY);
  const [token, setToken] = useState(persistedToken);
  const [userData, setUserData] = useState(null);
  const [lists, setLists] = useState([]);

  function login(token) {
    setToken(token);
    localStorage.setItem(LOCAL_STORAGE_KEY, token);
  }

  function logout() {
    setToken(null);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }

  return (
    <UserContext.Provider
      value={{ token, login, logout, userData, setUserData, lists, setLists }}
    >
      {children}
    </UserContext.Provider>
  );
}
