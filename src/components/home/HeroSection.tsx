"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll tracking for parallax effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Background image parallax shift (0 to 40px)
  const yTransform = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const y = shouldReduceMotion ? 0 : yTransform;

  // Animation values respecting prefers-reduced-motion
  const initialImage = shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 1.05, opacity: 0 };
  const animateImage = { scale: 1, opacity: 1 };
  const transitionImage = shouldReduceMotion ? { duration: 0 } : { duration: 1.2, ease: "easeOut" as const };

  const initialWordmark = shouldReduceMotion ? { y: 0, opacity: 0.12 } : { y: 25, opacity: 0 };
  const animateWordmark = { y: 0, opacity: 0.12 }; // Low opacity white overlay
  const transitionWordmark = shouldReduceMotion ? { duration: 0 } : { duration: 0.8, ease: "easeOut" as const, delay: 0.25 };

  const initialCard = shouldReduceMotion ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 };
  const animateCard = { y: 0, opacity: 1 };
  const transitionCard = shouldReduceMotion ? { duration: 0 } : { duration: 0.8, ease: "easeOut" as const, delay: 0.65 };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[70vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden bg-background pt-24"
    >
      {/* Background Image Container */}
      <motion.div
        style={{ y }}
        initial={initialImage}
        animate={animateImage}
        transition={transitionImage}
        className="absolute inset-0 z-0 w-full h-full"
      >
        <Image
          src="/assets/hero.png"
          alt="Oxivos Fashion male model in technical black blazer set against a misty alpine mountain landscape."
          fill
          priority
          sizes="100vw"
          className="object-cover object-center md:object-[center_top] select-none pointer-events-none"
        />
        {/* Soft bottom-heavy dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent z-10" />
      </motion.div>

      {/* Massive Brand Wordmark behind the subject overlay */}
      <motion.div
        initial={initialWordmark}
        animate={animateWordmark}
        transition={transitionWordmark}
        className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none select-none overflow-hidden"
      >
        <h1 className="text-display-xl-mobile md:text-display-xl leading-none text-white tracking-tighter mix-blend-overlay font-black uppercase text-[15vw]">
          Oxivos
        </h1>
      </motion.div>

      {/* Glass CTA Card */}
      <div className="relative z-20 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex justify-center mt-auto mb-unit-xl">
        <motion.div
          initial={initialCard}
          animate={animateCard}
          transition={transitionCard}
          className="bg-surface/70 backdrop-blur-xl p-unit-md md:p-unit-lg rounded-DEFAULT border border-white/30 shadow-elevate max-w-xl w-full text-center"
        >
          <h2 className="text-headline-sm md:text-headline-md text-primary mb-2 uppercase font-black tracking-tight leading-tight">
            Inspired by nature. Designed for movement.
          </h2>
          <p className="text-body-md text-on-surface-variant mb-unit-md font-sans">
            Style that rises above the ordinary. Engineered for technical refinement and aesthetic restraint.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-unit-md">
            <Link href="/products" passHref legacyBehavior>
              <Button
                variant="default"
                size="lg"
                className="w-full sm:w-auto uppercase tracking-wider font-semibold h-11"
              >
                Explore Collection
              </Button>
            </Link>
            <Link href="/products" passHref legacyBehavior>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto uppercase tracking-wider font-semibold h-11"
              >
                Shop Now
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
