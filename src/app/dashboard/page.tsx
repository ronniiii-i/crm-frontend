// src/app/dashboard/page.tsx
"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const { logout, isLoading, token } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");

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
      <div className="flex items-center justify-between p-4 bg-white shadow-sm">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="bg-red-400 hover:bg-red-600 text-white p-2 rounded-md transition-colors"
        >
          {isLoggingOut ? (
            <Loader2 className="h-4 w-4 animate-spin inline" />
          ) : (
            "Logout"
          )}
        </button>
      </div>

      {logoutError && (
        <div className="text-red-500 text-sm mt-2">{logoutError}</div>
      )}

      {/* Rest of your dashboard content */}
      <div className="flex-1 p-4">
        <h2 className="text-xl font-semibold mb-4">
          Welcome to your Dashboard
        </h2>
        {/* Add your dashboard content here */}
      </div>
    </div>
  );
}
