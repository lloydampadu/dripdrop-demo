"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const cards = [
  { number: "01", label: "Street Essentials", sub: "The foundation of every fit", image: "/card-jacket.jpg", position: "center" },
  { number: "02", label: "On The Move", sub: "Sneakers built for the street", image: "/card-sneakers.jpg", position: "center" },
  { number: "03", label: "Denim Forever", sub: "Fresh off the rack", image: "/card-denim.jpg", position: "center top" },
];

function Card({ card, style }: { card: typeof cards[0]; style: React.CSSProperties }) {
  return (
    <motion.div style={{ position: "absolute", inset: 0, borderRadius: "24px", overflow: "hidden", ...style }}>
      <Image src={card.image} alt={card.label} fill style={{ objectFit: "cover", objectPosition: card.position }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)" }} />
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "2.5rem", color: "#fff" }}>
        <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.2em", opacity: 0.7, textTransform: "uppercase" }}>
          {card.number}
        </span>
        <div>
          <p style={{ fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.02em", margin: "0 0 0.5rem" }}>
            {card.label}
          </p>
          <p style={{ fontSize: "1rem", opacity: 0.7, margin: 0 }}>{card.sub}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function CascadeCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  // Card 1 — starts fully visible, slides UP on exit only
  const card1Y = useTransform(scrollYProgress, [0.3, 0.52], ["0%", "-115%"]);

  // Card 2 — slides in from right, then slides UP on exit
  const card2X = useTransform(scrollYProgress, [0.25, 0.44], ["100%", "0%"]);
  const card2Y = useTransform(scrollYProgress, [0.62, 0.8], ["0%", "-115%"]);

  // Card 3 — slides in from right, stays
  const card3X = useTransform(scrollYProgress, [0.6, 0.78], ["100%", "0%"]);

  return (
    <section style={{ padding: "5rem 0 0" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem 3rem" }}>
        <h2 style={{ fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 2.5rem)", letterSpacing: "-0.02em", margin: 0 }}>
          The collection
        </h2>
      </div>

      <div ref={containerRef} style={{ height: "250vh", position: "relative" }}>
        <div style={{ position: "sticky", top: "4rem", height: "85vh", maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
          {/* Black backdrop so no white bleed */}
          <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", borderRadius: "24px", background: "#111" }}>
            <Card card={cards[0]} style={{ y: card1Y } as React.CSSProperties} />
            <Card card={cards[1]} style={{ x: card2X, y: card2Y } as React.CSSProperties} />
            <Card card={cards[2]} style={{ x: card3X } as React.CSSProperties} />
          </div>
        </div>
      </div>
    </section>
  );
}
