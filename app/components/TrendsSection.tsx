"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const trends = [
  {
    label: "Couples fits",
    image: "/trend-couples.jpg",
  },
  {
    label: "Hat drops",
    image: "/trend-hat.jpg",
  },
  {
    label: "Summer looks",
    image: "/trend-summer.jpg",
  },
  {
    label: "Suit season",
    image: "/trend-suit.jpg",
  },
];

export default function TrendsSection() {
  const [active, setActive] = useState(0);

  return (
    <section style={{ padding: "5rem 0 6rem" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
          Today&apos;s trends
        </h2>
        {/* Toggle pill */}
        <button
          onClick={() => setActive(active === 0 ? 1 : 0)}
          style={{
            width: "3.5rem",
            height: "2rem",
            borderRadius: "9999px",
            background: active === 1 ? "#000" : "#e5e7eb",
            border: "none",
            cursor: "pointer",
            position: "relative",
            transition: "background 0.3s",
            flexShrink: 0,
          }}
        >
          <span style={{
            position: "absolute",
            top: "4px",
            left: active === 1 ? "calc(100% - 28px)" : "4px",
            width: "24px",
            height: "24px",
            borderRadius: "50%",
            background: "#fff",
            transition: "left 0.3s",
            boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
          }} />
        </button>
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
              position: "relative",
              minWidth: "280px",
              height: "360px",
              borderRadius: "20px",
              overflow: "hidden",
              flexShrink: 0,
              scrollSnapAlign: "start",
              cursor: "pointer",
            }}
          >
            <Image
              src={trend.image}
              alt={trend.label}
              fill
              style={{ objectFit: "cover", objectPosition: "center top" }}
            />
            {/* dark gradient at bottom */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 50%)",
            }} />

            {/* Label + arrow */}
            <div style={{
              position: "absolute",
              bottom: "1.2rem",
              left: "1.2rem",
              right: "1.2rem",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "0.5rem",
            }}>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: "1rem", lineHeight: 1.2 }}>
                {trend.label}
              </span>
              <button style={{
                width: "2.2rem",
                height: "2.2rem",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
                border: "1px solid rgba(255,255,255,0.4)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                cursor: "pointer",
                fontSize: "0.9rem",
                backdropFilter: "blur(4px)",
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
