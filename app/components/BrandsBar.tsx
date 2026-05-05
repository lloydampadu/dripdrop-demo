"use client";

import Image from "next/image";

const brands = [
  { type: "img", src: "/brand-nike.svg", alt: "Nike", width: 48, height: 24 },
  { type: "img", src: "/brand-adidas.svg", alt: "Adidas", width: 52, height: 24 },
  { type: "img", src: "/brand-puma.svg", alt: "Puma", width: 52, height: 24 },
  { type: "img", src: "/brand-newbalance.svg", alt: "New Balance", width: 80, height: 24 },
  { type: "img", src: "/brand-reebok.svg", alt: "Reebok", width: 64, height: 24 },
  { type: "text", name: "ASICS", style: { fontWeight: 900, fontSize: "1rem", letterSpacing: "0.15em" } },
  { type: "text", name: "SAUCONY", style: { fontWeight: 900, fontSize: "0.85rem", letterSpacing: "0.12em" } },
];

const allBrands = [...brands, ...brands];

export default function BrandsBar() {
  return (
    <div style={{ borderBottom: "1px solid #e5e7eb", overflow: "hidden", padding: "2rem 0", marginTop: "1rem" }}>
      <div className="marquee-track" style={{ display: "flex", alignItems: "center", whiteSpace: "nowrap" }}>
        {allBrands.map((brand, i) => (
          <span
            key={i}
            style={{ margin: "0 3rem", flexShrink: 0, opacity: 0.65, display: "inline-flex", alignItems: "center", cursor: "pointer", transition: "opacity 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "0.65")}
          >
            {brand.type === "img" ? (
              <Image
                src={(brand as { type: "img"; src: string; alt: string; width: number; height: number }).src}
                alt={(brand as { type: "img"; src: string; alt: string; width: number; height: number }).alt}
                width={(brand as { type: "img"; src: string; alt: string; width: number; height: number }).width}
                height={(brand as { type: "img"; src: string; alt: string; width: number; height: number }).height}
                style={{ objectFit: "contain", filter: "brightness(0)" }}
              />
            ) : (
              <span style={(brand as { type: "text"; name: string; style: React.CSSProperties }).style}>
                {(brand as { type: "text"; name: string; style: React.CSSProperties }).name}
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
