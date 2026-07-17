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
  // Get first 3 products for featured new arrivals
  const featuredProducts = products.slice(0, 3);
  // Get highest rated products as best sellers
  const bestSellers = products.filter((p) => p.rating >= 4.8).slice(0, 3);

  return (
    <main className="bg-surface text-on-surface min-h-screen overflow-x-hidden pt-0">
      {/* Hero Section */}
      <HeroSection />

      {/* Category Section */}
      <CategorySection />

      {/* Featured Collection Section */}
      <FeaturedCollection />

      {/* Best Sellers Section */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto border-t border-outline-variant/30">
        <div className="mb-unit-xl">
          <span className="text-label-sm font-bold uppercase tracking-widest text-secondary block mb-1">
            Customer Favorites
          </span>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary uppercase">
            Best Sellers
          </h2>
          <p className="font-body-md text-on-surface-variant mt-2 max-w-xl">
            Refined technical essentials recommended by our community. Built to endure, styled for the modern landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {bestSellers.map((product) => (
            <div key={product.id} className="flex flex-col">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* New Arrivals (Themed Background) */}
      <section className="py-section-gap relative overflow-hidden text-center">
        {/* Soft mountain graphic backdrop */}
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

        <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <span className="text-label-sm font-bold uppercase tracking-widest text-secondary block mb-1">
            Season Essentials
          </span>
          <h2 className="font-headline-md text-headline-md text-primary mb-2 uppercase font-black">
            New Arrivals
          </h2>
          <p className="font-body-md text-on-surface-variant mb-unit-xl">
            Fresh essentials inspired by open skies and new horizons.
          </p>

          {/* Featured items */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter text-left">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-surface/60 p-4 rounded-xl border border-white/50 shadow-elevate hover:shadow-elevate-glass transition-all duration-300"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="mt-unit-xl flex justify-center">
            <Link
              href="/products"
              className="bg-transparent border border-primary text-primary font-label-md text-label-md uppercase px-unit-xl py-unit-md hover:bg-primary hover:text-on-primary transition-colors duration-300 rounded-DEFAULT inline-block"
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
