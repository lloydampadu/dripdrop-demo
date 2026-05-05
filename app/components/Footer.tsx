"use client";

import { motion } from "framer-motion";

const links = {
  Shop: ["New Arrivals", "Streetwear", "Sneakers", "Accessories"],
  Company: ["About", "Careers", "Press", "Contact"],
  Community: ["Creators", "Blog", "Instagram", "Newsletter"],
};

export default function Footer() {
  return (
    <footer style={{ background: "#000", color: "#fff", padding: "6rem 0 3rem", marginTop: "6rem" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>

        {/* Top — brand + links */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4rem", justifyContent: "space-between", paddingBottom: "5rem", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>

          {/* Brand side */}
          <div style={{ maxWidth: "260px" }}>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              style={{ fontSize: "1.6rem", fontWeight: 900, letterSpacing: "-0.03em", margin: "0 0 1rem" }}
            >
              DripDrop
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              style={{ fontSize: "0.85rem", lineHeight: 1.7, color: "rgba(255,255,255,0.4)", margin: "0 0 2rem" }}
            >
              Not just a store — a movement redefining streetwear and connecting creators through style.
            </motion.p>
            <motion.a
              href="#"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#fff",
                borderRadius: "9999px",
                padding: "0.65rem 1.4rem",
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
                textDecoration: "none",
                transition: "border-color 0.2s",
              }}
            >
              Shop now →
            </motion.a>
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
                <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", margin: "0 0 1.2rem" }}>
                  {group}
                </p>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {items.map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.6)", textDecoration: "none", transition: "color 0.2s" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                        onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ paddingTop: "2rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.25)", margin: 0 }}>
            © 2025 DripDrop. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "2rem" }}>
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <a
                key={item}
                href="#"
                style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.25)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.25)")}
              >
                {item}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
