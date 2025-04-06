// src/app/(auth)/forgot-password/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle2 } from "lucide-react";
export const dynamic = "force-dynamic";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch(
        // `${process.env.NEXT_PUBLIC_API}/auth/request-password-reset",
        `${process.env.NEXT_PUBLIC_API}/auth/request-password-reset`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      if (!res.ok) throw new Error("Request failed");
      setSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to send reset email"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-md">
          <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold">Check Your Email</h1>
          <p className="mt-2 text-gray-600">
            If an account exists for {email}, you&apos;ll receive a password
            reset link.
          </p>
          <button
            onClick={() => router.push("/login")}
            className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            Return to Login
          </button>
          <div className="mt-6 space-y-4">
            <button
              onClick={() => {
                setSuccess(false);
                setEmail(email); // Keep the email prefilled
              }}
              className="text-blue-500 hover:underline"
            >
              Didn&apos;t receive it? Send again
            </button>
            <div className="text-sm text-gray-500">
              (Check spam folder if you don&apos;t see it)
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md"
      >
        <h1 className="text-2xl font-bold text-center">Forgot Password</h1>
        {error && (
          <div className="p-3 bg-red-50 text-red-600 rounded-md">{error}</div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
            autoComplete="email"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin mx-auto" />
          ) : (
            "Send Reset Link"
          )}
        </button>
        <div className="text-center text-sm">
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="text-blue-500 hover:underline"
          >
            Remember your password? Sign in
          </button>
        </div>
      </form>
    </div>
  );
}
