import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@/context/ThemeContext";
import { useTheme } from "@/context/ThemeContext";
import { useEffect } from "react";

function ThemedApp({ Component, pageProps }: AppProps) {
  const { isDarkMode, isThemeLoaded } = useTheme();
  
  // Apply theme class to body only after theme is loaded from localStorage
  useEffect(() => {
    if (isThemeLoaded) {
      document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
    }
  }, [isDarkMode, isThemeLoaded]);
  
  return <Component {...pageProps} />;
}

export default function App(props: AppProps) {
  return (
    <ThemeProvider>
      <ThemedApp {...props} />
    </ThemeProvider>
  );
}
