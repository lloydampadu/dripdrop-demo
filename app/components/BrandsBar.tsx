"use client";

const items = [
  { text: "Street Essentials", sub: "The foundation of every fit" },
  { text: "On The Move", sub: "Sneakers built for the street" },
  { text: "Denim Forever", sub: "Fresh off the rack" },
];

const allItems = [...items, ...items];

const Dot = () => (
  <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#C9A84C", opacity: 0.7, display: "inline-block", flexShrink: 0 }} />
);

export default function BrandsBar() {
  return (
    <div style={{ borderBottom: "1px solid #e5e7eb", overflow: "hidden", padding: "1.75rem 0", marginTop: "1rem" }}>
      <div className="marquee-track" style={{ display: "flex", alignItems: "center", whiteSpace: "nowrap" }}>
        {allItems.map((item, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "2.5rem", flexShrink: 0, margin: "0 2.5rem" }}>
            {/* Text block */}
            <span style={{ display: "inline-flex", flexDirection: "column", gap: "0.15rem" }}>
              <span className="font-title" style={{ fontSize: "1.1rem", letterSpacing: "0.05em", lineHeight: 1 }}>
                {item.text}
              </span>
              <span className="font-body" style={{ fontSize: "0.7rem", color: "#6b7280", letterSpacing: "0.05em" }}>
                {item.sub}
              </span>
            </span>
            <Dot />
          </span>
        ))}
      </div>
    </div>
  );
}
