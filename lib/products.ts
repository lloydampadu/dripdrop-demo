export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  tag?: string;
  description: string;
  details: string[];
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  category: string;
  inStock: boolean;
}

// Placeholder colors — replace images array with real URLs when client provides photos
const PH = {
  tee:    ["#d4cfc9", "#c8c4be"],
  cargo:  ["#c9cdd4", "#bfc3ca"],
  hat:    ["#d4d0c9", "#cac6bf"],
  mesh:   ["#cdd4cf", "#c3cac5"],
  hoodie: ["#c9c9c9", "#bfbfbf"],
  denim:  ["#b8c4d4", "#aebaca"],
};

export const products: Product[] = [
  {
    id: "oversized-acid-tee",
    name: "Oversized Acid Tee",
    price: 65,
    tag: "Best Seller",
    description: "A heavyweight washed tee that hits different. Cut for an oversized silhouette with raw-edge details and a lived-in feel straight out of the bag.",
    details: ["100% heavyweight cotton 280gsm", "Acid wash treatment — each piece unique", "Oversized drop-shoulder fit", "Raw hem finish", "Machine wash cold"],
    images: PH.tee,
    colors: [{ name: "Washed Black", hex: "#1a1a1a" }, { name: "Stone", hex: "#e5e7eb" }, { name: "Rust", hex: "#854d0e" }],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    category: "Tops",
    inStock: true,
  },
  {
    id: "vintage-cargo-pant",
    name: "Vintage Cargo Pant",
    price: 120,
    tag: "New Drop",
    description: "Six-pocket utility cargo built from garment-dyed ripstop. Relaxed through the hip, tapered at the ankle — the kind of pant that works on the block or the runway.",
    details: ["65% cotton / 35% ripstop nylon", "Garment-dyed for a faded vintage finish", "6 utility pockets", "Adjustable ankle cuffs", "Relaxed fit"],
    images: PH.cargo,
    colors: [{ name: "Black", hex: "#1a1a1a" }, { name: "Slate", hex: "#4b5563" }],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    category: "Bottoms",
    inStock: true,
  },
  {
    id: "bucket-hat-ss25",
    name: "Bucket Hat — SS25",
    price: 45,
    tag: "Limited",
    description: "Structured bucket in premium canvas with an embroidered Chrisera wordmark. Part of the SS25 headwear capsule — limited to 200 units worldwide.",
    details: ["Premium cotton canvas", "Structured brim — holds shape", "Embroidered logo", "Inner sweatband", "Limited to 200 units"],
    images: PH.hat,
    colors: [{ name: "Black", hex: "#1a1a1a" }, { name: "Butter", hex: "#fef08a" }, { name: "Sky", hex: "#bfdbfe" }],
    sizes: ["S/M", "L/XL"],
    category: "Accessories",
    inStock: true,
  },
  {
    id: "summer-mesh-set",
    name: "Summer Mesh Set",
    price: 95,
    tag: "New Drop",
    description: "Matching two-piece mesh set — cropped top and wide-leg shorts. Breathable, bold, and made for the heat. Style it together or split the set.",
    details: ["100% open-weave mesh", "Matching two-piece set", "Cropped tank + wide-leg short", "Elasticated waistband", "Hand wash recommended"],
    images: PH.mesh,
    colors: [{ name: "White", hex: "#ffffff" }, { name: "Black", hex: "#1a1a1a" }],
    sizes: ["XS", "S", "M", "L", "XL"],
    category: "Sets",
    inStock: true,
  },
  {
    id: "shadow-hoodie",
    name: "Shadow Hoodie",
    price: 110,
    tag: "New Drop",
    description: "Heavyweight fleece hoodie with a boxy silhouette and tonal embroidery. Part of the Shadow Pack SS25 capsule.",
    details: ["420gsm fleece cotton blend", "Boxy oversized fit", "Tonal embroidered logo", "Kangaroo pocket", "Ribbed cuffs and hem"],
    images: PH.hoodie,
    colors: [{ name: "Charcoal", hex: "#374151" }, { name: "Black", hex: "#1a1a1a" }],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    category: "Tops",
    inStock: true,
  },
  {
    id: "wide-leg-denim",
    name: "Wide Leg Denim",
    price: 135,
    originalPrice: 160,
    tag: "Sale",
    description: "90s-inspired wide leg denim in raw selvedge. High-rise waist, clean front crease, and a silhouette that commands attention.",
    details: ["Japanese selvedge denim 12oz", "High-rise wide-leg fit", "Raw hem", "5-pocket construction", "Non-stretch — size up for comfort"],
    images: PH.denim,
    colors: [{ name: "Raw Indigo", hex: "#1e3a5f" }, { name: "Washed Black", hex: "#1a1a1a" }],
    sizes: ["XS", "S", "M", "L", "XL"],
    category: "Bottoms",
    inStock: true,
  },
];

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}
