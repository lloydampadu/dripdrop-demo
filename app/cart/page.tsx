"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import StoreNavbar from "@/app/components/StoreNavbar";
import Footer from "@/app/components/Footer";

export default function CartPage() {
  const { items, subtotal, remove, updateQty } = useCart();

  const shipping = subtotal > 500 ? 0 : 35;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div style={{ background: "#fff", color: "#000", minHeight: "100vh" }}>
        <StoreNavbar />
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "6rem 2rem", textAlign: "center" }}>
          <h1 className="font-title" style={{ fontSize: "3rem", margin: "0 0 1rem" }}>Your Bag is Empty</h1>
          <p className="font-body" style={{ color: "#6b7280", marginBottom: "2rem" }}>Looks like you haven&apos;t added anything yet.</p>
          <Link href="/shop" className="font-sub" style={{
            background: "#C9A84C", color: "#1a1a1a", borderRadius: "9999px",
            padding: "0.9rem 2.5rem", fontSize: "0.9rem", fontWeight: 700, textDecoration: "none",
          }}>
            Shop Now
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ background: "#fff", color: "#000", minHeight: "100vh" }}>
      <StoreNavbar />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "3rem 2rem" }}>
        <h1 className="font-title" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1, margin: "0 0 2.5rem" }}>
          Your Bag ({items.length})
        </h1>

        <div style={{ display: "flex", gap: "4rem", flexWrap: "wrap", alignItems: "flex-start" }}>
          {/* Items */}
          <div style={{ flex: "1 1 500px", display: "flex", flexDirection: "column", gap: "0" }}>
            <AnimatePresence>
              {items.map((item, i) => (
                <motion.div
                  key={`${item.id}-${item.color}-${item.size}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  style={{
                    display: "flex", gap: "1.25rem", padding: "1.5rem 0",
                    borderBottom: "1px solid #f3f4f6", alignItems: "flex-start",
                  }}
                >
                  {/* Image placeholder */}
                  <div style={{ width: "100px", height: "130px", borderRadius: "12px", background: item.image, flexShrink: 0 }} />

                  {/* Info */}
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    <p className="font-sub" style={{ fontWeight: 700, fontSize: "0.95rem", margin: 0 }}>{item.name}</p>
                    <p className="font-body" style={{ fontSize: "0.8rem", color: "#6b7280", margin: 0 }}>
                      {item.color} · Size {item.size}
                    </p>
                    <p className="font-body" style={{ fontWeight: 700, fontSize: "0.9rem", margin: 0 }}>
                      GH₵{item.price.toLocaleString()}
                    </p>

                    {/* Qty + Remove */}
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "0.5rem" }}>
                      <div style={{ display: "flex", alignItems: "center", border: "1.5px solid #e5e7eb", borderRadius: "8px", overflow: "hidden" }}>
                        <button
                          onClick={() => item.quantity > 1 ? updateQty(item.id, item.color, item.size, item.quantity - 1) : remove(item.id, item.color, item.size)}
                          style={{ width: "32px", height: "32px", border: "none", background: "none", cursor: "pointer", fontSize: "1rem" }}
                        >
                          −
                        </button>
                        <span className="font-sub" style={{ padding: "0 0.75rem", fontSize: "0.85rem", fontWeight: 600 }}>{item.quantity}</span>
                        <button
                          onClick={() => updateQty(item.id, item.color, item.size, item.quantity + 1)}
                          style={{ width: "32px", height: "32px", border: "none", background: "none", cursor: "pointer", fontSize: "1rem" }}
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => remove(item.id, item.color, item.size)}
                        className="font-sub"
                        style={{ fontSize: "0.75rem", color: "#ef4444", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Line total */}
                  <p className="font-body" style={{ fontWeight: 700, fontSize: "0.95rem", flexShrink: 0, margin: 0 }}>
                    GH₵{(item.price * item.quantity).toLocaleString()}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order summary */}
          <div style={{ flex: "0 0 320px", background: "#f9fafb", borderRadius: "20px", padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h2 className="font-title" style={{ fontSize: "1.5rem", margin: 0 }}>Order Summary</h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", paddingBottom: "1rem", borderBottom: "1px solid #e5e7eb" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span className="font-body" style={{ color: "#6b7280", fontSize: "0.9rem" }}>Subtotal</span>
                <span className="font-body" style={{ fontWeight: 600, fontSize: "0.9rem" }}>GH₵{subtotal.toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span className="font-body" style={{ color: "#6b7280", fontSize: "0.9rem" }}>Shipping</span>
                <span className="font-body" style={{ fontWeight: 600, fontSize: "0.9rem" }}>
                  {shipping === 0 ? "Free" : `GH₵${shipping.toLocaleString()}`}
                </span>
              </div>
              {shipping > 0 && (
                <p className="font-body" style={{ fontSize: "0.75rem", color: "#9ca3af", margin: 0 }}>
                  Free shipping on orders over GH₵750
                </p>
              )}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span className="font-title" style={{ fontSize: "1.1rem" }}>Total</span>
              <span className="font-title" style={{ fontSize: "1.1rem" }}>GH₵{total.toLocaleString()}</span>
            </div>

            <Link href="/checkout" className="font-sub" style={{
              display: "block", textAlign: "center",
              background: "#C9A84C", color: "#1a1a1a", borderRadius: "9999px",
              padding: "1rem", fontSize: "0.9rem", fontWeight: 700,
              textDecoration: "none", marginTop: "0.5rem",
            }}>
              Proceed to Checkout →
            </Link>

            <Link href="/shop" className="font-sub" style={{
              display: "block", textAlign: "center",
              color: "#6b7280", fontSize: "0.8rem", textDecoration: "none",
            }}>
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
