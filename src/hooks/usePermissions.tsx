// src/hooks/usePermissions.tsx
"use client";

import { useAuth } from "./useAuth";
import { Role, Permission, hasPermission } from "@/lib/permissions";

export function usePermissions() {
  const { user } = useAuth();
  const userRole = (user?.role as Role) || Role.GUEST;

  // For simple role hierarchy checking
  const canAccess = (minRole: Role): boolean => {
    const roleHierarchy = {
      [Role.ADMIN]: 5,
      [Role.DEPARTMENT_MANAGER]: 4,
      [Role.PROJECT_MANAGER]: 3,
      [Role.HR_MANAGER]: 3,
      [Role.STAFF]: 2,
      [Role.GUEST]: 1,
    };

    const userRoleLevel = roleHierarchy[userRole] || 0;
    const requiredLevel = roleHierarchy[minRole];
    return userRoleLevel >= requiredLevel;
  };

  // For specific permission checking
  const can = (permission: Permission): boolean => {
    return hasPermission(userRole, permission);
  };

  // Data-level access control (for department restrictions)
  const canAccessDepartment = (departmentId: string): boolean => {
    // If admin, can access all departments
    if (userRole === Role.ADMIN) return true;

    // If department manager, check if it's their department
    if (
      userRole === Role.DEPARTMENT_MANAGER &&
      user?.managedDepartments?.includes(departmentId)
    ) {
      return true;
    }

    // If staff, check if they belong to this department
    if (user?.departments?.includes(departmentId)) {
      return true;
    }

    return false;
  };

  // For conditional rendering
  const withPermission = (permission: Permission) => {
    return (children: React.ReactNode): React.ReactNode => {
      return can(permission) ? children : null;
    };
  };

  // For more complex conditional rendering
  const withRoleAndDepartment = (minRole: Role, departmentId?: string) => {
    return (children: React.ReactNode): React.ReactNode => {
      if (!canAccess(minRole)) return null;
      if (departmentId && !canAccessDepartment(departmentId)) return null;
      return children;
    };
  };

  return {
    userRole,
    canAccess,
    can,
    canAccessDepartment,
    withPermission,
    withRoleAndDepartment,
  };
}
