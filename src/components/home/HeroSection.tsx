"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
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
    image: "https://images.unsplash.com/photo-1614805104608-6402e52d0dd6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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

  // Touch handlers for mobile swipe gestures
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

  // Timer interval for auto-advance and progress bar tracking
  useEffect(() => {
    if (shouldReduceMotion || isHovered) return;

    const intervalTime = 50; // ms
    const increment = (intervalTime / 6000) * 100; // total 6s duration

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

  // Touch swipe callbacks
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <section
      className="relative w-full h-[90vh] md:h-screen bg-black overflow-hidden flex flex-col justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >

      {/* Carousel Background Images (Crossfade & Ken Burns Zoom) */}
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
              animate={shouldReduceMotion ? { scale: 1 } : { scale: 1.04 }}
              transition={{ duration: 6, ease: "linear" }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={activeSlide.image}
                alt={activeSlide.headline}
                fill
                priority
                sizes="100vw"
                className="object-cover object-top select-none pointer-events-none"
              />
            </motion.div>
            {/* Soft bottom-heavy dark overlay gradient scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent z-10 pointer-events-none" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Preload next slide's image */}
      <div className="hidden">
        <img src={nextSlide.image} alt="preload next look" />
      </div>

      {/* Left-Aligned Editorial Text Block */}
      <div className="relative z-20 w-full mt-auto mb-20 md:mb-24">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-start text-left max-w-xl"
            >
              {/* Overline label */}
              <motion.div
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.45 }}
                className="flex items-center gap-3 mb-5"
              >
                <span className="w-6 h-[2px] bg-white/50 inline-block" />
                <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] text-white/65">
                  The Collection
                </span>
              </motion.div>

              {/* Headline with left maroon accent bar */}
              <div className="flex items-stretch gap-4 mb-5">
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 0.15, duration: 0.4, ease: "easeOut" }}
                  className="w-[3px] rounded-full self-stretch origin-top"
                  style={{ backgroundColor: "#800020" }}
                />
                <motion.h1
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18, duration: 0.5 }}
                  className="font-heading font-black text-white uppercase leading-none"
                  style={{ fontSize: "clamp(2.4rem, 6.5vw, 5.5rem)", letterSpacing: "-0.03em" }}
                >
                  {activeSlide.headline}
                </motion.h1>
              </div>

              {/* Subtext */}
              <motion.p
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 0.75, y: 0 }}
                transition={{ delay: 0.26, duration: 0.5 }}
                className="text-sm md:text-base text-white/75 mb-8 max-w-sm leading-relaxed font-light"
              >
                {activeSlide.subtext}
              </motion.p>

              {/* CTA Row */}
              <motion.div
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34, duration: 0.5 }}
                className="flex items-center gap-5"
              >
                <Link href="/products" passHref legacyBehavior>
                  <Button
                    variant="default"
                    size="lg"
                    className="uppercase tracking-widest font-bold h-11 px-7 flex items-center gap-2 group/btn transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl text-xs"
                  >
                    <span>Explore Collection</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link
                  href="/products"
                  className="text-[11px] uppercase tracking-widest text-white/55 hover:text-white transition-colors duration-300 font-semibold border-b border-white/20 hover:border-white/60 pb-0.5"
                >
                  View All
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Center: Thin Horizontal Progress Bar Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3 w-full max-w-[280px] px-margin-mobile sm:px-0">
        {heroSlides.map((_, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={index}
              onClick={() => handleSelectSlide(index)}
              className="relative flex-grow h-[3px] bg-white/20 overflow-hidden focus:outline-none transition-opacity duration-300 rounded"
              style={{ opacity: isActive ? 1 : 0.4 }}
              aria-label={`Go to slide ${index + 1}`}
            >
              <div
                className="h-full bg-white origin-left"
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
