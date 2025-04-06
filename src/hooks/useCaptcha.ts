// // src/hooks/useCaptcha.ts
// "use client";

// import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
// import { useState } from "react";

// export function useCaptcha() {
//   const { executeRecaptcha } = useGoogleReCaptcha();
//   const [isVerifying, setIsVerifying] = useState(false);

//   const getToken = async (action: string) => {
//     if (!executeRecaptcha) return null;

//     setIsVerifying(true);
//     try {
//       return await executeRecaptcha(action);
//     } finally {
//       setIsVerifying(false);
//     }
//   };

//   return { getToken, isVerifying };
// }
