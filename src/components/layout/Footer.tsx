"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const Footer: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setName("");
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="w-full bg-surface-container-lowest py-16 md:py-24 mt-auto transition-all duration-200 border-t border-outline-variant/30">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto flex flex-col">

        {/* Top Row: Tagline + Form & Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-gutter items-start">

          {/* Left Column: Brand Tagline Statement */}
          <div className="md:col-span-6 flex flex-col gap-6 max-w-md">
            <h3 className="font-heading text-headline-sm text-primary uppercase font-bold tracking-tight">
              Oxivos Fashion
            </h3>
            <p className="font-sans text-body-lg text-on-surface-variant leading-relaxed">
              Every stitch has intent — discipline, craft, and quiet elevation. Designed at the intersection of technical performance and refined tailoring.
            </p>

            {/* Newsletter Mini-Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-sm mt-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] tracking-widest uppercase text-on-surface-variant/70 font-bold">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-transparent border-b border-dashed border-outline-variant/70 py-1.5 focus:border-solid focus:border-primary focus:outline-none transition-all text-primary font-sans text-body-md placeholder:text-on-surface-variant/30"
                  placeholder="Your name"
                />
              </div>

              <div className="flex flex-col gap-1 relative">
                <label className="text-[10px] tracking-widest uppercase text-on-surface-variant/70 font-bold">
                  Email
                </label>
                <div className="flex items-center">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-transparent border-b border-dashed border-outline-variant/70 py-1.5 focus:border-solid focus:border-primary focus:outline-none transition-all text-primary font-sans text-body-md placeholder:text-on-surface-variant/30 w-full pr-10"
                    placeholder="Your email address"
                  />
                  <button
                    type="submit"
                    className="absolute right-0 bottom-2 text-primary hover:opacity-75 transition-opacity duration-200"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {subscribed && (
                <p className="text-label-sm text-secondary uppercase font-bold animate-pulse">
                  Thank you for subscribing.
                </p>
              )}
            </form>
          </div>

          {/* Right Column: Nav Links & Social links */}
          <div className="md:col-span-6 flex flex-row gap-16 md:gap-24 md:justify-end mt-4 md:mt-0">

            {/* Quick Links Menu */}
            <div className="flex flex-col gap-4">
              <span className="text-[10px] tracking-[0.2em] uppercase text-on-surface-variant/60 font-bold">
                Explore
              </span>
              <div className="flex flex-col gap-2">
                <Link
                  href="/products"
                  className="text-label-md uppercase tracking-wider text-primary hover:underline decoration-1 underline-offset-4 transition-all"
                >
                  Shop
                </Link>
                <Link
                  href="/cart"
                  className="text-label-md uppercase tracking-wider text-primary hover:underline decoration-1 underline-offset-4 transition-all"
                >
                  Track Order
                </Link>
                <Link
                  href="#"
                  className="text-label-md uppercase tracking-wider text-primary hover:underline decoration-1 underline-offset-4 transition-all"
                >
                  Support
                </Link>
                <Link
                  href="#"
                  className="text-label-md uppercase tracking-wider text-primary hover:underline decoration-1 underline-offset-4 transition-all"
                >
                  About
                </Link>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-col gap-4">
              <span className="text-[10px] tracking-[0.2em] uppercase text-on-surface-variant/60 font-bold">
                Social
              </span>
              <div className="flex flex-col gap-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-label-md uppercase tracking-wider text-primary hover:underline decoration-1 underline-offset-4 transition-all"
                >
                  Instagram
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-label-md uppercase tracking-wider text-primary hover:underline decoration-1 underline-offset-4 transition-all"
                >
                  Facebook
                </a>
                <a
                  href="https://whatsapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-label-md uppercase tracking-wider text-primary hover:underline decoration-1 underline-offset-4 transition-all"
                >
                  WhatsApp
                </a>
                <a
                  href="mailto:support@oxivosfashion.com"
                  className="text-label-md uppercase tracking-wider text-primary hover:underline decoration-1 underline-offset-4 transition-all"
                >
                  Email
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Divider line */}
        <hr className="border-outline-variant/30 w-full my-12" />

        {/* Bottom Row: Massive Wordmark & Details */}
        <div className="relative flex flex-col w-full overflow-hidden select-none pb-4">

          {/* Top Tagline positioned above wordmark on desktop, below on mobile */}
          <div className="mb-4 md:mb-0 md:absolute md:top-2 md:right-0 text-left md:text-right z-10">
            <span className="text-label-sm uppercase tracking-widest text-on-surface-variant font-bold">
              Design, Product & Craft
            </span>
          </div>

          {/* Wordmark with Accent dot */}
          <div className="relative w-full flex items-end pt-8 md:pt-12">
            {/* Small red/accent dot above first letter 'O' */}
            <div className="absolute left-[3px] top-3.5 md:top-4 w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-[#ba1a1a]" />

             <motion.h2
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="font-heading font-extrabold uppercase text-primary leading-none w-full whitespace-nowrap"
              style={{
                fontSize: "clamp(1.8rem, 7.8vw, 6.2rem)",
                letterSpacing: "-0.04em",
              }}
            >
              Oxivos Fashion
            </motion.h2>
          </div>
        </div>

        {/* Final Bar: Copyright & Terms */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6 pt-6 border-t border-outline-variant/20 text-label-sm text-on-surface-variant">
          <p>© 2026 OxivosFashion. All rights reserved.</p>
          <div className="flex gap-6 text-label-sm">
            <a href="#" className="hover:text-primary transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors duration-200">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
