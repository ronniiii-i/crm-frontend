// src/app/admin/layout.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, isAdmin } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isAdmin()) {
    redirect("/dashboard");
    return null;
  }

  return (
    <div>
      {/* Admin sidebar & layout */}
      <div className="flex">
        <div className="w-64 bg-gray-800 text-white p-4 min-h-screen">
          <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
          {/* Admin navigation links */}
        </div>
        <div className="flex-1 p-6">{children}</div>
      </div>
    </div>
  );
}
