// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "./lib/auth";
import { jwtDecode } from "jwt-decode"; // You'll need to install this package

// Public routes that don't require authentication
const publicRoutes = ["/", "/login", "/register", "/verify-email", "/forgot-password", "/reset-password"];

// Role-based route access
const roleBasedRoutes = {
  adminOnly: ["/admin", "/settings"],
  managerPlus: ["/reports", "/analytics"],
  userPlus: ["/dashboard", "/projects", "/tasks"],
};

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

  // If we have a token, decode it to check the role
  if (token) {
    try {
      interface DecodedToken {
        role: string;
        [key: string]: unknown; // Add other properties if needed
      }
      const decoded = jwtDecode<DecodedToken>(token);
      console.log('====================================');
      console.log(decoded);
      console.log('====================================');
      const userRole = decoded.role;

      // Check role-based access
      if (
        roleBasedRoutes.adminOnly.some(
          (route) => pathname === route || pathname.startsWith(`${route}/`)
        ) &&
        userRole !== "ADMIN"
      ) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }

      if (
        roleBasedRoutes.managerPlus.some(
          (route) => pathname === route || pathname.startsWith(`${route}/`)
        ) &&
        userRole !== "ADMIN" &&
        userRole !== "MANAGER"
      ) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    } catch (error) {
      // Handle invalid token error, e.g., expired token
      console.error("Token verification failed:", error);
      // Token is invalid, clear it
      console.log("Invalid token, redirecting to login");
      // Optionally, you can clear the token here if you're using cookies or local storage
      // request.cookies.set("token", "", { expires: new Date(0) });
      // router.push("/login");
      // Or redirect to login page
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Redirect to dashboard if logged in and trying to access auth routes
    if (pathname === "/login" || pathname === "/register") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // Match all routes except:
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)"],
};
