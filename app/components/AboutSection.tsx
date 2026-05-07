"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const words = ["Not", "just", "a", "store—", "a", "movement", "redefining", "streetwear", "and", "connecting", "creators", "through", "style"];

export default function AboutSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section style={{ padding: "5rem 0" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem", display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? "2rem" : "3rem", alignItems: isMobile ? "stretch" : "center", minHeight: "500px" }}>

        {/* Left — image with organic blob clip */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          style={{
            position: "relative",
            width: isMobile ? "100%" : "42%",
            minHeight: isMobile ? "320px" : "420px",
            flexShrink: 0,
            overflow: "hidden",
            borderRadius: "60% 40% 55% 45% / 45% 55% 45% 55%",
          }}
        >
          {/* placeholder — replace with about image */}
          <div style={{ position: "absolute", inset: 0, background: "#d1d5db" }} />
        </motion.div>

        {/* Right — text */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1.5rem", justifyContent: "center" }}>
          <h2 className="font-title" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", lineHeight: 1.15, margin: 0 }}>
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
                viewport={{ once: true }}
                style={{ display: "inline-block", marginRight: "0.3em" }}
              >
                {word}
              </motion.span>
            ))}
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            viewport={{ once: true }}
            className="font-body"
            style={{ color: "#6b7280", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: "380px", margin: 0 }}
          >
            We&apos;re not just a store — we&apos;re a movement redefining streetwear. Connect with a community of creators, explore curated styles, and express yourself through fashion that speaks your language.
          </motion.p>

          <motion.a
            href="/shop"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            viewport={{ once: true }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "#000",
              color: "#fff",
              borderRadius: "9999px",
              padding: "1rem 2rem",
              fontFamily: "var(--font-sub)",
              fontSize: "1rem",
              fontWeight: 600,
              width: "fit-content",
              textDecoration: "none",
            }}
          >
            Explore the movement →
          </motion.a>
        </div>
      </div>
    </section>
  );
}
