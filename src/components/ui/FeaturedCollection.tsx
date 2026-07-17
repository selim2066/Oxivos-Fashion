"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { products } from "@/lib/products";

interface FeaturedItem {
  id: number;
  image: string;
  tag: string;
  category: string;
  title: string;
  price: string;
  productId: number;
}

const featuredItems: FeaturedItem[] = [
  {
    id: 1,
    image: "/assets/suit1.png",
    tag: "Refined",
    category: "Featured Collection",
    title: "Classic Grey Vest",
    price: "85.00 USD",
    productId: 3,
  },
  {
    id: 2,
    image: "/assets/suit2.png",
    tag: "Formal",
    category: "Featured Collection",
    title: "Black Slim Suit",
    price: "150.00 USD",
    productId: 1,
  },
  {
    id: 3,
    image: "/assets/suit3.png",
    tag: "Sartorial",
    category: "Featured Collection",
    title: "Navy Three-Piece",
    price: "180.00 USD",
    productId: 7,
  },
  {
    id: 4, // Center item by default
    image: "/assets/suit4.png",
    tag: "Try on",
    category: "Featured Collection",
    title: "Guest Formal Edition",
    price: "120.20 USD",
    productId: 12,
  },
  {
    id: 5,
    image: "/assets/suit5.png",
    tag: "Tailored",
    category: "Featured Collection",
    title: "Royal Blue Suit",
    price: "175.00 USD",
    productId: 4,
  },
  {
    id: 6,
    image: "/assets/suit6.png",
    tag: "Modern",
    category: "Featured Collection",
    title: "Classic Navy Blazer",
    price: "110.00 USD",
    productId: 2,
  },
  {
    id: 7,
    image: "/assets/suit7.png",
    tag: "Casual",
    category: "Featured Collection",
    title: "Grey Casual Blazer",
    price: "95.00 USD",
    productId: 11,
  },
];

// Helper to compute circular difference in a modulo space
const getCircularDiff = (idx: number, active: number, total: number) => {
  let diff = idx - active;
  const half = Math.floor(total / 2);
  while (diff > half) diff -= total;
  while (diff < -half) diff += total;
  return diff;
};

export const FeaturedCollection: React.FC = () => {
  const { addItem } = useCart();
  const [activeIndex, setActiveIndex] = useState(3); // Start centered on item index 3 (id 4)
  const [windowWidth, setWindowWidth] = useState(1200);
  const [addedNotification, setAddedNotification] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  // Responsive settings
  const maxVisible = isMobile ? 0 : isTablet ? 1 : 2; // desktop: 5 total (2 each side), tablet: 3 total, mobile: 1 total
  const offset = isMobile ? 0 : isTablet ? 110 : 160;
  const cardWidth = isMobile ? 220 : isTablet ? 250 : 310;
  const cardHeight = isMobile ? 290 : isTablet ? 330 : 410;

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % featuredItems.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + featuredItems.length) % featuredItems.length);
  };

  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  const handleActionClick = (e: React.MouseEvent, item: FeaturedItem) => {
    e.stopPropagation();
    const productMatch = products.find((p) => p.id === item.productId) || products[0];
    addItem(productMatch, productMatch.colors[0], productMatch.sizes[0] || "M", 1);
    setAddedNotification(true);
    setTimeout(() => setAddedNotification(false), 2000);
  };

  return (
    <section className="py-section-gap w-full bg-surface text-on-surface border-t border-outline-variant/30 overflow-hidden">
      {/* Contained Layout Wrapper */}
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full flex flex-col items-center">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-headline-sm md:text-headline-md tracking-[0.2em] text-primary uppercase font-light">
            Featured Collection
          </h2>
        </div>

        {/* Carousel Container with Absolute Navigation Side-Buttons */}
        <div className="relative w-full flex items-center justify-center">
          {/* Left Navigation Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-0 md:left-4 z-40 bg-surface/90 hover:bg-primary hover:text-on-primary text-primary w-11 h-11 rounded-full border border-outline/20 flex items-center justify-center transition-all shadow-sm active:scale-95 hover:scale-105"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Swipeable Coverflow Slide Wrapper */}
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="relative w-full flex items-center justify-center touch-pan-y overflow-visible"
            style={{ height: `${cardHeight + 40}px` }}
          >
            <div className="relative flex items-center justify-center w-full h-full">
              {featuredItems.map((item, idx) => {
                const diff = getCircularDiff(idx, activeIndex, featuredItems.length);
                const absDiff = Math.abs(diff);

                const isCenter = idx === activeIndex;
                const isVisible = absDiff <= maxVisible;

                // Production-grade fixed opacity & scale falloff logic
                let opacity = 0;
                let scale = 0.8;

                if (absDiff === 0) {
                  opacity = 1.0;
                  scale = 1.0;
                } else if (absDiff === 1 && isVisible) {
                  opacity = 0.60;
                  scale = 0.90;
                } else if (absDiff === 2 && isVisible) {
                  opacity = 0.30;
                  scale = 0.80;
                } else {
                  opacity = 0.0;
                  scale = 0.70;
                }

                const rotateY = diff * -15;
                const translate = diff * offset;
                const zIndex = 50 - absDiff;

                return (
                  <motion.div
                    key={item.id}
                    onClick={() => {
                      if (!isCenter) setActiveIndex(idx);
                    }}
                    className="absolute rounded-2xl bg-card-bg shadow-elevate overflow-visible select-none"
                    style={{
                      width: `${cardWidth}px`,
                      height: `${cardHeight}px`,
                      zIndex: zIndex,
                      transformOrigin: "center center",
                      pointerEvents: isVisible ? "auto" : "none",
                    }}
                    animate={{
                      x: translate,
                      scale: scale,
                      opacity: opacity,
                      rotateY: rotateY,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 170,
                      damping: 20,
                    }}
                  >
                    {/* Card Media content */}
                    <div className="w-full h-full rounded-2xl overflow-hidden relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover pointer-events-none select-none"
                        draggable={false}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                    </div>

                    {/* Active Card Interactive details overlay */}
                    <AnimatePresence>
                      {isCenter && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="absolute inset-0 pointer-events-none z-20"
                        >
                          {/* Top-Left Tag Pill */}
                          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-primary text-[9px] md:text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm pointer-events-auto">
                            {item.tag}
                          </div>

                          {/* Top-Right Category Vertical Text */}
                          <div
                            className="absolute top-4 right-4 text-[8px] md:text-[9px] uppercase tracking-[0.25em] text-on-surface-variant/80 font-bold whitespace-nowrap"
                            style={{
                              writingMode: "vertical-rl",
                              textOrientation: "mixed",
                            }}
                          >
                            {item.category}
                          </div>

                          {/* Center-Right Title Vertical Text */}
                          <div
                            className="absolute top-1/2 -translate-y-1/2 right-4 text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-primary font-bold whitespace-nowrap"
                            style={{
                              writingMode: "vertical-rl",
                              textOrientation: "mixed",
                            }}
                          >
                            {item.title}
                          </div>

                          {/* Bottom-Right Price Badge */}
                          <div className="absolute bottom-4 right-4 bg-white text-primary text-[9px] md:text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg border border-outline-variant/10 flex flex-col items-end leading-none pointer-events-auto">
                            <span className="text-on-surface-variant font-normal normal-case text-[7px] md:text-[8px] mb-1">
                              Starts From
                            </span>
                            <span className="font-semibold tracking-wide">
                              {item.price}
                            </span>
                          </div>

                          {/* Bottom-Center Try-on action hanger button */}
                          <button
                            onClick={(e) => handleActionClick(e, item)}
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-[#1c1b1b] text-white p-3 md:p-3.5 rounded-full hover:bg-primary transition-all duration-300 shadow-xl hover:scale-110 flex items-center justify-center border border-white/10 z-30 pointer-events-auto active:scale-95"
                            aria-label="Add item to bag"
                            title="Add outfit to bag"
                          >
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a3 3 0 00-3 3h6a3 3 0 00-3-3zm0 3v2m0 0L3 17.5a1.5 1.5 0 00.75 2.5h16.5a1.5 1.5 0 00.75-2.5L12 8z" />
                            </svg>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Navigation Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-0 md:right-4 z-40 bg-surface/90 hover:bg-primary hover:text-on-primary text-primary w-11 h-11 rounded-full border border-outline/20 flex items-center justify-center transition-all shadow-sm active:scale-95 hover:scale-105"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Floating Success Alert Toast */}
      <AnimatePresence>
        {addedNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-primary text-on-primary font-label-md px-6 py-3 rounded-full shadow-2xl z-50 uppercase tracking-widest text-[10px]"
          >
            Outfit added to bag
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
