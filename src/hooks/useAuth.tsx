// src/hooks/useAuth.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login as loginAPI, logout as logoutAPI, getToken } from "@/lib/auth";

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<{
    id: string;
    email: string;
    role: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    setToken(token ?? null);

    // Verify token and get user data
    if (token) {
      verifyToken(token)
        .then((userData) => {
          setUser(userData);
        })
        .catch(() => {
          logoutAPI();
          setToken(null);
          setUser(null);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
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
    return data.user;
  };

  const login = async (email: string, password: string) => {
    try {
      const { accessToken, user } = await loginAPI(email, password);
      setToken(accessToken);
      setUser(user);
      return { accessToken, user };
    } catch (error) {
      setToken(null);
      setUser(null);
      throw error;
    }
  };

  const logout = () => {
    logoutAPI();
    setToken(null);
    setUser(null);
    router.push("/login");
  };

  // New function to check if user has required role
  const hasRole = (requiredRoles: string[]) => {
    if (!user) return false;
    return requiredRoles.includes(user.role);
  };

  // Check if user is admin
  const isAdmin = () => user?.role === "ADMIN";

  // Check if user is manager
  const isManager = () => user?.role === "MANAGER" || user?.role === "ADMIN";

  return {
    token,
    user,
    isLoading,
    login,
    logout,
    hasRole,
    isAdmin,
    isManager,
  };
}
