"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

const products = [
  { id: "oversized-acid-tee",  name: "Oversized Acid Tee",   price: 65,  tag: "Best Seller", bg: "#d4cfc9", colors: ["#1a1a1a", "#e5e7eb", "#854d0e"] },
  { id: "vintage-cargo-pant",  name: "Vintage Cargo Pant",   price: 120, tag: "New Drop",    bg: "#c9cdd4", colors: ["#1a1a1a", "#4b5563"] },
  { id: "bucket-hat-ss25",     name: "Bucket Hat — SS25",    price: 45,  tag: "Limited",     bg: "#d4d0c9", colors: ["#1a1a1a", "#fef08a", "#bfdbfe"] },
  { id: "summer-mesh-set",     name: "Summer Mesh Set",      price: 95,  tag: "New Drop",    bg: "#cdd4cf", colors: ["#fff", "#1a1a1a"] },
];

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
    >
      <Link href={`/shop/${product.id}`} style={{ textDecoration: "none" }}>
        <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden", aspectRatio: "3/4", background: product.bg }}>
          {/* gray placeholder — swap with <Image> when product photos arrive */}

          {/* Tag */}
          <span className="font-sub" style={{
            position: "absolute", top: "0.75rem", left: "0.75rem",
            background: "#C9A84C", color: "#1a1a1a",
            fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em",
            textTransform: "uppercase", padding: "0.3rem 0.7rem", borderRadius: "9999px",
          }}>
            {product.tag}
          </span>

          {/* Quick add */}
          <motion.button
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
            transition={{ duration: 0.2 }}
            onClick={handleAdd}
            className="font-sub"
            style={{
              position: "absolute", bottom: "0.75rem", left: "0.75rem", right: "0.75rem",
              background: added ? "#16a34a" : "#C9A84C", color: added ? "#fff" : "#1a1a1a",
              border: "none", borderRadius: "9999px",
              padding: "0.75rem", fontSize: "0.8rem", fontWeight: 600,
              cursor: "pointer", transition: "background 0.3s",
            }}
          >
            {added ? "Added ✓" : "Quick Add"}
          </motion.button>
        </div>
      </Link>

      {/* Info */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span className="font-sub" style={{ fontWeight: 600, fontSize: "0.9rem" }}>{product.name}</span>
          <span className="font-body" style={{ fontWeight: 700, fontSize: "0.9rem" }}>GH₵{(product.price * 15).toLocaleString()}</span>
        </div>
        <div style={{ display: "flex", gap: "0.4rem" }}>
          {product.colors.map((c) => (
            <span key={c} style={{
              width: "14px", height: "14px", borderRadius: "50%",
              background: c, border: "1.5px solid #d1d5db", flexShrink: 0,
            }} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedProducts() {
  return (
    <section style={{ padding: "5rem 0" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p className="font-sub" style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#6b7280", marginBottom: "0.4rem" }}>
              Hand-picked for you
            </p>
            <h2 className="font-title" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1, margin: 0 }}>
              Featured Drops
            </h2>
          </div>
          <Link href="/shop" className="font-sub" style={{
            fontSize: "0.85rem", fontWeight: 600, color: "#C9A84C",
            textDecoration: "none", borderBottom: "1.5px solid #C9A84C", paddingBottom: "2px",
          }}>
            View all →
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1.5rem" }}>
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
