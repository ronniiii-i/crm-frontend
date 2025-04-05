// src/components/password-strength.tsx
"use client";

import { useEffect, useState } from "react";
import zxcvbn from "zxcvbn";

export function PasswordStrength({ password }: { password: string }) {
  const [strength, setStrength] = useState(0);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (password) {
      const result = zxcvbn(password);
      setStrength(result.score);
      setFeedback(result.feedback.warning || "");
    } else {
      setStrength(0);
      setFeedback("");
    }
  }, [password]);

  const strengthText = ["Very Weak", "Weak", "Fair", "Good", "Strong"];

  const strengthColors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-green-500",
  ];

  return (
    <div className="mt-2">
      <div className="flex gap-1 h-1 mb-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`flex-1 rounded-full ${
              i <= strength ? strengthColors[strength] : "bg-gray-200"
            }`}
          />
        ))}
      </div>
      <div className="text-xs text-gray-600">
        {password ? (
          <>
            Strength: {strengthText[strength]}
            {feedback && ` • ${feedback}`}
          </>
        ) : (
          "Enter a password to check strength"
        )}
      </div>
    </div>
  );
}
