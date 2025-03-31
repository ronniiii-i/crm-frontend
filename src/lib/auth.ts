import { NextRequest } from "next/server";

// src/lib/auth.ts
export async function register(email: string, password: string) {
  const res = await fetch("http://localhost:3030/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Registration failed");
  return res.json();
}

// src/lib/auth.ts
export async function login(email: string, password: string) {
  const res = await fetch('http://localhost:3030/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include' // Important for cookies
  })
  if (!res.ok) throw new Error('Invalid credentials')
  return res.json()
}

export function getToken(request?: NextRequest) {
  if (request) {
    // Server-side (middleware)
    return request.cookies.get('token')?.value
  } else if (typeof document !== 'undefined') {
    // Client-side
    return document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1]
  }
  return null
}
// src/lib/auth.ts
export function logout() {
  if (typeof window !== 'undefined') {
    // Clear token from cookies
    document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    // Clear token from localStorage if you're using it
    localStorage.removeItem('token')
  }
}

// export function getToken() {
//   if (typeof window !== "undefined") {
//     return localStorage.getItem("token");
//   }
//   return null;
// }
