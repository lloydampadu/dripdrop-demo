"use client";

import Link from "next/link";
import { MotionValue, motion, useTransform } from "framer-motion";

interface NavbarProps {
  scrollProgress: MotionValue<number>;
}

export default function Navbar({ scrollProgress }: NavbarProps) {
  const textColor = useTransform(scrollProgress, [0.3, 0.5], ["#ffffff", "#000000"]);
  const bgColor = useTransform(
    scrollProgress,
    [0.3, 0.5],
    ["rgba(0,0,0,0)", "rgba(255,255,255,1)"]
  );

  return (
    <motion.nav
      style={{ backgroundColor: bgColor }}
      className="absolute top-0 left-0 right-0 z-50"
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "1rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <motion.span style={{ color: textColor }} className="font-title text-2xl tracking-widest">
          Chrisera
        </motion.span>

        <motion.div style={{ color: textColor }} className="hidden md:flex items-center gap-8 text-sm font-medium font-sub">
          <Link href="/shop" style={{ color: "inherit", textDecoration: "none" }} className="opacity-80 hover:opacity-100 transition-opacity">Shop</Link>
          <a href="#about" className="opacity-80 hover:opacity-100 transition-opacity">About</a>
          <Link href="/cart" style={{ color: "inherit", textDecoration: "none" }} className="opacity-80 hover:opacity-100 transition-opacity">Cart</Link>
          <motion.button
            style={{ borderColor: textColor, color: textColor }}
            className="border rounded-full w-8 h-8 flex items-center justify-center text-xs"
          >
            0
          </motion.button>
        </motion.div>
      </div>
    </motion.nav>
  );
}
