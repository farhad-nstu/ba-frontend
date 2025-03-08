// src/context/AuthContext.js
import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // Memoized logout function
  const logout = useCallback(() => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
  }, []);

  // Memoized login function with logout as dependency
  const login = useCallback(async ({ email, password, token: socialToken }) => {
    try {
      let authToken = socialToken;

      if (!socialToken) {
        const response = await axios.post("http://localhost:8000/api/login", {
          email,
          password,
        });
        authToken = response.data.token;
      }

      setToken(authToken);
      localStorage.setItem("token", authToken);

      const { data } = await axios.get("http://localhost:8000/api/profile", {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      setUser(data);
    } catch (error) {
      console.error("Login failed", error);
      logout(); // Use memoized logout here
    }
  }, [logout]);

  useEffect(() => {
    if (token) {
      login({ token });
    }
  }, [token, login]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
