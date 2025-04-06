// // src/providers/captcha-provider.tsx
// "use client";

// import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
// import { useEffect, useState } from "react";

// export function CaptchaProvider({ children }: { children: React.ReactNode }) {
//   const [loaded, setLoaded] = useState(false);

//   useEffect(() => {
//     setLoaded(true);
//   }, []);

//   if (!loaded) return <>{children}</>;

//   return (
//     <GoogleReCaptchaProvider
//       reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "default-recaptcha-key"}
//       scriptProps={{
//         async: true,
//         defer: true,
//         appendTo: "body",
//       }}
//     >
//       {children}
//     </GoogleReCaptchaProvider>
//   );
// }
