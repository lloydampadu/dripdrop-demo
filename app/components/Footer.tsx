"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const links: Record<string, { label: string; href: string }[]> = {
  Shop: [
    { label: "New Arrivals", href: "/shop?category=All" },
    { label: "Tops", href: "/shop?category=Tops" },
    { label: "Bottoms", href: "/shop?category=Bottoms" },
    { label: "Accessories", href: "/shop?category=Accessories" },
  ],
  Company: [
    { label: "About", href: "/#about" },
    { label: "Careers", href: "/" },
    { label: "Press", href: "/" },
    { label: "Contact", href: "/" },
  ],
  Community: [
    { label: "Creators", href: "/" },
    { label: "Blog", href: "/" },
    { label: "Instagram", href: "/" },
    { label: "Newsletter", href: "/" },
  ],
};

export default function Footer() {
  return (
    <footer style={{ background: "#000", color: "#fff", padding: "6rem 0 3rem", marginTop: "6rem" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>

        {/* Top — brand + links */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4rem", justifyContent: "space-between", paddingBottom: "5rem", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>

          {/* Brand side */}
          <div style={{ maxWidth: "260px" }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link href="/" className="font-title" style={{ fontSize: "2rem", letterSpacing: "0.05em", color: "#C9A84C", textDecoration: "none", display: "block", marginBottom: "1rem" }}>
                Chrisera
              </Link>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="font-body"
              style={{ fontSize: "0.85rem", lineHeight: 1.7, color: "rgba(255,255,255,0.4)", margin: "0 0 2rem" }}
            >
              Not just a store — a movement redefining streetwear and connecting creators through style.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Link
                href="/shop"
                className="font-sub"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  border: "1px solid #C9A84C", color: "#C9A84C",
                  borderRadius: "9999px", padding: "0.65rem 1.4rem",
                  fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.05em",
                  textDecoration: "none",
                }}
              >
                Shop now →
              </Link>
            </motion.div>
          </div>

          {/* Link columns */}
          <div style={{ display: "flex", gap: "5rem", flexWrap: "wrap" }}>
            {Object.entries(links).map(([group, items], gi) => (
              <motion.div
                key={group}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: gi * 0.08 }}
                viewport={{ once: true }}
              >
                <p className="font-sub" style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", margin: "0 0 1.2rem" }}>
                  {group}
                </p>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="font-body"
                        style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.6)", textDecoration: "none" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                        onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ paddingTop: "2rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <p className="font-body" style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.25)", margin: 0 }}>
            © 2025 Chrisera. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "2rem" }}>
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <Link
                key={item}
                href="/"
                className="font-body"
                style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.25)", textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.25)")}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
