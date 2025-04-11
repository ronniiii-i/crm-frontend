// src/app/dashboard/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import { useRoleAccess } from "@/hooks/useRoleAccess";
// import { Department } from "@/lib/modules";
import { Card } from "@/components/ui/card";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  Briefcase,
  BarChart,
  Wallet,
  Truck,
  Package,
  Settings,
  Home,
  Shield,
} from "lucide-react";
import Image from "next/image";

const iconComponents = {
  users: Users,
  "folder-kanban": FolderKanban,
  briefcase: Briefcase,
  "bar-chart": BarChart,
  wallet: Wallet,
  truck: Truck,
  package: Package,
  settings: Settings,
  home: Home,
  shield: Shield,
};

export default function DashboardPage() {
  const { logout, isLoading, token, user } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");
  const { getAccessibleModules } = useRoleAccess();
  const modules = getAccessibleModules();

  const handleLogout = async () => {
    setLogoutError("");
    setIsLoggingOut(true);
    try {
      await logout();
    } catch (error) {
      setLogoutError("Logout failed. Please try again.");
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (isLoading || !token) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <nav className="bg-white shadow-sm">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/dashboard" className="text-xl font-bold">
                  CRM System
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  href="/dashboard"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Dashboard
                </Link>

                {/* Everyone sees tasks */}
                <Link
                  href="/tasks"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  My Tasks
                </Link>

                {/* Everyone sees projects */}
                <Link
                  href="/projects"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Projects
                </Link>

                {/* Manager+ see reports */}
                {(user?.role === "ADMIN" || user?.role === "MANAGER") && (
                  <Link
                    href="/reports"
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Reports
                  </Link>
                )}

                {/* Only admin sees settings */}
                {user?.role === "ADMIN" && (
                  <Link
                    href="/admin/settings"
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Settings
                  </Link>
                )}
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <span className="mr-4 text-sm text-gray-500">
                {user?.email} ({user?.role})
              </span>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                {isLoggingOut ? (
                  <Loader2 className="h-4 w-4 animate-spin inline" />
                ) : (
                  "Sign out"
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {logoutError && (
        <div className="text-red-500 text-sm mt-2">{logoutError}</div>
      )}

      {/* Rest of your dashboard content */}
      <div className="container mx-auto px-8 py-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back!{" "}
            {/* {userRole === "ADMIN"
              ? "Administrator"
              : userRole === "MANAGER"
              ? "Manager"
              : "User"} */}
            {user?.name}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {modules.map((module) => {
            const IconComponent =
              iconComponents[module.icon as keyof typeof iconComponents] ||
              LayoutDashboard;
            return (
              <Link key={module.id} href={module.path} passHref>
                <Card className="p-6 hover:bg-accent transition-colors cursor-pointer h-full">
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="font-medium">{module.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      <span className="text-sm text-muted-foreground">
                        {module.department || "All Departments"}
                      </span>
                    </p>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Recent Activity Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
          <Card className="p-6">
            <div className="space-y-4">
              {/* Placeholder for activity items */}
              <div className="flex items-center gap-4">
                <div className="rounded-full overflow-hidden">
                  <Image
                    src="https://picsum.photos/50/50"
                    width={40}
                    height={40}
                    alt="User"
                    className="rounded-full"
                  />
                </div>
                <div>
                  <p className="font-medium">New project created</p>
                  <p className="text-sm text-muted-foreground">2 hours ago</p>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
