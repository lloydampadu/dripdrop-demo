"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const DROP_DATE = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // 3 days from now

function useCountdown(target: Date) {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now());
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      mins: Math.floor((diff % 3600000) / 60000),
      secs: Math.floor((diff % 60000) / 1000),
    };
  };
  const [t, setT] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  useEffect(() => {
    setT(calc());
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

function Digit({ value, label }: { value: number; label: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem" }}>
      <span className="font-title" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", lineHeight: 1, color: "#fff" }}>
        {String(value).padStart(2, "0")}
      </span>
      <span className="font-sub" style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
        {label}
      </span>
    </div>
  );
}

export default function DropSection() {
  const { days, hours, mins, secs } = useCountdown(DROP_DATE);

  return (
    <section style={{ background: "#0a0a0a", padding: "6rem 0", overflow: "hidden" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem", display: "flex", flexDirection: "column", gap: "4rem" }}>

        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
        >
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#C9A84C", display: "inline-block", boxShadow: "0 0 8px #C9A84C" }} />
          <span className="font-sub" style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>
            Upcoming Drop
          </span>
        </motion.div>

        {/* Main content */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4rem", alignItems: "center", justifyContent: "space-between" }}>

          {/* Left text */}
          <div style={{ flex: "1 1 320px", display: "flex", flexDirection: "column", gap: "2rem" }}>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="font-title"
              style={{ fontSize: "clamp(3rem, 8vw, 6rem)", lineHeight: 0.95, color: "#fff", margin: 0 }}
            >
              SHADOW<br />PACK<br />SS25
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="font-body"
              style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: "340px", margin: 0 }}
            >
              A 6-piece limited capsule built for the streets. No restocks. Once it&apos;s gone, it&apos;s gone.
            </motion.p>

            {/* Countdown */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              viewport={{ once: true }}
              style={{ display: "flex", gap: "2rem", alignItems: "center" }}
            >
              <Digit value={days} label="Days" />
              <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "2rem", alignSelf: "flex-start", marginTop: "0.3rem" }}>:</span>
              <Digit value={hours} label="Hours" />
              <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "2rem", alignSelf: "flex-start", marginTop: "0.3rem" }}>:</span>
              <Digit value={mins} label="Mins" />
              <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "2rem", alignSelf: "flex-start", marginTop: "0.3rem" }}>:</span>
              <Digit value={secs} label="Secs" />
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
            >
              <a href="/shop" className="font-sub" style={{
                background: "#C9A84C", color: "#1a1a1a",
                padding: "0.9rem 2rem", borderRadius: "9999px",
                fontSize: "0.85rem", fontWeight: 700, textDecoration: "none",
                letterSpacing: "0.05em",
              }}>
                Notify Me
              </a>
              <a href="/shop" className="font-sub" style={{
                border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.6)",
                padding: "0.9rem 2rem", borderRadius: "9999px",
                fontSize: "0.85rem", fontWeight: 600, textDecoration: "none",
              }}>
                Preview the drop →
              </a>
            </motion.div>
          </div>

          {/* Right — stacked images */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ flex: "1 1 300px", position: "relative", minHeight: "420px", maxWidth: "480px" }}
          >
            {/* Back card — placeholder */}
            <div style={{
              position: "absolute", top: "2rem", right: "0",
              width: "72%", aspectRatio: "3/4",
              borderRadius: "16px", overflow: "hidden",
              transform: "rotate(4deg)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
              background: "#3a3a3a",
            }} />
            {/* Front card — placeholder */}
            <div style={{
              position: "absolute", top: "0", left: "0",
              width: "72%", aspectRatio: "3/4",
              borderRadius: "16px", overflow: "hidden",
              transform: "rotate(-3deg)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
              background: "#2a2a2a",
            }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)" }} />
              <span className="font-title" style={{
                position: "absolute", bottom: "1rem", left: "1rem",
                color: "#fff", fontSize: "1.5rem", letterSpacing: "0.05em",
              }}>
                LIMITED
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
