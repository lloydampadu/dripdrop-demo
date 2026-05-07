"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import StoreNavbar from "@/app/components/StoreNavbar";

export default function OrderSuccessPage() {
  return (
    <div style={{ background: "#fff", color: "#000", minHeight: "100vh" }}>
      <StoreNavbar />

      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "6rem 2rem", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>

        {/* Check icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 14 }}
          style={{
            width: "80px", height: "80px", borderRadius: "50%",
            background: "#000", display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
        >
          <h1 className="font-title" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", lineHeight: 1, margin: 0 }}>
            Order Confirmed!
          </h1>
          <p className="font-body" style={{ color: "#6b7280", lineHeight: 1.7, fontSize: "0.95rem", margin: 0 }}>
            Thank you for shopping with Chrisera. Your order has been received and is being processed. You&apos;ll get a confirmation email shortly.
          </p>
        </motion.div>

        {/* Info cards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", width: "100%", marginTop: "0.5rem" }}
        >
          {[
            { icon: "📦", title: "Processing", body: "Your items are being packed" },
            { icon: "🚚", title: "Delivery", body: "3–5 business days nationwide" },
            { icon: "📧", title: "Email Sent", body: "Check your inbox for your receipt" },
            { icon: "💬", title: "Support", body: "DM us on Instagram anytime" },
          ].map((item) => (
            <div key={item.title} style={{
              background: "#f9fafb", borderRadius: "14px", padding: "1.25rem",
              display: "flex", flexDirection: "column", gap: "0.35rem", textAlign: "left",
            }}>
              <span style={{ fontSize: "1.4rem" }}>{item.icon}</span>
              <p className="font-sub" style={{ fontWeight: 700, fontSize: "0.82rem", margin: 0 }}>{item.title}</p>
              <p className="font-body" style={{ fontSize: "0.78rem", color: "#6b7280", margin: 0 }}>{item.body}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}
        >
          <Link href="/shop" className="font-sub" style={{
            background: "#000", color: "#fff", borderRadius: "9999px",
            padding: "0.9rem 2rem", fontSize: "0.9rem", fontWeight: 700, textDecoration: "none",
          }}>
            Continue Shopping
          </Link>
          <Link href="/" className="font-sub" style={{
            border: "1.5px solid #e5e7eb", color: "#374151", borderRadius: "9999px",
            padding: "0.9rem 2rem", fontSize: "0.9rem", fontWeight: 600, textDecoration: "none",
          }}>
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
