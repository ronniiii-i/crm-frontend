import { NextRequest } from "next/server";

export async function register(
  email: string,
  password: string,
  name: string
): Promise<{
  success: boolean;
  message: string;
}> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Registration failed");
  }

  return res.json();
}

export async function login(
  email: string,
  password: string
): Promise<{
  accessToken: string;
  user: {
    id: string;
    email: string;
    role: string;
    isVerified: boolean;
  };
}> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Login failed");
  }

  const data = await res.json();
  if (typeof window !== "undefined") {
    document.cookie = `token=${data.accessToken}; Path=/; Secure; SameSite=Strict`;
    localStorage.setItem("token", data.accessToken);
  }

  return data;
}


export function getToken(request?: NextRequest) {
  if (request) {
    // Server-side (middleware)
    return request.cookies.get("token")?.value;
  } else if (typeof document !== "undefined") {
    // Client-side
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
  }
  return null;
}
// src/lib/auth.ts
export function logout() {
  if (typeof window !== "undefined") {
    // Clear token from cookies
    document.cookie = "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    // Clear token from localStorage if you're using it
    localStorage.removeItem("token");
  }
}

// export function getToken() {
//   if (typeof window !== "undefined") {
//     return localStorage.getItem("token");
//   }
//   return null;
// }
