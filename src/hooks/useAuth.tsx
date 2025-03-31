// src/hooks/useAuth.tsx
"use client";

import { useState, useEffect } from "react";
import { login as loginAPI, logout as logoutAPI, getToken } from "@/lib/auth";

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setToken(getToken() ?? null);
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const accessToken = await loginAPI(email, password);
      setToken(accessToken);
      return accessToken;
    } catch (error) {
      setToken(null);
      throw error;
    }
  };

  const logout = () => {
    logoutAPI();
    setToken(null);
  };

  return { token, isLoading, login, logout };
}