// src/components/role-protected-route.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

type RoleProtectedRouteProps = {
  children: React.ReactNode;
  allowedRoles: string[];
  fallbackPath?: string;
};

export default function RoleProtectedRoute({
  children,
  allowedRoles,
  fallbackPath = "/dashboard",
}: RoleProtectedRouteProps) {
  const { user, isLoading, hasRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !hasRole(allowedRoles)) {
      router.push(fallbackPath);
    }
  }, [isLoading, user, router, allowedRoles, fallbackPath, hasRole]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // Only render children if user has the required role
  return hasRole(allowedRoles) ? <>{children}</> : null;
}
