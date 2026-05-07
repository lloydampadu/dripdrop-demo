"use client";

import { motion } from "framer-motion";

const reviews = [
  {
    name: "Jordan M.",
    handle: "@jordanfits",
    rating: 5,
    text: "The cargo pants are insane quality. Wore them out first day and got like 10 compliments. Chrisera is the real deal.",
    tag: "Vintage Cargo Pant",
  },
  {
    name: "Aaliyah T.",
    handle: "@aaliyah.drip",
    rating: 5,
    text: "Finally a brand that actually ships fast AND the fits look exactly like the photos. The bucket hat goes with everything.",
    tag: "Bucket Hat — SS25",
  },
  {
    name: "Marcus K.",
    handle: "@mkstreetwear",
    rating: 5,
    text: "Been following the drops for months. Every piece is consistent. The acid tee washes well and doesn't shrink. G.",
    tag: "Oversized Acid Tee",
  },
  {
    name: "Priya S.",
    handle: "@priyaonstyle",
    rating: 5,
    text: "The mesh set is so versatile. Wore it to a rooftop and a coffee run the same day. Quality is top tier for the price.",
    tag: "Summer Mesh Set",
  },
  {
    name: "Zion R.",
    handle: "@zionrlooks",
    rating: 5,
    text: "Legit my go-to store now. Limited drops make it feel exclusive. Community is fire too, found a whole new style inspo.",
    tag: "Shadow Pack SS25",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: "#000", fontSize: "0.75rem" }}>★</span>
      ))}
    </div>
  );
}

function ReviewCard({ review, index }: { review: typeof reviews[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true }}
      style={{
        background: "#f9fafb",
        borderRadius: "20px",
        padding: "1.75rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        minWidth: "300px",
        maxWidth: "340px",
        flexShrink: 0,
        scrollSnapAlign: "start",
      }}
    >
      <Stars count={review.rating} />
      <p className="font-body" style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "#111", margin: 0 }}>
        &ldquo;{review.text}&rdquo;
      </p>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
        <div>
          <p className="font-sub" style={{ fontWeight: 700, fontSize: "0.85rem", margin: 0 }}>{review.name}</p>
          <p className="font-body" style={{ fontSize: "0.75rem", color: "#6b7280", margin: 0 }}>{review.handle}</p>
        </div>
        <span className="font-sub" style={{
          fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.08em",
          textTransform: "uppercase", background: "#000", color: "#fff",
          padding: "0.3rem 0.65rem", borderRadius: "9999px",
        }}>
          {review.tag}
        </span>
      </div>
    </motion.div>
  );
}

export default function SocialProof() {
  const avg = 5.0;
  const total = 1240;

  return (
    <section style={{ padding: "5rem 0", overflow: "hidden" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1.5rem" }}>
          <div>
            <p className="font-sub" style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#6b7280", marginBottom: "0.4rem" }}>
              Real reviews, real people
            </p>
            <h2 className="font-title" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1, margin: 0 }}>
              The community speaks
            </h2>
          </div>
          {/* Aggregate rating */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span className="font-title" style={{ fontSize: "3rem", lineHeight: 1 }}>{avg.toFixed(1)}</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
              <Stars count={5} />
              <span className="font-body" style={{ fontSize: "0.75rem", color: "#6b7280" }}>{total.toLocaleString()} reviews</span>
            </div>
          </div>
        </div>

        {/* Scrollable row */}
        <div style={{
          display: "flex",
          gap: "1.25rem",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          paddingBottom: "1rem",
        }}>
          {reviews.map((r, i) => (
            <ReviewCard key={i} review={r} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
