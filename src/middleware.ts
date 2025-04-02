// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "./lib/auth";

// Public routes that don't require authentication
const publicRoutes = ["/", "/login", "/register",];

export default async function middleware(request: NextRequest) {
  const token = getToken(request);
  const { pathname } = request.nextUrl;

  // Check if the current route is public
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // Redirect to login if trying to access non-public route without token
  if (!isPublicRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect to dashboard if logged in and trying to access auth routes
  if (token && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Match all routes except:
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)"],
};
