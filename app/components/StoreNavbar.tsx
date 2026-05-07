"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart-context";

export default function StoreNavbar() {
  const { count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "#fff", color: "#000", borderBottom: "1px solid #f3f4f6" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "1rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          <Link href="/" className="font-title" style={{ fontSize: "1.6rem", letterSpacing: "0.05em", color: "#C9A84C", textDecoration: "none" }}>
            Chrisera
          </Link>

          {/* Desktop links */}
          <div className="font-sub hidden md:flex" style={{ alignItems: "center", gap: "2rem", fontSize: "0.85rem", fontWeight: 600 }}>
            <Link href="/shop" style={{ color: "#000", textDecoration: "none", opacity: 0.7 }}>Shop</Link>
            <Link href="/shop?category=Tops" style={{ color: "#000", textDecoration: "none", opacity: 0.7 }}>Tops</Link>
            <Link href="/shop?category=Bottoms" style={{ color: "#000", textDecoration: "none", opacity: 0.7 }}>Bottoms</Link>
            <Link href="/shop?category=Accessories" style={{ color: "#000", textDecoration: "none", opacity: 0.7 }}>Accessories</Link>
          </div>

          {/* Desktop cart */}
          <Link href="/cart" style={{ position: "relative", color: "#000", textDecoration: "none" }} className="hidden md:block">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2H3L1.5 9M6 2h15l-1.68 7.39A2 2 0 0117.36 11H6.64a2 2 0 01-1.96-1.61L3 3.5" />
              <path d="M6 2L4.5 9" /><circle cx="9" cy="20" r="1.5" fill="currentColor" stroke="none" />
              <circle cx="17" cy="20" r="1.5" fill="currentColor" stroke="none" />
              <path d="M4.5 9h15.5" />
            </svg>
            {count > 0 && (
              <span style={{
                position: "absolute", top: "-6px", right: "-8px",
                background: "#C9A84C", color: "#1a1a1a",
                fontSize: "0.6rem", fontWeight: 700,
                width: "16px", height: "16px", borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>{count}</span>
            )}
          </Link>

          {/* Mobile — cart + hamburger */}
          <div className="flex md:hidden items-center gap-4">
            <Link href="/cart" style={{ position: "relative", color: "#000", textDecoration: "none" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2H3L1.5 9M6 2h15l-1.68 7.39A2 2 0 0117.36 11H6.64a2 2 0 01-1.96-1.61L3 3.5" />
                <path d="M6 2L4.5 9" /><circle cx="9" cy="20" r="1.5" fill="currentColor" stroke="none" />
                <circle cx="17" cy="20" r="1.5" fill="currentColor" stroke="none" />
                <path d="M4.5 9h15.5" />
              </svg>
              {count > 0 && (
                <span style={{
                  position: "absolute", top: "-5px", right: "-7px",
                  background: "#C9A84C", color: "#1a1a1a",
                  fontSize: "0.55rem", fontWeight: 700,
                  width: "14px", height: "14px", borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>{count}</span>
              )}
            </Link>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", display: "flex", flexDirection: "column", gap: "5px" }}
              aria-label="Toggle menu"
            >
              <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }} transition={{ duration: 0.2 }}
                style={{ display: "block", width: "22px", height: "2px", background: "#000", transformOrigin: "center" }} />
              <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} transition={{ duration: 0.15 }}
                style={{ display: "block", width: "22px", height: "2px", background: "#000" }} />
              <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }} transition={{ duration: 0.2 }}
                style={{ display: "block", width: "22px", height: "2px", background: "#000", transformOrigin: "center" }} />
            </button>
          </div>
        </div>
      </nav>

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
            <div style={{ padding: "2rem", marginTop: "4rem", display: "flex", flexDirection: "column", gap: "0" }}>
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
