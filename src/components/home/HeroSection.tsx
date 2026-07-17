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
  edition: string;
  city: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1687103445012-083ef9ab6d80?q=80&w=1600&auto=format&fit=crop",
    headline: "NOIR ATELIER",
    subtext: "Where shadow meets silhouette — a study in architectural precision.",
    edition: "EDITION — 01",
    city: "Paris",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1624918215128-0f813a760633?q=80&w=1600&auto=format&fit=crop",
    headline: "ELEVATED CODES",
    subtext: "Technical fabrics engineered for effortless modern movement.",
    edition: "EDITION — 02",
    city: "Milan",
  },
  {
    id: 3,
    image: "https://plus.unsplash.com/premium_photo-1707932476876-85c87378ea62?q=80&w=1600&auto=format&fit=crop",
    headline: "TRANSIT LAYERS",
    subtext: "A curated edit of refined silhouettes, built for transitional climates.",
    edition: "EDITION — 03",
    city: "Tokyo",
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
      {/* Top Header Bar inside Hero */}
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-30 text-white pointer-events-none">
        <span className="font-mono text-[10px] tracking-widest uppercase opacity-70">
          {activeSlide.edition}
        </span>
        <span className="font-sans text-label-md tracking-[0.25em] font-bold uppercase">
          OxivosFashion
        </span>
        <div className="hidden md:flex space-x-6 text-[10px] tracking-widest uppercase font-semibold pointer-events-auto">
          <Link href="/products" className="hover:opacity-70 transition-opacity">Collections</Link>
          <Link href="/products" className="hover:opacity-70 transition-opacity">Lookbook</Link>
        </div>
      </div>

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

      {/* Center Text Block (Animated Reveal) */}
      <div className="relative z-20 max-w-container-max w-full mx-auto px-margin-mobile md:px-margin-desktop flex justify-center text-center mt-auto mb-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -15 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="max-w-2xl flex flex-col items-center px-4 md:px-0"
          >
            <motion.span
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 0.9, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-label-sm uppercase tracking-[0.25em] text-white mb-4"
            >
              — The Collection —
            </motion.span>
            
            <motion.h1
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.5 }}
              className="font-heading text-headline-lg-mobile md:text-display-xl text-white uppercase tracking-tight mb-4 leading-[1.1] md:leading-none"
            >
              {activeSlide.headline}
            </motion.h1>
            
            <motion.p
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 0.8, y: 0 }}
              transition={{ delay: 0.26, duration: 0.5 }}
              className="text-body-md text-white/80 mb-8 max-w-lg leading-relaxed whitespace-nowrap overflow-hidden text-ellipsis w-full block"
            >
              {activeSlide.subtext}
            </motion.p>
            
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.34, duration: 0.5 }}
            >
              <Link href="/products" passHref legacyBehavior>
                <Button
                  variant="default"
                  size="lg"
                  className="uppercase tracking-widest font-semibold h-12 px-8 flex items-center gap-2 group/btn transition-transform duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
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
