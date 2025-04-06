// src/app/(auth)/verify-email/page.tsx
"use client";

import { Suspense } from "react";
import { VerifyEmailForm } from "./verify-email-form";
import { Loader2 } from "lucide-react";

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      }
    >
      <VerifyEmailForm />
    </Suspense>
  );
}
