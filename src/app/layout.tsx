import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import React, { Suspense } from "react";
import "./globals.css";
import { CartProvider } from "../context/CartContext";
import { WishlistProvider } from "../context/WishlistContext";
import { Header } from "../components/layout/Header";
import { ConditionalFooter } from "../components/layout/ConditionalFooter";
import { SmoothScroll } from "../components/layout/SmoothScroll";
import { ThemeProvider } from "../components/theme-provider";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Oxivos Fashion — Premium Fashion",
  description:
    "Inspired by nature. Designed for movement. Premium technical apparel at the intersection of high fashion and the natural world.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakartaSans.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-on-surface">
        <SmoothScroll>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster position="bottom-right" theme="system" closeButton richColors duration={4000} />
            <CartProvider>
              <WishlistProvider>
                <Suspense fallback={<div className="h-16 bg-surface" />}>
                  <Header />
                </Suspense>
                <div className="flex-grow flex flex-col">{children}</div>
                <ConditionalFooter />
              </WishlistProvider>
            </CartProvider>
          </ThemeProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
