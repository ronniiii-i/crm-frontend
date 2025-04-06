// src/app/(auth)/verify-email/verify-email-form.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

export function VerifyEmailForm() {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      router.push("/");
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API}/auth/verify-email`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
          }
        );

        if (!res.ok) throw new Error();
        setStatus("success");
      } catch (error) {
        setStatus("error");
        console.error("Verification error:", error);
      }
    };

    verifyEmail();
  }, [token, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="ml-2">Verifying your email...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      {status === "success" ? (
        <div className="text-center">
          <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto" />
          <h1 className="text-2xl font-bold mt-4">Email Verified!</h1>
          <p className="mt-2">You can now log in to your account.</p>
          <button
            onClick={() => router.push("/login")}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Go to Login
          </button>
        </div>
      ) : (
        <div className="text-center">
          <XCircle className="h-12 w-12 text-red-500 mx-auto" />
          <h1 className="text-2xl font-bold mt-4">Verification Failed</h1>
          <p className="mt-2">The link is invalid or has expired.</p>
          <button
            onClick={() => router.push("/")}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Return Home
          </button>
        </div>
      )}
    </div>
  );
}
