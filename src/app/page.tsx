"use client";

import React from "react";
import Link from "next/link";
import { ProductCard } from "@/components/ui/ProductCard";
import { products } from "@/lib/products";
import { FeaturedCollection } from "@/components/ui/FeaturedCollection";
import { HeroSection } from "@/components/home/HeroSection";
import { Testimonials } from "@/components/home/Testimonials";
import { CategorySection } from "@/components/home/CategorySection";

export default function Home() {
  // Get first 6 products for featured new arrivals
  const featuredProducts = products.slice(0, 6);
  // Get highest rated products as best sellers
  const bestSellers = products.filter((p) => p.rating >= 4.8).slice(0, 4);

  return (
    <main className="bg-surface text-on-surface min-h-screen overflow-x-hidden pt-0">
      {/* Hero Section */}
      <HeroSection />

      {/* Category Section */}
      <CategorySection />

      {/* Featured Collection Section */}
      <FeaturedCollection />

      {/* Best Sellers Section */}
      <section className="py-12 sm:py-16 md:py-section-gap px-4 sm:px-6 md:px-8 lg:px-12 max-w-[1440px] mx-auto border-t border-outline-variant/30">
        <div className="mb-6 sm:mb-8 md:mb-unit-xl">
          <span className="text-[10px] sm:text-label-sm font-bold uppercase tracking-widest text-secondary block mb-1">
            Customer Favorites
          </span>
          <h2 className="font-heading text-xl sm:text-2xl md:text-headline-lg text-primary uppercase font-black">
            Best Sellers
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-on-surface-variant mt-2 max-w-xl leading-relaxed">
            Refined technical essentials recommended by our community. Built to endure, styled for the modern landscape.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-gutter">
          {bestSellers.map((product) => (
            <div key={product.id} className="flex flex-col">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* New Arrivals (Themed Background) */}
      <section className="py-12 sm:py-16 md:py-section-gap relative overflow-hidden text-center">
        {/* Soft backdrop */}
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center opacity-40"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuALEdo4Ckxs-JgREGFhKFFeOfl1l8CBCnuMYwTEAl2GCsQDxgRWLGl8Vs0_MUoBMmBS7EFv8fXxL-JnHrhGcx0dv_YC8Te83peiunl2Rj448aRQyMaWlhMfc8-D1BhaWXJV4GMOsbYZEJcgVmE6GVu1HO6l41sOBS8w3W_CaDnBWnckr4ykNNGoL-KHcNBQOZBRezrg29xeHLxmbQC--cgIxA6khM61QKm4YnZGV3r7mApgNo9aEAsD')",
            }}
            aria-label="A misty alpine mountain landscape serving as a soft textured website background."
          />
          <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface/85 to-surface" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <span className="text-[10px] sm:text-label-sm font-bold uppercase tracking-widest text-secondary block mb-1">
            Season Essentials
          </span>
          <h2 className="font-heading text-xl sm:text-2xl md:text-headline-md text-primary mb-2 uppercase font-black">
            New Arrivals
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant mb-6 sm:mb-8 md:mb-unit-xl max-w-md mx-auto">
            Fresh essentials inspired by open skies and new horizons.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-gutter text-left">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-surface/60 p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl border border-white/50 shadow-elevate hover:shadow-elevate-glass transition-all duration-300"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="mt-6 sm:mt-8 md:mt-unit-xl flex justify-center">
            <Link
              href="/products"
              className="bg-transparent border border-primary text-primary text-[10px] sm:text-xs font-bold uppercase tracking-widest px-5 sm:px-8 py-2.5 sm:py-3 hover:bg-primary hover:text-on-primary transition-colors duration-300 rounded inline-block"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />
    </main>
  );
}
