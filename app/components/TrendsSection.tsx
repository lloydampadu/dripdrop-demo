"use client";

import { motion } from "framer-motion";

const trends = [
  { label: "Couples fits",  bg: "#c9b8a8" },
  { label: "Hat drops",     bg: "#a8b8c9" },
  { label: "Summer looks",  bg: "#c9a8a8" },
  { label: "Suit season",   bg: "#b8c9a8" },
];

export default function TrendsSection() {

  return (
    <section style={{ padding: "5rem 0 6rem" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
      {/* Header */}
      <div style={{ marginBottom: "1.5rem" }}>
        <h2 className="font-title" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", lineHeight: 1.1 }}>
          Today&apos;s trends
        </h2>
      </div>

      {/* Cards row */}
      <div style={{ display: "flex", gap: "1rem", overflowX: "auto", scrollSnapType: "x mandatory", scrollbarWidth: "none" }}>
        {trends.map((trend, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            viewport={{ once: true }}
            style={{
              position: "relative", minWidth: "280px", height: "360px",
              borderRadius: "20px", overflow: "hidden",
              flexShrink: 0, scrollSnapAlign: "start", cursor: "pointer",
              background: trend.bg,
            }}
          >
            {/* placeholder bg — replace with image */}
            <div style={{ position: "absolute", inset: 0, background: trend.bg }} />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 50%)",
            }} />

            <div style={{
              position: "absolute", bottom: "1.2rem", left: "1.2rem", right: "1.2rem",
              display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "0.5rem",
            }}>
              <span className="font-sub" style={{ color: "#fff", fontWeight: 700, fontSize: "1rem", lineHeight: 1.2 }}>
                {trend.label}
              </span>
              <button style={{
                width: "2.2rem", height: "2.2rem", borderRadius: "50%",
                background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.4)",
                color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, cursor: "pointer", fontSize: "0.9rem", backdropFilter: "blur(4px)",
              }}>
                →
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      </div>
    </section>
  );
}
