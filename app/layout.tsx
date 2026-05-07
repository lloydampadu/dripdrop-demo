import type { Metadata } from "next";
import { Bebas_Neue, Syne, DM_Sans } from "next/font/google";
import { CartProvider } from "@/lib/cart-context";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-title",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-sub",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Chrisera — Upgrade Your Style",
  description: "Not just a store — a movement redefining streetwear.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${bebasNeue.variable} ${syne.variable} ${dmSans.variable}`}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
