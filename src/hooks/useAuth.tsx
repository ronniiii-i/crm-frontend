// src/hooks/useAuth.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login as loginAPI, logout as logoutAPI, getToken } from "@/lib/auth";

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    setToken(token ?? null);
    setIsLoading(false);

    // Optional: Verify token with backend
    if (token) {
      verifyToken(token).catch(() => {
        logoutAPI();
        setToken(null);
      });
    }
  }, []);

  const verifyToken = async (token: string) => {
    const res = await fetch("http://localhost:3030/auth/verify", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Invalid token");

    const data = await res.json();
    return data.user; // Optional: Return user data if needed
  };

  const login = async (email: string, password: string) => {
    try {
      const { accessToken } = await loginAPI(email, password);
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
    router.push("/login");
  };

  return { token, isLoading, login, logout };
}
