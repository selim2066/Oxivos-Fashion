import { Product } from './types';

export const products: Product[] = [
  {
    id: 1,
    name: "Classic Tailored Blazer",
    category: "Men",
    price: 260,
    image: "https://images.unsplash.com/photo-1619603364904-c0498317e145?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1619603364904-c0498317e145?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1618886614638-80e3c103d31a?w=800&auto=format&fit=crop&q=80"
    ],
    rating: 4.9,
    colors: ["Obsidian", "Charcoal"],
    sizes: ["46", "48", "50", "52"],
    inStock: true,
    description: "An architectural double-breasted blazer constructed from premium tropical wool. Engineered with soft structured shoulders and a clean drape for modern formal tailoring.",
    subtitle: "Obsidian / Tropical Wool",
    details: [
      "Premium breathable tropical wool blend",
      "Double-breasted front with horn buttons",
      "Soft structured shoulders for modern posture",
      "Twin back vents for ease of movement",
      "Internal chest pockets for security"
    ],
    materials: "Body: 80% Wool, 20% Polyester. Lining: 100% Viscose. Professional dry clean only."
  },
  {
    id: 2,
    name: "Minimalist Transit Overshirt",
    category: "Men",
    price: 145,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=80"
    ],
    rating: 4.5,
    colors: ["Olive", "Obsidian"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    description: "A transitional layering piece combining utility details with a sharp collar profile. Crafted from a structured cotton-nylon blend that holds its shape.",
    subtitle: "Olive / Cotton Nylon Blend",
    details: [
      "Water-resistant cotton-nylon canvas",
      "Concealed snap button placket",
      "Dual chest pockets with hidden side entry",
      "Adjustable snap cuffs",
      "Straight hem with split side seams"
    ],
    materials: "70% Cotton, 30% Nylon. Machine wash cold with similar colors. Hang dry."
  },
  {
    id: 3,
    name: "Articulated Trek Trousers",
    category: "Men",
    price: 180,
    image: "https://images.unsplash.com/photo-1578681994506-b8f463449011?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1578681994506-b8f463449011?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=800&auto=format&fit=crop&q=80"
    ],
    rating: 4.8,
    colors: ["Sand", "Olive", "Obsidian"],
    sizes: ["30", "32", "34", "36"],
    inStock: true,
    description: "Constructed from 4-way stretch water-repellent tech fabric. Features an integrated webbing belt and articulated knees for unrestricted stride.",
    subtitle: "Sand / Technical Stretch",
    details: [
      "Durable water-repellent (DWR) 4-way stretch",
      "Articulated knees for ergonomic movement",
      "Integrated webbed belt with magnetic clasp",
      "Secured zippered thigh cargo pockets",
      "Adjustable drawcord hems"
    ],
    materials: "90% Nylon, 10% Spandex. Machine wash cold. Do not tumble dry."
  },
  {
    id: 9,
    name: "Kids Everyday Jogger",
    category: "Kids",
    price: 65,
    image: "https://images.unsplash.com/photo-1529756148791-fbca69bfe693?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1529756148791-fbca69bfe693?w=800&auto=format&fit=crop&q=80"
    ],
    rating: 4.6,
    colors: ["Obsidian", "Olive"],
    sizes: ["4-5Y", "6-7Y", "8-9Y", "10-11Y"],
    inStock: true,
    description: "Durable, high-stretch knit joggers with reinforced knees. Ideal for everyday transit, school, and outdoor adventure.",
    subtitle: "Obsidian / Reinforced Knit",
    details: [
      "High-stretch organic cotton interlock knit",
      "Double-layered reinforced knee panels",
      "Elastic waistband with interior flat drawstring",
      "Deep utility pockets for small treasures",
      "Ribbed ankle cuffs for snug fit"
    ],
    materials: "95% Cotton, 5% Elastane. Machine wash hot with similar colors. Tumble dry medium."
  },
  {
    id: 7,
    name: "Kids Tech Windbreaker",
    category: "Kids",
    price: 95,
    image: "https://images.unsplash.com/photo-1578897367107-2828e351c8a8?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1578897367107-2828e351c8a8?w=800&auto=format&fit=crop&q=80"
    ],
    rating: 4.8,
    colors: ["Sky Blue", "Olive", "Black"],
    sizes: ["4-5Y", "6-7Y", "8-9Y", "10-11Y"],
    inStock: true,
    description: "A lightweight technical shell designed for active play. Crafted from tear-resistant ripstop nylon with a water-repellent protective layer.",
    subtitle: "Sky Blue / Ripstop Nylon",
    details: [
      "Durable water-repellent (DWR) finish",
      "Tear-resistant ripstop nylon fabric",
      "Elastic hood and cuffs to keep wind out",
      "Zippered hand pockets",
      "Reflective safety striping on back"
    ],
    materials: "100% Recycled Nylon ripstop. Machine wash cold. Tumble dry low."
  },
  {
    id: 8,
    name: "Kids Cotton Pullover",
    category: "Kids",
    price: 75,
    image: "https://images.unsplash.com/photo-1578897367002-2873f26520fd?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1578897367002-2873f26520fd?w=800&auto=format&fit=crop&q=80"
    ],
    rating: 4.5,
    colors: ["Charcoal", "Cream"],
    sizes: ["4-5Y", "6-7Y", "8-9Y", "10-11Y"],
    inStock: true,
    description: "A soft, structured crewneck pullover made from certified organic cotton fleece. Features flatlock seams for sensory comfort during play.",
    subtitle: "Charcoal / Organic Cotton Fleece",
    details: [
      "100% organic cotton French terry",
      "Ultra-soft interior fleece brushed finish",
      "Ribbed crewneck and wide elastic cuffs",
      "Flatlock stitching avoids skin friction",
      "Pre-washed to resist shrinkage"
    ],
    materials: "100% Organic Cotton. Wash inside out with similar colors. Tumble dry low."
  },
  {
    id: 5,
    name: "Aero Tech Longsleeve",
    category: "Women",
    price: 90,
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80"
    ],
    rating: 4.6,
    colors: ["Cream", "Obsidian"],
    sizes: ["XS", "S", "M", "L"],
    inStock: true,
    description: "Constructed from an ultra-soft modal blend with high stretch recovery. Articulated flatlock stitching ensures friction-free movement during daily transit.",
    subtitle: "Cream / High Stretch Modal",
    details: [
      "Moisture-wicking, breathable modal blend",
      "4-way high stretch recovery active fit",
      "Flatlock seams prevent chafing",
      "Reflective detailing on collar back",
      "Integrated thumbholes on cuffs"
    ],
    materials: "88% Modal, 12% Spandex. Machine wash cold with similar colors. Lay flat to dry."
  },
  {
    id: 6,
    name: "Relaxed Linen Trouser",
    category: "Women",
    price: 130,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop&q=80"
    ],
    rating: 4.4,
    colors: ["Cloud White", "Sand"],
    sizes: ["XS", "S", "M", "L"],
    inStock: true,
    description: "An airy, wide-leg trouser cut from fine European flax. Offers a relaxed silhouette and elasticated waistband adjustment for maximum heat comfort.",
    subtitle: "Cloud White / European Flax Linen",
    details: [
      "100% premium European flax linen",
      "Relaxed wide-leg drape",
      "Comfort elasticated waist with drawcord",
      "Slanted front pockets and rear patch pocket",
      "Breathable, lightweight slub texture"
    ],
    materials: "100% Linen. Machine wash cold on delicate. Lay flat to dry."
  },
  {
    id: 4,
    name: "Structured Trench Coat",
    category: "Women",
    price: 295,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&auto=format&fit=crop&q=80"
    ],
    rating: 4.6,
    colors: ["Sand", "Black"],
    sizes: ["XS", "S", "M", "L"],
    inStock: true,
    description: "A contemporary reimagining of the classic double-breasted trench. Tailored from a wind-proof organic cotton gabardine with an adjustable storm flap.",
    subtitle: "Sand / Cotton Gabardine",
    details: [
      "Windproof organic cotton gabardine",
      "Double-breasted front button design",
      "Detachable waist belt with custom buckle",
      "Deep side-welt utility pockets",
      "Adjustable buttoned cuffs"
    ],
    materials: "100% Organic Cotton Gabardine. Dry clean only."
  },
  {
    id: 10,
    name: "Meridian Canvas Tote",
    category: "Accessories",
    price: 110,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&auto=format&fit=crop&q=80"
    ],
    rating: 4.6,
    colors: ["Cream", "Black"],
    sizes: ["One Size"],
    inStock: true,
    description: "An architectural carry-all constructed from reinforced 18oz cotton canvas. Features hand-stitched leather handle details and a 16-inch padded compartment.",
    subtitle: "Cream / Premium 18oz Canvas",
    details: [
      "Heavy-duty 18oz organic cotton canvas",
      "Hand-stitched full grain leather straps",
      "Padded compartment fits up to 16-inch laptop",
      "Multiple interior organizer slots",
      "Reinforced double-layered bottom panel"
    ],
    materials: "Canvas: 100% Cotton. Straps: 100% Full Grain Leather. Spot clean only."
  },
  {
    id: 11,
    name: "Summit Ripstop Cap",
    category: "Accessories",
    price: 40,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&auto=format&fit=crop&q=80"
    ],
    rating: 4.5,
    colors: ["Sand", "Black", "Olive"],
    sizes: ["One Size"],
    inStock: false,
    description: "A featherlight, highly packable utility cap made of quick-dry ripstop fabric. Designed to offer protection from the sun with maximum breathability.",
    subtitle: "Sand / Packable Ripstop",
    details: [
      "Featherlight, crushable foam brim design",
      "Quick-dry moisture-wicking ripstop panels",
      "Laser-perforated side ventilation holes",
      "Adjustable elastic cord lock on rear",
      "Integrated soft sweat-absorbing band"
    ],
    materials: "90% Recycled Polyester, 10% Spandex. Hand wash cold. Air dry."
  },
  {
    id: 12,
    name: "Alpine Ridge Boots",
    category: "Accessories",
    price: 280,
    image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=800&auto=format&fit=crop&q=80"
    ],
    rating: 4.9,
    colors: ["Sand", "Black"],
    sizes: ["40", "41", "42", "43", "44"],
    inStock: true,
    description: "All-terrain hiking boots pairing waterproof grain leather with a Vibram high-traction compound tread. Articulated speed-lacing system.",
    subtitle: "Sand / Waterproof Nubuck Leather",
    details: [
      "Waterproof Nubuck leather upper blocks water",
      "Vibram high-traction compound rubber outsole",
      "Ortholite cushioning footbed for long walks",
      "Gusseted tongue protects from trail dust",
      "Anodized metal speed lace lacing system"
    ],
    materials: "Upper: Grain Leather & Ripstop. Outsole: Vibram Rubber. Wipe clean with damp cloth."
  }
];
