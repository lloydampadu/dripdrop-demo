"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function StoreNavbar() {
  const { count } = useCart();

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 50,
      background: "#fff", color: "#000", borderBottom: "1px solid #f3f4f6",
    }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "1rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" className="font-title" style={{ fontSize: "1.6rem", letterSpacing: "0.05em", color: "#000", textDecoration: "none" }}>
          Chrisera
        </Link>

        <div className="font-sub" style={{ display: "flex", alignItems: "center", gap: "2rem", fontSize: "0.85rem", fontWeight: 600 }}>
          <Link href="/shop" style={{ color: "#000", textDecoration: "none", opacity: 0.7 }}>Shop</Link>
          <Link href="/shop?category=Tops" style={{ color: "#000", textDecoration: "none", opacity: 0.7 }}>Tops</Link>
          <Link href="/shop?category=Bottoms" style={{ color: "#000", textDecoration: "none", opacity: 0.7 }}>Bottoms</Link>
          <Link href="/shop?category=Accessories" style={{ color: "#000", textDecoration: "none", opacity: 0.7 }}>Accessories</Link>
        </div>

        <Link href="/cart" style={{ position: "relative", color: "#000", textDecoration: "none" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2H3L1.5 9M6 2h15l-1.68 7.39A2 2 0 0117.36 11H6.64a2 2 0 01-1.96-1.61L3 3.5" />
            <path d="M6 2L4.5 9" />
            <circle cx="9" cy="20" r="1.5" fill="currentColor" stroke="none" />
            <circle cx="17" cy="20" r="1.5" fill="currentColor" stroke="none" />
            <path d="M4.5 9h15.5" />
          </svg>
          {count > 0 && (
            <span style={{
              position: "absolute", top: "-6px", right: "-8px",
              background: "#000", color: "#fff",
              fontSize: "0.6rem", fontWeight: 700,
              width: "16px", height: "16px", borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {count}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
