// // middleware.ts
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get("token")?.value;
//   const { pathname } = request.nextUrl;

//   // Public routes
//   const publicRoutes = ["/", "/login", "/register"];

//   // If no token and trying to access protected route
//   if (!token && !publicRoutes.includes(pathname)) {
//     const loginUrl = new URL("/login", request.url);
//     // Only redirect if we're not already going to login
//     if (pathname !== "/login") {
//       return NextResponse.redirect(loginUrl);
//     }
//     return NextResponse.next();
//   }

//   // If has token and trying to access auth route
//   if (token && publicRoutes.includes(pathname)) {
//     const dashboardUrl = new URL("/dashboard", request.url);
//     // Only redirect if we're not already going to dashboard
//     if (pathname !== "/dashboard") {
//       return NextResponse.redirect(dashboardUrl);
//     }
//     return NextResponse.next();
//   }

//   return NextResponse.next();
// }
