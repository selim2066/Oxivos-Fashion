"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    productId: 3, // Maps to Horizon Knit Tee or similar mock category
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
    id: 4, // Center item
    image: "/assets/suit4.png",
    tag: "Try on",
    category: "Featured Collection",
    title: "Guest Formal Edition",
    price: "120.20 USD",
    productId: 12, // Alpine Ridge Boots/Tuxedo context
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

export const FeaturedCollection: React.FC = () => {
  const { addItem } = useCart();
  const [activeIndex, setActiveIndex] = useState(3); // Center item default (id 4)
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

  // Layout parameters based on breakpoints
  const offset = isMobile ? 65 : isTablet ? 110 : 160;
  const cardWidth = isMobile ? 180 : isTablet ? 240 : 310;
  const cardHeight = isMobile ? 240 : isTablet ? 320 : 410;

  const handleActionClick = (e: React.MouseEvent, item: FeaturedItem) => {
    e.stopPropagation(); // Avoid shifting center on icon click
    const productMatch = products.find((p) => p.id === item.productId) || products[0];
    addItem(productMatch, productMatch.colors[0], productMatch.sizes[0] || "M", 1);
    setAddedNotification(true);
    setTimeout(() => setAddedNotification(false), 2000);
  };

  return (
    <section className="py-section-gap bg-surface text-on-surface overflow-hidden relative w-full flex flex-col items-center">
      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="font-serif text-headline-sm md:text-headline-md tracking-[0.2em] text-primary uppercase font-light">
          Featured Collection
        </h2>
      </div>

      {/* Coverflow Carousel Area */}
      <div 
        className="relative w-full flex items-center justify-center"
        style={{ height: `${cardHeight + 60}px` }}
      >
        <div className="relative flex items-center justify-center w-full max-w-7xl h-full">
          {featuredItems.map((item, idx) => {
            const diff = idx - activeIndex;
            const isCenter = idx === activeIndex;

            // Calculations for Coverflow 3D effect
            const rotateY = diff * -15; 
            const translate = diff * offset;
            const scale = 1 - Math.abs(diff) * (isMobile ? 0.08 : 0.06);
            const opacity = isCenter ? 1 : Math.max(0.4, 0.95 - Math.abs(diff) * 0.15);
            const zIndex = 50 - Math.abs(diff);

            return (
              <motion.div
                key={item.id}
                onClick={() => setActiveIndex(idx)}
                className={`absolute cursor-pointer rounded-2xl bg-card-bg overflow-visible select-none shadow-elevate`}
                style={{
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  zIndex: zIndex,
                  transformOrigin: "center center",
                }}
                animate={{
                  x: translate,
                  scale: scale,
                  opacity: opacity,
                  rotateY: rotateY,
                }}
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 18,
                }}
              >
                {/* Image */}
                <div className="w-full h-full rounded-2xl overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover pointer-events-none select-none"
                    draggable={false}
                  />
                  
                  {/* Subtle vignette shadow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Center Item Overlays (Try on badge, vertical text, price, action button) */}
                <AnimatePresence>
                  {isCenter && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="absolute inset-0 pointer-events-none z-20"
                    >
                      {/* Top-Left Tag Badge */}
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-primary text-[9px] md:text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm pointer-events-auto">
                        {item.tag}
                      </div>

                      {/* Top-Right Vertical Label */}
                      <div 
                        className="absolute top-4 right-4 text-[8px] md:text-[9px] uppercase tracking-[0.25em] text-on-surface-variant/80 font-bold whitespace-nowrap"
                        style={{ 
                          writingMode: "vertical-rl",
                          textOrientation: "mixed"
                        }}
                      >
                        {item.category}
                      </div>

                      {/* Center-Right Vertical Product Title */}
                      <div 
                        className="absolute top-1/2 -translate-y-1/2 right-4 text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-primary font-bold whitespace-nowrap"
                        style={{ 
                          writingMode: "vertical-rl",
                          textOrientation: "mixed"
                        }}
                      >
                        {item.title}
                      </div>

                      {/* Bottom-Right Starts From Price Badge */}
                      <div className="absolute bottom-4 right-4 bg-white text-primary text-[9px] md:text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg border border-outline-variant/10 flex flex-col items-end leading-none pointer-events-auto">
                        <span className="text-on-surface-variant font-normal normal-case text-[7px] md:text-[8px] mb-1">
                          Starts From
                        </span>
                        <span className="font-semibold tracking-wide">
                          {item.price}
                        </span>
                      </div>

                      {/* Bottom-Center Interactive Try On / Shop Hanger Button */}
                      <button
                        onClick={(e) => handleActionClick(e, item)}
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-[#1c1b1b] text-white p-3 md:p-3.5 rounded-full hover:bg-primary transition-all duration-300 shadow-xl hover:scale-110 flex items-center justify-center border border-white/10 z-30 pointer-events-auto active:scale-95"
                        aria-label="Add this outfit to bag"
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
      </div>

      {/* Floating Add to Bag Notification */}
      <AnimatePresence>
        {addedNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 bg-primary text-on-primary font-label-md px-6 py-3 rounded-full shadow-2xl z-50 uppercase tracking-widest text-[10px]"
          >
            Outfit added to bag
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
