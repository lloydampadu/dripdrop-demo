"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionStyle } from "framer-motion";

const cards = [
  { number: "01", label: "Street Essentials", sub: "The foundation of every fit",  bg: "#c4bfb8" },
  { number: "02", label: "On The Move",       sub: "Sneakers built for the street", bg: "#b8bec4" },
  { number: "03", label: "Denim Forever",     sub: "Fresh off the rack",            bg: "#b8c4bb" },
];

function Card({ card, style }: { card: typeof cards[0]; style: MotionStyle }) {
  return (
    <motion.div style={{ position: "absolute", inset: 0, borderRadius: "24px", overflow: "hidden", background: card.bg, ...style }}>
      {/* placeholder — swap with <Image> when photos arrive */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.05) 50%, transparent 100%)" }} />
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "2.5rem", color: "#fff" }}>
        <span className="font-sub" style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.2em", opacity: 0.8, textTransform: "uppercase" }}>
          {card.number}
        </span>
        <div>
          <p className="font-title" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1.05, margin: "0 0 0.5rem" }}>
            {card.label}
          </p>
          <p className="font-body" style={{ fontSize: "1rem", opacity: 0.75, margin: 0 }}>{card.sub}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function CascadeCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  const card1Y = useTransform(scrollYProgress, [0.3, 0.52], ["0%", "-115%"]);
  const card2X = useTransform(scrollYProgress, [0.25, 0.44], ["100%", "0%"]);
  const card2Y = useTransform(scrollYProgress, [0.62, 0.8], ["0%", "-115%"]);
  const card3X = useTransform(scrollYProgress, [0.6, 0.78], ["100%", "0%"]);

  return (
    <section style={{ padding: "5rem 0 0" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem 3rem" }}>
        <h2 className="font-title" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", margin: 0 }}>
          The Collection
        </h2>
      </div>

      <div ref={containerRef} style={{ height: "250vh", position: "relative" }}>
        <div style={{ position: "sticky", top: "4rem", height: "85vh", maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", borderRadius: "24px", background: "#111" }}>
            <Card card={cards[0]} style={{ y: card1Y }} />
            <Card card={cards[1]} style={{ x: card2X, y: card2Y }} />
            <Card card={cards[2]} style={{ x: card3X }} />
          </div>
        </div>
      </div>
    </section>
  );
}
