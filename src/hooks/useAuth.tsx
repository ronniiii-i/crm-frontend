import { useState } from "react";

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    const res = await fetch("http://localhost:3030/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("Invalid credentials");

    const data = await res.json();
    setToken(data.access_token);
    localStorage.setItem("token", data.access_token);
    return data.access_token;
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return { token, login, logout };
}
