"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { getProduct, products } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import StoreNavbar from "@/app/components/StoreNavbar";
import Footer from "@/app/components/Footer";
import Link from "next/link";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const maybeProduct = getProduct(id);
  if (!maybeProduct) notFound();
  const product = maybeProduct;

  const { add } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  function handleAddToCart() {
    if (!selectedSize) { setSizeError(true); return; }
    setSizeError(false);
    add({
      id: product.id,
      name: product.name,
      price: product.price * 15,
      image: product.images[0],
      color: selectedColor.name,
      size: selectedSize,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <div style={{ background: "#fff", color: "#000", minHeight: "100vh" }}>
      <StoreNavbar />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "3rem 2rem" }}>
        {/* Breadcrumb */}
        <div className="font-sub" style={{ display: "flex", gap: "0.5rem", fontSize: "0.75rem", color: "#9ca3af", marginBottom: "2rem", alignItems: "center" }}>
          <Link href="/shop" style={{ color: "#9ca3af", textDecoration: "none" }}>Shop</Link>
          <span>/</span>
          <span style={{ color: "#000" }}>{product.name}</span>
        </div>

        {/* Main layout */}
        <div style={{ display: "flex", gap: "4rem", flexWrap: "wrap", alignItems: "flex-start" }}>

          {/* Images */}
          <div style={{ flex: "1 1 400px", display: "flex", gap: "1rem" }}>
            {/* Thumbnails */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  style={{
                    width: "72px", height: "90px", borderRadius: "10px", overflow: "hidden",
                    border: activeImage === i ? "2px solid #000" : "2px solid transparent",
                    padding: 0, cursor: "pointer", flexShrink: 0, position: "relative",
                  }}
                >
                  <div style={{ position: "absolute", inset: 0, background: img }} />
                </button>
              ))}
            </div>

            {/* Main image placeholder */}
            <div style={{ flex: 1, position: "relative", borderRadius: "20px", overflow: "hidden", aspectRatio: "3/4", background: product.images[activeImage] }}>
              {product.tag && (
                <span className="font-sub" style={{
                  position: "absolute", top: "1rem", left: "1rem",
                  background: "#000", color: "#fff",
                  fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em",
                  textTransform: "uppercase", padding: "0.35rem 0.8rem", borderRadius: "9999px",
                }}>
                  {product.tag}
                </span>
              )}
            </div>
          </div>

          {/* Product info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            style={{ flex: "1 1 320px", display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <div>
              <p className="font-sub" style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6b7280", margin: "0 0 0.4rem" }}>
                {product.category}
              </p>
              <h1 className="font-title" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", lineHeight: 1, margin: "0 0 0.75rem" }}>
                {product.name}
              </h1>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span className="font-body" style={{ fontSize: "1.4rem", fontWeight: 700 }}>
                  GH₵{(product.price * 15).toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="font-body" style={{ fontSize: "1rem", color: "#9ca3af", textDecoration: "line-through" }}>
                    GH₵{(product.originalPrice * 15).toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            <p className="font-body" style={{ color: "#4b5563", lineHeight: 1.7, fontSize: "0.95rem", margin: 0 }}>
              {product.description}
            </p>

            {/* Color */}
            <div>
              <p className="font-sub" style={{ fontSize: "0.8rem", fontWeight: 700, marginBottom: "0.6rem" }}>
                Color — <span style={{ fontWeight: 400, color: "#6b7280" }}>{selectedColor.name}</span>
              </p>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {product.colors.map((c) => (
                  <button
                    key={c.hex}
                    title={c.name}
                    onClick={() => setSelectedColor(c)}
                    style={{
                      width: "28px", height: "28px", borderRadius: "50%",
                      background: c.hex, cursor: "pointer",
                      border: selectedColor.hex === c.hex ? "2px solid #000" : "2px solid #d1d5db",
                      outline: selectedColor.hex === c.hex ? "2px solid #fff" : "none",
                      outlineOffset: "-4px",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <p className="font-sub" style={{ fontSize: "0.8rem", fontWeight: 700, marginBottom: "0.6rem", color: sizeError ? "#ef4444" : "#000" }}>
                Size {sizeError && "— Please select a size"}
              </p>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => { setSelectedSize(s); setSizeError(false); }}
                    className="font-sub"
                    style={{
                      padding: "0.5rem 1rem", borderRadius: "8px", fontSize: "0.8rem", fontWeight: 600,
                      border: "1.5px solid",
                      borderColor: selectedSize === s ? "#000" : "#e5e7eb",
                      background: selectedSize === s ? "#000" : "#fff",
                      color: selectedSize === s ? "#fff" : "#374151",
                      cursor: "pointer",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <button
                onClick={handleAddToCart}
                className="font-sub"
                style={{
                  background: added ? "#16a34a" : "#000", color: "#fff",
                  border: "none", borderRadius: "9999px",
                  padding: "1rem 2rem", fontSize: "0.9rem", fontWeight: 700,
                  cursor: "pointer", transition: "background 0.3s",
                }}
              >
                {added ? "Added to Cart ✓" : "Add to Cart"}
              </button>
              <Link
                href="/checkout"
                className="font-sub"
                style={{
                  display: "block", textAlign: "center",
                  background: "#fff", color: "#000",
                  border: "1.5px solid #000", borderRadius: "9999px",
                  padding: "1rem 2rem", fontSize: "0.9rem", fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Buy Now
              </Link>
            </div>

            {/* Product details */}
            <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: "1.5rem" }}>
              <p className="font-sub" style={{ fontSize: "0.8rem", fontWeight: 700, marginBottom: "0.75rem" }}>Product Details</p>
              <ul className="font-body" style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                {product.details.map((d) => (
                  <li key={d} style={{ fontSize: "0.85rem", color: "#4b5563", display: "flex", gap: "0.5rem" }}>
                    <span style={{ color: "#000" }}>—</span> {d}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div style={{ marginTop: "5rem" }}>
            <h2 className="font-title" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", marginBottom: "1.5rem" }}>
              You Might Also Like
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1.5rem" }}>
              {related.map((p) => (
                <Link key={p.id} href={`/shop/${p.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    <div style={{ position: "relative", borderRadius: "14px", overflow: "hidden", aspectRatio: "3/4", background: p.images[0] }} />
                    <p className="font-sub" style={{ fontWeight: 600, fontSize: "0.85rem", margin: 0 }}>{p.name}</p>
                    <p className="font-body" style={{ fontWeight: 700, fontSize: "0.85rem", margin: 0 }}>GH₵{(p.price * 15).toLocaleString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
