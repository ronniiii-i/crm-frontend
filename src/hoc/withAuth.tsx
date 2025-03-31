// src/hocs/withAuth.tsx
"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

export default function withAuth(Component: React.ComponentType) {
  return function ProtectedComponent(props: React.ComponentProps<typeof Component>) {
    const { token, isLoading } = useAuth();
    const router = useRouter();

    if (isLoading) {
      return (
        <div className="flex h-screen items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin" />
        </div>
      );
    }

    if (!token) {
      router.replace("/login");
      return null;
    }

    return <Component {...props} />;
  };
}

// Usage in pages:
// export default withAuth(DashboardPage)
