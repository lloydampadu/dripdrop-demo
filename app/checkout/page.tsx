"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePaystackPayment } from "react-paystack";
import { useCart } from "@/lib/cart-context";
import StoreNavbar from "@/app/components/StoreNavbar";

const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxx";

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
}

const initialForm: FormState = {
  firstName: "", lastName: "", email: "", phone: "",
  address: "", city: "", state: "",
};

const nigeriaStates = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu",
  "FCT", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi",
  "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun",
  "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara",
];

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
      <label className="font-sub" style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.05em" }}>{label}</label>
      {children}
      {error && <span className="font-body" style={{ fontSize: "0.72rem", color: "#ef4444" }}>{error}</span>}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "0.75rem 1rem", borderRadius: "10px",
  border: "1.5px solid #e5e7eb", fontSize: "0.9rem",
  fontFamily: "var(--font-body)", outline: "none",
  transition: "border-color 0.2s", width: "100%", boxSizing: "border-box",
};

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [loading, setLoading] = useState(false);

  const shipping = subtotal > 500 ? 0 : 35;
  const total = subtotal + shipping;

  function validate() {
    const e: Partial<FormState> = {};
    if (!form.firstName) e.firstName = "Required";
    if (!form.lastName) e.lastName = "Required";
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.phone || form.phone.length < 10) e.phone = "Valid phone required";
    if (!form.address) e.address = "Required";
    if (!form.city) e.city = "Required";
    if (!form.state) e.state = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  const paystackConfig = {
    reference: `chrisera_${Date.now()}`,
    email: form.email || "customer@chrisera.com",
    amount: total * 100,
    publicKey: PAYSTACK_PUBLIC_KEY,
    metadata: {
      custom_fields: [
        { display_name: "Customer Name", variable_name: "customer_name", value: `${form.firstName} ${form.lastName}` },
        { display_name: "Phone", variable_name: "phone", value: form.phone },
        { display_name: "Delivery Address", variable_name: "address", value: `${form.address}, ${form.city}, ${form.state}` },
      ],
    },
  };

  const initializePayment = usePaystackPayment(paystackConfig);

  function onSuccess() {
    clear();
    router.push("/order-success");
  }

  function onClose() {
    setLoading(false);
  }

  function handlePay() {
    if (!validate()) return;
    setLoading(true);
    initializePayment({ onSuccess, onClose });
  }

  if (items.length === 0) {
    return (
      <div style={{ background: "#fff", color: "#000", minHeight: "100vh" }}>
        <StoreNavbar />
        <div style={{ maxWidth: "500px", margin: "0 auto", padding: "6rem 2rem", textAlign: "center" }}>
          <h1 className="font-title" style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Nothing to Check Out</h1>
          <Link href="/shop" className="font-sub" style={{
            background: "#000", color: "#fff", borderRadius: "9999px",
            padding: "0.9rem 2rem", textDecoration: "none", fontSize: "0.9rem", fontWeight: 700,
          }}>Back to Shop</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#fff", color: "#000", minHeight: "100vh" }}>
      <StoreNavbar />

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "3rem 2rem" }}>
        <h1 className="font-title" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", margin: "0 0 2.5rem" }}>Checkout</h1>

        <div style={{ display: "flex", gap: "4rem", flexWrap: "wrap", alignItems: "flex-start" }}>

          {/* Form */}
          <div style={{ flex: "1 1 400px", display: "flex", flexDirection: "column", gap: "2rem" }}>

            {/* Contact */}
            <section>
              <h2 className="font-title" style={{ fontSize: "1.3rem", margin: "0 0 1rem" }}>Contact Info</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <Field label="First Name" error={errors.firstName}>
                  <input
                    style={inputStyle}
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    placeholder="John"
                  />
                </Field>
                <Field label="Last Name" error={errors.lastName}>
                  <input
                    style={inputStyle}
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    placeholder="Doe"
                  />
                </Field>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem" }}>
                <Field label="Email" error={errors.email}>
                  <input
                    style={inputStyle}
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="john@email.com"
                  />
                </Field>
                <Field label="Phone" error={errors.phone}>
                  <input
                    style={inputStyle}
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="08012345678"
                  />
                </Field>
              </div>
            </section>

            {/* Delivery */}
            <section>
              <h2 className="font-title" style={{ fontSize: "1.3rem", margin: "0 0 1rem" }}>Delivery Address</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <Field label="Street Address" error={errors.address}>
                  <input
                    style={inputStyle}
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder="12 Adeola Street"
                  />
                </Field>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <Field label="City" error={errors.city}>
                    <input
                      style={inputStyle}
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      placeholder="Lagos"
                    />
                  </Field>
                  <Field label="State" error={errors.state}>
                    <select
                      style={{ ...inputStyle, background: "#fff" }}
                      value={form.state}
                      onChange={(e) => setForm({ ...form, state: e.target.value })}
                    >
                      <option value="">Select state</option>
                      {nigeriaStates.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </Field>
                </div>
              </div>
            </section>

            {/* Payment note */}
            <div style={{ background: "#f9fafb", borderRadius: "14px", padding: "1.25rem", display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
              <span style={{ fontSize: "1.2rem" }}>🔒</span>
              <div>
                <p className="font-sub" style={{ fontWeight: 700, fontSize: "0.8rem", margin: "0 0 0.2rem" }}>Secure Payment via Paystack</p>
                <p className="font-body" style={{ fontSize: "0.78rem", color: "#6b7280", margin: 0 }}>
                  Your payment is processed securely by Paystack. We accept cards, bank transfer, and USSD.
                </p>
              </div>
            </div>

            <button
              onClick={handlePay}
              disabled={loading}
              className="font-sub"
              style={{
                background: loading ? "#6b7280" : "#000", color: "#fff",
                border: "none", borderRadius: "9999px",
                padding: "1.1rem 2rem", fontSize: "1rem", fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer", transition: "background 0.2s",
              }}
            >
              {loading ? "Opening Payment…" : `Pay GH₵${total.toLocaleString()}`}
            </button>
          </div>

          {/* Order summary */}
          <div style={{ flex: "0 0 300px", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h2 className="font-title" style={{ fontSize: "1.3rem", margin: 0 }}>Your Order</h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {items.map((item) => (
                <div key={`${item.id}-${item.color}-${item.size}`} style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                  <div style={{ position: "relative", width: "60px", height: "76px", borderRadius: "10px", background: item.image, flexShrink: 0 }}>
                    <span style={{
                      position: "absolute", top: "-4px", right: "-4px",
                      background: "#000", color: "#fff", borderRadius: "50%",
                      width: "18px", height: "18px", fontSize: "0.6rem", fontWeight: 700,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>{item.quantity}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p className="font-sub" style={{ fontWeight: 600, fontSize: "0.82rem", margin: "0 0 0.15rem" }}>{item.name}</p>
                    <p className="font-body" style={{ fontSize: "0.73rem", color: "#9ca3af", margin: 0 }}>{item.color} · {item.size}</p>
                  </div>
                  <p className="font-body" style={{ fontWeight: 700, fontSize: "0.85rem", flexShrink: 0, margin: 0 }}>
                    GH₵{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span className="font-body" style={{ color: "#6b7280", fontSize: "0.85rem" }}>Subtotal</span>
                <span className="font-body" style={{ fontSize: "0.85rem" }}>GH₵{subtotal.toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span className="font-body" style={{ color: "#6b7280", fontSize: "0.85rem" }}>Shipping</span>
                <span className="font-body" style={{ fontSize: "0.85rem" }}>{shipping === 0 ? "Free" : `GH₵${shipping.toLocaleString()}`}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "0.5rem", borderTop: "1px solid #e5e7eb" }}>
                <span className="font-title" style={{ fontSize: "1rem" }}>Total</span>
                <span className="font-title" style={{ fontSize: "1rem" }}>GH₵{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
