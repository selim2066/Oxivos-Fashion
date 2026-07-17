"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="w-full border-t border-outline-variant bg-surface-container-lowest py-section-gap mt-auto transition-all duration-200">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {/* Brand & Description */}
        <div className="col-span-1 md:col-span-2">
          <span className="font-display-xl-mobile text-headline-md font-black tracking-tighter text-primary block mb-unit-md">
            OXIVOS FASHION
          </span>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
            Premium technical apparel designed for the intersection of high fashion and the natural world. Inspired by nature, engineered for movement.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-unit-md mt-6 md:mt-0">
          <h4 className="font-label-md text-label-md text-primary uppercase tracking-wider">Explore</h4>
          <div className="flex flex-col gap-unit-sm">
            <Link
              href="/products"
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary hover:underline decoration-1 underline-offset-4 transition-all"
            >
              Shop All
            </Link>
            <Link
              href="/products?category=Men"
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary hover:underline decoration-1 underline-offset-4 transition-all"
            >
              Men&apos;s Apparel
            </Link>
            <Link
              href="/products?category=Women"
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary hover:underline decoration-1 underline-offset-4 transition-all"
            >
              Women&apos;s Apparel
            </Link>
            <Link
              href="/products?category=Kids"
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary hover:underline decoration-1 underline-offset-4 transition-all"
            >
              Kids&apos; Apparel
            </Link>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="flex flex-col gap-unit-md mt-6 md:mt-0">
          <h4 className="font-label-md text-label-md text-primary uppercase tracking-wider">Newsletter</h4>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Subscribe to receive updates on collections and editorial journals.
          </p>
          {subscribed ? (
            <p className="text-label-sm text-secondary uppercase font-semibold animate-pulse">
              Thank you for subscribing.
            </p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex border-b border-outline-variant pb-2 focus-within:border-primary transition-colors">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="bg-transparent border-none outline-none flex-grow font-body-md text-body-md p-0 focus:ring-0 placeholder:text-on-surface-variant/40 text-primary"
              />
              <button
                type="submit"
                className="text-primary hover:opacity-70 transition-opacity p-1"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          )}
        </div>

        {/* Copyright */}
        <div className="col-span-1 md:col-span-4 mt-unit-xl border-t border-outline-variant/30 pt-unit-lg flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body-md text-body-sm text-on-surface-variant text-center md:text-left">
            © {new Date().getFullYear()} OXIVOS FASHION. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6 text-body-sm text-on-surface-variant">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
