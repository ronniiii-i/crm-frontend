// src/app/profile/page.tsx
"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

export default function ProfilePage() {
  const { user, refreshUserData } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await fetch("/api/profile", {
        method: "PUT",
        body: JSON.stringify({ name }),
      });
      await refreshUserData(); // Refresh user data after update
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          disabled={isUpdating}
          className="bg-blue-500 text-white p-2 rounded disabled:opacity-50"
        >
          {isUpdating ? <Loader2 className="animate-spin" /> : "Update Profile"}
        </button>
      </form>
    </div>
  );
}
