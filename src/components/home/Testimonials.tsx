"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  avatarImage: string;
  headline: string;
  quote: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Nadia Rahman",
    role: "Verified Buyer, Dhaka",
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80&auto=format&fit=crop",
    avatarImage:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=120&q=80&auto=format&fit=crop",
    headline: "A silhouette that actually fits the way I move.",
    quote:
      "I've worn a lot of elevated basics, but nothing has come close to how these pieces sit on the body. The Oxford shirt in Obsidian — the drape is precise without being stiff. I wore it for a full twelve-hour day in Dhaka traffic and meetings, and it still looked composed. The stitching at the collar is immaculate. Packaging was clean, delivery arrived ahead of the estimated date. I'll be ordering the linen version next.",
    rating: 5,
  },
  {
    id: 2,
    name: "Arif Chowdhury",
    role: "Verified Buyer, Chittagong",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&auto=format&fit=crop",
    avatarImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80&auto=format&fit=crop",
    headline: "Exactly what the product page promised — no surprises.",
    quote:
      "Too many brands photograph fabric under perfect studio light and then ship you something that feels off. Not here. The Slim Suit in Charcoal looks exactly as it does in the images — the texture is subtle, the lining is breathable, and the shoulders don't need a tailor's adjustment out of the box. I wore it to a corporate function and received multiple compliments on the cut. My only note: the trouser waistband could have an extra button option at the half-inch. Minor thing.",
    rating: 5,
  },
  {
    id: 3,
    name: "Mehreen Sultana",
    role: "Verified Buyer, Sylhet",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80&auto=format&fit=crop",
    avatarImage:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&q=80&auto=format&fit=crop",
    headline: "Understated, precise, and built to last more than a season.",
    quote:
      "What I appreciate most is the restraint in the design. No unnecessary hardware, no trend-chasing embellishments — just a very clean silhouette in a fabric that photographs beautifully and holds its structure through washing. I ordered the Minimalist Coat in Sand and wore it through three weeks of travel. It packed well, released wrinkles quickly with steam, and the zipper glide stayed smooth. This is the kind of piece you keep for years.",
    rating: 5,
  },
  {
    id: 4,
    name: "Tariq Hossain",
    role: "Verified Buyer, Rajshahi",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80&auto=format&fit=crop",
    avatarImage:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80&auto=format&fit=crop",
    headline: "Worth every taka — the quality speaks before I do.",
    quote:
      "I was skeptical ordering a suit online at this price point. The size guide was accurate — I measured exactly as instructed and my order fit without alteration. The jacket construction is structured but not rigid, with a clean roll on the lapel. Fabric is mid-weight, appropriate for both air-conditioned interiors and outdoor events. Delivery was discreet — the garment arrived pressed inside a protective outer bag. Customer service responded within a couple of hours when I had a sizing question before purchase.",
    rating: 4,
  },
];

// ─── StarRating ──────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="w-4 h-4"
          style={{
            fill: i < rating ? "#000000" : "none",
            color: i < rating ? "#000000" : "#c4c7c7",
            strokeWidth: 1.5,
          }}
        />
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = testimonials[activeIndex];

  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto border-t border-outline-variant/30">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-unit-xl md:gap-16 items-start">

        {/* ── Left Column ────────────────────────────────────── */}
        <div className="flex flex-col">
          {/* Eyebrow */}
          <span className="text-label-md font-bold uppercase tracking-widest text-secondary block mb-4">
            Testimonials
          </span>

          {/* Section Headline */}
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary tracking-tight leading-tight mb-unit-lg">
            Words from those<br />who&apos;ve worn it.
          </h2>

          {/* Active Portrait Image */}
          <div className="relative w-full aspect-[4/5] rounded overflow-hidden mb-unit-md">
            <AnimatePresence mode="wait">
              <motion.img
                key={active.id}
                src={active.image}
                alt={active.name}
                className="absolute inset-0 w-full h-full object-cover grayscale"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              />
            </AnimatePresence>
          </div>

          {/* Thumbnail Strip */}
          <div className="flex flex-row gap-3 mb-unit-md flex-wrap">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setActiveIndex(i)}
                className="relative flex-shrink-0 transition-transform duration-300 focus:outline-none"
                style={{
                  transform: i === activeIndex ? "scale(1.1)" : "scale(1)",
                }}
                aria-label={`View testimonial from ${t.name}`}
              >
                <div
                  className="w-12 h-12 md:w-14 md:h-14 rounded overflow-hidden"
                  style={{
                    outline:
                      i === activeIndex
                        ? "2px solid #000000"
                        : "2px solid transparent",
                    outlineOffset: "2px",
                    transition: "outline 0.25s ease",
                  }}
                >
                  <img
                    src={t.avatarImage}
                    alt={t.name}
                    className="w-full h-full object-cover"
                    style={{
                      filter: i === activeIndex ? "none" : "grayscale(80%) opacity(0.6)",
                      transition: "filter 0.25s ease",
                    }}
                  />
                </div>
              </button>
            ))}
          </div>

          {/* Active Reviewer Info */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`info-${active.id}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <p className="text-label-md font-bold text-primary">{active.name}</p>
              <p className="text-label-sm text-on-surface-variant">{active.role}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Right Column ───────────────────────────────────── */}
        <div className="flex flex-col justify-center md:pt-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${active.id}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col gap-unit-md"
            >
              {/* Star Rating */}
              <StarRating rating={active.rating} />

              {/* Testimonial Headline */}
              <h3 className="font-headline-sm text-headline-sm text-primary">
                &ldquo;{active.headline}&rdquo;
              </h3>

              {/* Full Quote */}
              <blockquote className="text-body-lg text-on-surface-variant leading-relaxed border-l-2 border-outline-variant pl-unit-md">
                {active.quote}
              </blockquote>

              {/* Reviewer Attribution */}
              <div className="flex items-center gap-3 pt-2">
                <div className="w-8 h-px bg-primary" />
                <span className="text-label-sm uppercase tracking-widest text-primary font-semibold">
                  {active.name}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
