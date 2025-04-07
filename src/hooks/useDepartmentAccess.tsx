// // src/hooks/useDepartmentAccess.tsx
// "use client";

// import { useAuth } from "./useAuth";
// import { DEPARTMENTS, DEPARTMENT_MODULES, MODULES } from "@/lib/constants";

// export function useDepartmentAccess() {
//   const { user } = useAuth();

//   const hasDepartmentAccess = (department: keyof typeof DEPARTMENTS) => {
//     if (!user) return false;
//     if (user.role === "ADMIN") return true;
//     return user.department === department;
//   };

//   const hasModuleAccess = (module: keyof typeof MODULES) => {
//     if (!user) return false;
//     if (user.role === "ADMIN") return true;

//     // Find which department this module belongs to
//     const department = Object.entries(DEPARTMENT_MODULES).find(([_, modules]) =>
//       modules.includes(module)
//     )?.[0];

//     return department
//       ? hasDepartmentAccess(department as keyof typeof DEPARTMENTS)
//       : false;
//   };

//   return { hasDepartmentAccess, hasModuleAccess };
// }
