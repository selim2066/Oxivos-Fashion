"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface Category {
  label: string;
  href: string;
  image: string;
  count: string;
  description: string;
  span?: "tall" | "wide" | "normal";
}

const categories: Category[] = [
  {
    label: "Men",
    href: "/products?category=Men",
    image:
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=900&auto=format&fit=crop&q=80",
    count: "42 Styles",
    description: "Refined tailoring for the modern man",
    span: "tall",
  },
  {
    label: "Women",
    href: "/products?category=Women",
    image:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=900&auto=format&fit=crop&q=80",
    count: "58 Styles",
    description: "Effortless elegance, every season",
    span: "normal",
  },
  {
    label: "Kids",
    href: "/products?category=Kids",
    image:
      "https://plus.unsplash.com/premium_photo-1678559460700-8a1d42ce8239?w=900&auto=format&fit=crop&q=80",
    count: "34 Styles",
    description: "Playful and practical everyday wear",
    span: "normal",
  },
  {
    label: "Accessories",
    href: "/products?category=Accessories",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900&auto=format&fit=crop&q=80",
    count: "26 Styles",
    description: "The finishing touch to every look",
    span: "wide",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export const CategorySection: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="py-12 sm:py-16 md:py-section-gap px-4 sm:px-6 md:px-8 lg:px-12 max-w-[1440px] mx-auto border-t border-outline-variant/30">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-6 sm:mb-8 md:mb-10 gap-2 sm:gap-3">
        <div>
          <span className="text-[10px] sm:text-label-sm font-bold uppercase tracking-widest block mb-1" style={{ color: "#800020" }}>
            Browse by Category
          </span>
          <h2 className="font-heading text-xl sm:text-2xl md:text-headline-lg text-primary uppercase tracking-tight font-black">
            Shop the Collection
          </h2>
        </div>
        <Link
          href="/products"
          className="text-[10px] sm:text-label-sm uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 group self-start sm:self-auto"
        >
          View All
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>

      {/* Grid */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 md:gap-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* Men — tall card spanning 2 rows on md */}
        <motion.div
          variants={cardVariants}
          className="col-span-1 row-span-2 md:col-span-1 md:row-span-2"
          style={{ gridRow: "span 2" }}
          onMouseEnter={() => setHoveredIdx(0)}
          onMouseLeave={() => setHoveredIdx(null)}
        >
          <CategoryCard category={categories[0]} isHovered={hoveredIdx === 0} tall />
        </motion.div>

        {/* Women */}
        <motion.div
          variants={cardVariants}
          className="col-span-1 md:col-span-2"
          onMouseEnter={() => setHoveredIdx(1)}
          onMouseLeave={() => setHoveredIdx(null)}
        >
          <CategoryCard category={categories[1]} isHovered={hoveredIdx === 1} />
        </motion.div>

        {/* Kids */}
        <motion.div
          variants={cardVariants}
          className="col-span-1 md:col-span-1"
          onMouseEnter={() => setHoveredIdx(2)}
          onMouseLeave={() => setHoveredIdx(null)}
        >
          <CategoryCard category={categories[2]} isHovered={hoveredIdx === 2} />
        </motion.div>

        {/* Accessories — wide card spanning 3 cols on md */}
        <motion.div
          variants={cardVariants}
          className="col-span-2 md:col-span-3"
          onMouseEnter={() => setHoveredIdx(3)}
          onMouseLeave={() => setHoveredIdx(null)}
        >
          <CategoryCard category={categories[3]} isHovered={hoveredIdx === 3} wide />
        </motion.div>
      </motion.div>
    </section>
  );
};

// ─── Individual Card ─────────────────────────────────────────────────────────

interface CardProps {
  category: Category;
  isHovered: boolean;
  tall?: boolean;
  wide?: boolean;
}

const CategoryCard: React.FC<CardProps> = ({ category, isHovered, tall, wide }) => {
  const height = tall
    ? "h-[240px] sm:h-[340px] md:h-full md:min-h-[460px]"
    : wide
    ? "h-[140px] sm:h-[180px] md:h-[210px]"
    : "h-[150px] sm:h-[200px] md:h-[220px]";

  return (
    <Link
      href={category.href}
      className={`relative group block w-full ${height} overflow-hidden rounded-xl sm:rounded-2xl bg-black`}
      aria-label={`Shop ${category.label}`}
    >
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        animate={{ scale: isHovered ? 1.07 : 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src={category.image}
          alt={category.label}
          className="w-full h-full object-cover object-center select-none pointer-events-none"
          draggable={false}
        />
      </motion.div>

      {/* Gradient scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent z-10 pointer-events-none" />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-3 sm:p-4 md:p-5">
        {/* Count pill */}
        <motion.span
          className="self-start text-[8px] sm:text-[9px] md:text-[10px] font-bold uppercase tracking-widest px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full mb-1.5 sm:mb-2 border border-white/20 backdrop-blur-sm"
          style={{ backgroundColor: "rgba(128,0,32,0.75)", color: "#fff" }}
          animate={{ opacity: isHovered ? 1 : 0.85 }}
        >
          {category.count}
        </motion.span>

        {/* Label */}
        <h3 className="font-heading text-white uppercase tracking-tight leading-none text-base sm:text-xl md:text-2xl font-black">
          {category.label}
        </h3>

        {/* Description — slides in on hover */}
        <motion.p
          className="text-white/70 text-[10px] sm:text-[11px] md:text-xs mt-0.5 sm:mt-1 leading-snug"
          initial={false}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 6,
          }}
          transition={{ duration: 0.3 }}
        >
          {category.description}
        </motion.p>
      </div>

      {/* Arrow icon — top right */}
      <motion.div
        className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center"
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.75,
        }}
        transition={{ duration: 0.3 }}
      >
        <ArrowUpRight className="w-4 h-4 text-white" />
      </motion.div>
    </Link>
  );
};
