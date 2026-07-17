"use client";

import React, { useState, useEffect, useRef } from "react";
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
  lookLabel: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    image: "/assets/hero.png",
    headline: "NOIR ATELIER",
    subtext: "Where shadow meets silhouette — a study in architectural precision.",
    edition: "EDITION — 01",
    city: "Presented in Paris Fashion",
    lookLabel: "Look 01 / 03",
  },
  {
    id: 2,
    image: "/assets/suit1.png",
    headline: "ELEVATED CODES",
    subtext: "Technical fabrics engineered for effortless modern movement.",
    edition: "EDITION — 02",
    city: "Presented in Milan Fashion",
    lookLabel: "Look 02 / 03",
  },
  {
    id: 3,
    image: "/assets/suit2.png",
    headline: "TRANSIT LAYERS",
    subtext: "A curated edit of refined silhouettes, built for transitional climates.",
    edition: "EDITION — 03",
    city: "Presented in Tokyo Fashion",
    lookLabel: "Look 03 / 03",
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export const HeroSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const activeSlide = heroSlides[activeIndex];
  const nextIndex = (activeIndex + 1) % heroSlides.length;
  const nextSlide = heroSlides[nextIndex];

  // Touch handlers for mobile swipe-to-advance gestures
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % heroSlides.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  // Auto-play timer (pauses on hover or manual gesture, disabled if user prefers reduced motion)
  useEffect(() => {
    if (shouldReduceMotion || isHovered) return;

    const timer = setInterval(() => {
      handleNext();
    }, 6000);

    return () => clearInterval(timer);
  }, [activeIndex, isHovered, shouldReduceMotion]);

  // Touch event callbacks for swipe detection
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
      className="relative w-full h-[90vh] md:h-screen bg-surface-container-low p-2 sm:p-3 md:p-6 flex select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Matte Photo Frame/Border */}
      <div 
        className="relative w-full h-full border border-outline/15 rounded overflow-hidden flex flex-col justify-center bg-black"
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
            ELEVATE
          </span>
          <div className="hidden md:flex space-x-6 text-[10px] tracking-widest uppercase font-semibold pointer-events-auto">
            <Link href="/products" className="hover:opacity-70 transition-opacity">Collections</Link>
            <Link href="/products" className="hover:opacity-70 transition-opacity">Lookbook</Link>
          </div>
        </div>

        {/* Carousel Background Images (Crossfade Transition) */}
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
              <Image
                src={activeSlide.image}
                alt={activeSlide.headline}
                fill
                priority={activeSlide.id === 1}
                sizes="100vw"
                className="object-cover object-center select-none pointer-events-none"
              />
              {/* Soft bottom-heavy dark overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Preload next slide to avoid pops */}
        <div className="hidden">
          <img src={nextSlide.image} alt="preload next slide" />
        </div>

        {/* Center Text Block (Animated Reveal) */}
        <div className="relative z-20 max-w-container-max w-full mx-auto px-margin-mobile md:px-margin-desktop flex justify-center text-center mt-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-2xl flex flex-col items-center"
            >
              <span className="text-label-sm uppercase tracking-[0.2em] text-white/70 mb-4 flex items-center gap-3">
                <span className="w-6 h-px bg-white/40" />
                The Collection
                <span className="w-6 h-px bg-white/40" />
              </span>
              <h1 className="font-heading text-headline-lg-mobile md:text-display-xl text-white uppercase tracking-tight mb-4 leading-[1.1] md:leading-none">
                {activeSlide.headline}
              </h1>
              <p className="text-body-md text-white/80 mb-8 max-w-lg leading-relaxed">
                {activeSlide.subtext}
              </p>
              
              <Link href="/products" passHref legacyBehavior>
                <Button
                  variant="default"
                  size="lg"
                  className="uppercase tracking-widest font-semibold h-12 px-8 flex items-center gap-2 group/btn"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Left Corner: Edition & City Info */}
        <div className="absolute bottom-8 left-8 z-20 hidden md:flex flex-col text-left text-white/80 pointer-events-none">
          <span className="font-mono text-xs tracking-widest uppercase">
            {activeSlide.edition}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-white/50 mt-1 font-semibold">
            {activeSlide.city}
          </span>
        </div>

        {/* Bottom Center: Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-white/40 pointer-events-none">
          <span className="text-[9px] tracking-[0.25em] uppercase mb-1.5 font-bold">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-0.5 h-6 bg-white/30"
          />
        </div>

        {/* Bottom Right Corner: Clickable Thumbnail Preview of Next Slide */}
        <button
          onClick={handleNext}
          className="absolute bottom-8 right-8 z-20 hidden md:flex flex-col items-end group focus:outline-none"
          aria-label={`Go to next look: ${nextSlide.headline}`}
        >
          <div className="relative w-20 h-24 rounded border border-white/20 overflow-hidden shadow-2xl transition-transform duration-300 group-hover:scale-105">
            <Image
              src={nextSlide.image}
              alt={`Next: ${nextSlide.headline}`}
              fill
              sizes="80px"
              className="object-cover object-center grayscale"
            />
            <div className="absolute inset-0 bg-black/25 group-hover:bg-black/0 transition-colors duration-300" />
          </div>
          <span className="text-[9px] tracking-widest uppercase text-white/70 mt-2 font-mono font-bold">
            {nextSlide.lookLabel} →
          </span>
        </button>

        {/* Mobile Dot Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex md:hidden gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                index === activeIndex ? "bg-white w-4" : "bg-white/40"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
