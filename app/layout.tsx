import type { Metadata } from "next";
import Script from "next/script";
import { QueueProvider } from "@/components/queue-provider";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Restaurant Waiting List",
  description: "Online reservation and waiting list dashboard"
};

const themeScript = `
(function() {
  try {
    var storedTheme = window.localStorage.getItem("restaurant-theme");
    var systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    var theme = storedTheme === "dark" || storedTheme === "light" ? storedTheme : systemTheme;
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
  } catch (_) {}
})();
`;

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Script id="theme-before-hydration" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <ThemeProvider>
          <QueueProvider>{children}</QueueProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
