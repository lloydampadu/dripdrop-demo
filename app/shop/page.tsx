"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { products } from "@/lib/products";
import StoreNavbar from "@/app/components/StoreNavbar";
import Footer from "@/app/components/Footer";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const categories = ["All", "Tops", "Bottoms", "Sets", "Accessories"];
const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low", "New Arrivals"];

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sort, setSort] = useState("Featured");

  const filtered = useMemo(() => {
    let list = activeCategory === "All" ? products : products.filter((p) => p.category === activeCategory);
    if (sort === "Price: Low to High") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "Price: High to Low") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [activeCategory, sort]);

  return (
    <div style={{ background: "#fff", color: "#000", minHeight: "100vh" }}>
      <StoreNavbar />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "3rem 2rem" }}>
        {/* Page header */}
        <div style={{ marginBottom: "2.5rem" }}>
          <h1 className="font-title" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", lineHeight: 1, margin: "0 0 0.5rem" }}>
            All Products
          </h1>
          <p className="font-body" style={{ color: "#6b7280", fontSize: "0.9rem" }}>
            {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
          </p>
        </div>

        {/* Filters bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem", paddingBottom: "1.5rem", borderBottom: "1px solid #f3f4f6" }}>
          {/* Category pills */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="font-sub"
                style={{
                  padding: "0.5rem 1.1rem", borderRadius: "9999px", fontSize: "0.8rem", fontWeight: 600,
                  border: "1.5px solid",
                  borderColor: activeCategory === cat ? "#000" : "#e5e7eb",
                  background: activeCategory === cat ? "#000" : "#fff",
                  color: activeCategory === cat ? "#fff" : "#374151",
                  cursor: "pointer", transition: "all 0.2s",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="font-sub"
            style={{
              padding: "0.5rem 1rem", borderRadius: "8px", fontSize: "0.8rem",
              border: "1.5px solid #e5e7eb", background: "#fff", cursor: "pointer",
            }}
          >
            {sortOptions.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "2rem" }}>
          {filtered.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Link href={`/shop/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {/* Image placeholder — replace background with <Image> when photos arrive */}
                  <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden", aspectRatio: "3/4", background: product.images[0] }}>
                    {product.tag && (
                      <span className="font-sub" style={{
                        position: "absolute", top: "0.75rem", left: "0.75rem",
                        background: "#000", color: "#fff",
                        fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em",
                        textTransform: "uppercase", padding: "0.3rem 0.7rem", borderRadius: "9999px",
                      }}>
                        {product.tag}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <p className="font-sub" style={{ fontWeight: 600, fontSize: "0.9rem", margin: "0 0 0.2rem" }}>{product.name}</p>
                      <p className="font-body" style={{ fontSize: "0.8rem", color: "#6b7280", margin: 0 }}>{product.category}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p className="font-body" style={{ fontWeight: 700, fontSize: "0.9rem", margin: 0 }}>GH₵{(product.price * 15).toLocaleString()}</p>
                      {product.originalPrice && (
                        <p className="font-body" style={{ fontSize: "0.75rem", color: "#9ca3af", textDecoration: "line-through", margin: 0 }}>
                          GH₵{(product.originalPrice * 15).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Color dots */}
                  <div style={{ display: "flex", gap: "0.35rem" }}>
                    {product.colors.map((c) => (
                      <span key={c.hex} title={c.name} style={{
                        width: "12px", height: "12px", borderRadius: "50%",
                        background: c.hex, border: "1.5px solid #d1d5db", flexShrink: 0,
                      }} />
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense>
      <ShopContent />
    </Suspense>
  );
}
