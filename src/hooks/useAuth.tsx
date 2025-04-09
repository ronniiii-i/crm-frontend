"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  login as loginAPI,
  logout as logoutAPI,
  getToken,
  register as registerAPI,
} from "@/lib/auth";

interface User {
  id: string;
  email: string;
  role: string;
  isVerified: boolean;
  name?: string;
  department?: string;
}

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initializeAuth = async () => {
      const token = getToken();
      setToken(token ?? null);

      if (token) {
        try {
          const userData = await verifyToken(token);
          setUser(userData);
        } catch {
          logoutAPI();
          setToken(null);
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const verifyToken = async (token: string): Promise<User> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/verify`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Invalid token");
    return await res.json().then((data) => data.user);
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const response = await registerAPI(email, password, name);
      if (!response.success) throw new Error(response.message);

      return {
        success: true,
        message:
          "Registration successful! Please check your email for verification.",
      };
    } catch (error) {
      throw error instanceof Error ? error : new Error("Registration failed");
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { accessToken, user } = await loginAPI(email, password);
      console.log("Login API response - isVerified:", user?.isVerified);

      if (!user.isVerified) {
        // console.error("User is not verified:", user);
        throw new Error("Please verify your email before logging in");
      }

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

  const hasRole = (requiredRoles: string[]) => {
    return user ? requiredRoles.includes(user.role) : false;
  };

  return {
    token,
    user,
    isLoading,
    register,
    login,
    logout,
    hasRole,
    isAdmin: () => hasRole(["ADMIN"]),
    isManager: () => hasRole(["MANAGER", "ADMIN"]),
  };
}
