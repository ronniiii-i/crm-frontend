// src/lib/permissions.ts
export enum Role {
  ADMIN = "ADMIN",
  DEPARTMENT_MANAGER = "DEPARTMENT_MANAGER",
  PROJECT_MANAGER = "PROJECT_MANAGER",
  HR_MANAGER = "HR_MANAGER",
  STAFF = "STAFF",
  GUEST = "GUEST",
}

export enum Permission {
  // Contact permissions
  VIEW_CONTACTS = "VIEW_CONTACTS",
  EDIT_CONTACTS = "EDIT_CONTACTS",
  DELETE_CONTACTS = "DELETE_CONTACTS",

  // Project permissions
  VIEW_ALL_PROJECTS = "VIEW_ALL_PROJECTS",
  VIEW_DEPARTMENT_PROJECTS = "VIEW_DEPARTMENT_PROJECTS",
  VIEW_ASSIGNED_PROJECTS = "VIEW_ASSIGNED_PROJECTS",
  EDIT_PROJECTS = "EDIT_PROJECTS",
  MANAGE_PROJECT_MEMBERS = "MANAGE_PROJECT_MEMBERS",

  // And so on for other modules...

  // Admin permissions
  MANAGE_USERS = "MANAGE_USERS",
  MANAGE_ROLES = "MANAGE_ROLES",
  VIEW_SYSTEM_LOGS = "VIEW_SYSTEM_LOGS",
}

// Define which roles have which permissions
const rolePermissions: Record<Role, Permission[]> = {
  [Role.ADMIN]: [
    // Admin has all permissions
    ...Object.values(Permission),
  ],
  [Role.DEPARTMENT_MANAGER]: [
    Permission.VIEW_CONTACTS,
    Permission.EDIT_CONTACTS,
    Permission.VIEW_DEPARTMENT_PROJECTS,
    Permission.VIEW_ASSIGNED_PROJECTS,
    Permission.EDIT_PROJECTS,
    Permission.MANAGE_PROJECT_MEMBERS,
    // More department manager permissions...
  ],
  [Role.PROJECT_MANAGER]: [
    Permission.VIEW_CONTACTS,
    Permission.VIEW_ASSIGNED_PROJECTS,
    Permission.EDIT_PROJECTS,
    Permission.MANAGE_PROJECT_MEMBERS,
    // More project manager permissions...
  ],
  [Role.HR_MANAGER]: [
    // HR-specific permissions
  ],
  [Role.STAFF]: [
    Permission.VIEW_CONTACTS,
    Permission.VIEW_ASSIGNED_PROJECTS,
    // Limited staff permissions
  ],
  [Role.GUEST]: [
    // Very limited guest permissions
  ],
};

// Export helper functions
export function getRolePermissions(role: Role): Permission[] {
  return rolePermissions[role] || [];
}

export function hasPermission(userRole: Role, permission: Permission): boolean {
  return getRolePermissions(userRole).includes(permission);
}
