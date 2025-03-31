// // src/components/ProtectedRoute.tsx
// "use client";

// import { useEffect } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import { getToken } from "@/lib/auth";

// export default function ProtectedRoute({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const router = useRouter();
//   const pathname = usePathname();

//   useEffect(() => {
//     const token = getToken();
//     const publicRoutes = ["/", "/login", "/register"];

//     if (!token && !publicRoutes.includes(pathname)) {
//       router.replace("/login");
//     }

//     if (token && publicRoutes.includes(pathname)) {
//       router.replace("/dashboard");
//     }
//   }, [pathname, router]);

//   return <>{children}</>;
// }
