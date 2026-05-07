"use client";

import Link from "next/link";
import { useState } from "react";
import { MotionValue, motion, useTransform, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart-context";

interface NavbarProps {
  scrollProgress: MotionValue<number>;
}

export default function Navbar({ scrollProgress }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count } = useCart();

  const textColor = useTransform(scrollProgress, [0.3, 0.5], ["#ffffff", "#000000"]);
  const bgColor = useTransform(scrollProgress, [0.3, 0.5], ["rgba(0,0,0,0)", "rgba(255,255,255,1)"]);

  return (
    <>
      <motion.nav style={{ backgroundColor: bgColor }} className="absolute top-0 left-0 right-0 z-50">
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "1rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none" }}>
            <motion.span style={{ color: textColor }} className="font-title text-2xl tracking-widest">
              Chrisera
            </motion.span>
          </Link>

          {/* Desktop links */}
          <motion.div style={{ color: textColor }} className="hidden md:flex items-center gap-8 text-sm font-medium font-sub">
            <Link href="/shop" style={{ color: "inherit", textDecoration: "none" }} className="opacity-80 hover:opacity-100 transition-opacity">Shop</Link>
            <a href="#about" style={{ color: "inherit", textDecoration: "none" }} className="opacity-80 hover:opacity-100 transition-opacity">About</a>
            <Link href="/cart" style={{ color: "inherit", textDecoration: "none", position: "relative" }} className="opacity-80 hover:opacity-100 transition-opacity">
              Cart
              {count > 0 && (
                <span style={{
                  position: "absolute", top: "-6px", right: "-12px",
                  background: "#fff", color: "#000",
                  fontSize: "0.55rem", fontWeight: 700,
                  width: "14px", height: "14px", borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>{count}</span>
              )}
            </Link>
          </motion.div>

          {/* Mobile right side — cart + hamburger */}
          <div className="flex md:hidden items-center gap-4">
            <Link href="/cart" style={{ position: "relative", textDecoration: "none" }}>
              <motion.svg style={{ color: textColor }} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2H3L1.5 9M6 2h15l-1.68 7.39A2 2 0 0117.36 11H6.64a2 2 0 01-1.96-1.61L3 3.5" />
                <path d="M6 2L4.5 9" /><circle cx="9" cy="20" r="1.5" fill="currentColor" stroke="none" />
                <circle cx="17" cy="20" r="1.5" fill="currentColor" stroke="none" />
                <path d="M4.5 9h15.5" />
              </motion.svg>
              {count > 0 && (
                <span style={{
                  position: "absolute", top: "-5px", right: "-7px",
                  background: "#fff", color: "#000",
                  fontSize: "0.55rem", fontWeight: 700,
                  width: "14px", height: "14px", borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>{count}</span>
              )}
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", display: "flex", flexDirection: "column", gap: "5px" }}
              aria-label="Toggle menu"
            >
              <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }} transition={{ duration: 0.2 }}
                style={{ display: "block", width: "22px", height: "2px", background: menuOpen ? "#000" : "currentColor", transformOrigin: "center" }}
                className={menuOpen ? "" : "text-inherit"}
              />
              <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} transition={{ duration: 0.15 }}
                style={{ display: "block", width: "22px", height: "2px", background: menuOpen ? "#000" : "currentColor" }}
              />
              <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }} transition={{ duration: 0.2 }}
                style={{ display: "block", width: "22px", height: "2px", background: menuOpen ? "#000" : "currentColor", transformOrigin: "center" }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{
              position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
              background: "#fff", zIndex: 49,
              display: "flex", flexDirection: "column",
            }}
          >
            <div style={{ padding: "1rem 2rem", borderBottom: "1px solid #f3f4f6" }}>
              <Link href="/" className="font-title" style={{ fontSize: "1.6rem", letterSpacing: "0.05em", color: "#000", textDecoration: "none" }}
                onClick={() => setMenuOpen(false)}>
                Chrisera
              </Link>
            </div>

            {/* Links */}
            <div style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "0" }}>
              {[
                { label: "Shop", href: "/shop" },
                { label: "Tops", href: "/shop?category=Tops" },
                { label: "Bottoms", href: "/shop?category=Bottoms" },
                { label: "Accessories", href: "/shop?category=Accessories" },
                { label: "Cart", href: "/cart" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-title"
                    style={{
                      display: "block", fontSize: "2.5rem", color: "#000",
                      textDecoration: "none", padding: "0.6rem 0",
                      borderBottom: "1px solid #f3f4f6",
                    }}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
