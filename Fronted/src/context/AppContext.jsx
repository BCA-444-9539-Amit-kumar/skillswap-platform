/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("skillswap_token"));
  const [user, setUser] = useState(() => token ? { name:"Amit Kumar", initials:"AK", role:"Provider · Admin" } : null);
  const [toasts, setToasts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [walletBalance, setWalletBalance] = useState(12840);

  const login = useCallback((authToken, userData = { name:"Amit Kumar", initials:"AK", role:"Provider · Admin" }) => {
    localStorage.setItem("skillswap_token", authToken);
    setToken(authToken);
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("skillswap_token");
    setToken(null);
    setUser(null);
  }, []);

  const isAuthenticated = Boolean(token);

  const addToast = useCallback((message, type = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  }, []);

  const showLoading = useCallback((msg = "Loading…") => { setLoadingMsg(msg); setIsLoading(true);  }, []);
  const hideLoading = useCallback(()                => { setIsLoading(false); setLoadingMsg(""); }, []);

  // Graceful API wrapper — falls back to demo on network error
  const safeCall = useCallback(async (apiFn, onSuccess) => {
    showLoading();
    try {
      const res = await apiFn();
      hideLoading();
      onSuccess(res.data);
    } catch (err) {
      hideLoading();
      if (!err.response) {
        console.info("[SkillSwap] Backend offline – running demo mode");
        onSuccess({ success: true, demo: true });
      } else {
        addToast(err.response?.data?.message || err.message, "error");
      }
    }
  }, [showLoading, hideLoading, addToast]);

  return (
    <AppContext.Provider value={{ user, isAuthenticated, login, logout, toasts, isLoading, loadingMsg, walletBalance, setWalletBalance, addToast, showLoading, hideLoading, safeCall }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
