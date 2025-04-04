// src/hooks/useRoleAccess.tsx
"use client";

import { useAuth } from "./useAuth";

export enum AccessLevel {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  USER = "USER",
  GUEST = "GUEST",
}

// Define the hierarchy of roles
const roleHierarchy = {
  [AccessLevel.ADMIN]: 3,
  [AccessLevel.MANAGER]: 2,
  [AccessLevel.USER]: 1,
  [AccessLevel.GUEST]: 0,
};

export function useRoleAccess() {
  const { user } = useAuth();

  // No user means no access
  if (!user || !user.role) {
    return {
      userRole: null,
      canAccess: () => false,
      requiresRole: (requiredRole: AccessLevel) => () => false,
    };
  }

  // Helper to check if user's role level is high enough
  const canAccess = (minRole: AccessLevel): boolean => {
    const userRoleLevel = roleHierarchy[user.role as AccessLevel] || 0;
    const requiredLevel = roleHierarchy[minRole];
    return userRoleLevel >= requiredLevel;
  };

  // Higher-order function for conditional rendering
  const requiresRole = (minRole: AccessLevel) => {
    return (children: React.ReactNode): React.ReactNode => {
      return canAccess(minRole) ? children : null;
    };
  };

  return {
    userRole: user.role as AccessLevel,
    canAccess,
    requiresRole,
  };
}
