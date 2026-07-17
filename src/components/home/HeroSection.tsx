"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// ─── Slide Data ──────────────────────────────────────────────────────────────

interface HeroSlide {
  id: number;
  image: string;
  headline: string;
  subtext: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1687103445012-083ef9ab6d80?q=80&w=1600&auto=format&fit=crop",
    headline: "NOIR ATELIER",
    subtext: "Where shadow meets silhouette — a study in architectural precision.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1648598029533-c5c9ba79ab26?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    headline: "ELEVATED CODES",
    subtext: "Technical fabrics engineered for effortless modern movement.",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1718351041906-d1086f502f8a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    headline: "TRANSIT LAYERS",
    subtext: "A curated edit of refined silhouettes, built for transitional climates.",
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export const HeroSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const activeSlide = heroSlides[activeIndex];
  const nextIndex = (activeIndex + 1) % heroSlides.length;
  const nextSlide = heroSlides[nextIndex];

  // Touch swipe state
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % heroSlides.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setProgress(0);
  };

  const handleSelectSlide = (index: number) => {
    setActiveIndex(index);
    setProgress(0);
  };

  // Auto-advance timer
  useEffect(() => {
    if (shouldReduceMotion || isHovered) return;

    const intervalTime = 50;
    const increment = (intervalTime / 6000) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [activeIndex, isHovered, shouldReduceMotion]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) handleNext();
    else if (distance < -minSwipeDistance) handlePrev();
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <section
      className="relative w-full bg-black overflow-hidden flex flex-col"
      style={{ height: "calc(100svh - 0px)" }}  /* use svh for true mobile viewport */
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >

      {/* ─── Background Image Carousel ────────────────────────────────────── */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <motion.div
              initial={{ scale: 1 }}
              animate={shouldReduceMotion ? { scale: 1 } : { scale: 1.05 }}
              transition={{ duration: 6, ease: "linear" }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={activeSlide.image}
                alt={activeSlide.headline}
                fill
                priority
                sizes="100vw"
                className="object-cover object-center sm:object-top select-none pointer-events-none"
              />
            </motion.div>

            {/* Gradient scrim — heavier from bottom on mobile for text legibility */}
            <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-black/80 via-black/30 to-black/10 sm:from-black/70 sm:via-black/20 sm:to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Preload next slide */}
      <div className="hidden">
        <img src={nextSlide.image} alt="preload" />
      </div>

      {/* ─── Left-Aligned Editorial Text Block ────────────────────────────── */}
      <div className="relative z-20 w-full mt-auto pb-20 sm:pb-24 md:pb-28">
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-6 md:px-8 lg:px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 16 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-start text-left max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl"
            >

              {/* Overline */}
              <motion.div
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06, duration: 0.4 }}
                className="flex items-center gap-2.5 mb-3 sm:mb-4 md:mb-5"
              >
                <span className="w-5 sm:w-6 h-[2px] bg-white/50" />
                <span className="text-[9px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-white/60">
                  The Collection
                </span>
              </motion.div>

              {/* Headline with maroon accent bar */}
              <div className="flex items-stretch gap-2.5 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-5">
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 0.12, duration: 0.35, ease: "easeOut" }}
                  className="w-[2.5px] sm:w-[3px] rounded-full self-stretch origin-top flex-shrink-0"
                  style={{ backgroundColor: "#800020" }}
                />
                <motion.h1
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.45 }}
                  className="font-heading font-black text-white uppercase leading-[0.95]"
                  style={{
                    fontSize: "clamp(2rem, 8vw, 5.5rem)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {activeSlide.headline}
                </motion.h1>
              </div>

              {/* Subtext */}
              <motion.p
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
                animate={{ opacity: 0.75, y: 0 }}
                transition={{ delay: 0.24, duration: 0.45 }}
                className="text-xs sm:text-sm md:text-base text-white/70 mb-5 sm:mb-6 md:mb-8 max-w-[260px] sm:max-w-xs md:max-w-sm leading-relaxed font-light"
              >
                {activeSlide.subtext}
              </motion.p>

              {/* CTA Row */}
              <motion.div
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.45 }}
                className="flex items-center gap-3 sm:gap-4 md:gap-5 flex-wrap"
              >
                <Link
                  href="/products"
                  className={buttonVariants({
                    variant: "default",
                    size: "lg",
                    className:
                      "uppercase tracking-widest font-bold h-10 sm:h-11 px-5 sm:px-7 inline-flex items-center gap-2 group/btn transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl text-[10px] sm:text-xs",
                  })}
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/products"
                  className="text-[10px] sm:text-[11px] uppercase tracking-widest text-white/50 hover:text-white transition-colors duration-300 font-semibold border-b border-white/20 hover:border-white/60 pb-0.5"
                >
                  View All
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ─── Progress Indicators ──────────────────────────────────────────── */}
      <div className="absolute bottom-6 sm:bottom-8 left-5 sm:left-1/2 sm:-translate-x-1/2 z-20 flex gap-2 sm:gap-3 w-auto sm:w-full sm:max-w-[280px]">
        {heroSlides.map((_, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={index}
              onClick={() => handleSelectSlide(index)}
              className={`relative overflow-hidden focus:outline-none transition-all duration-300 rounded-full ${
                isActive
                  ? "w-10 sm:w-auto sm:flex-grow h-[3px]"
                  : "w-6 sm:w-auto sm:flex-grow h-[3px] opacity-40 hover:opacity-60"
              }`}
              style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={isActive ? "true" : undefined}
            >
              <div
                className="h-full bg-white origin-left rounded-full"
                style={{
                  width: `${isActive ? progress : 0}%`,
                  transition: isActive ? "none" : "width 0.3s ease",
                }}
              />
            </button>
          );
        })}
      </div>
    </section>
  );
};
