"use client";

import React from "react";
import Link from "next/link";
import { ProductCard } from "@/components/ui/ProductCard";
import { products } from "@/lib/products";
import { FeaturedCollection } from "@/components/ui/FeaturedCollection";

export default function Home() {
  // Get first 3 products for featured new arrivals
  const featuredProducts = products.slice(0, 3);
  // Get highest rated products as best sellers
  const bestSellers = products.filter((p) => p.rating >= 4.8).slice(0, 3);

  return (
    <main className="bg-surface text-on-surface min-h-screen overflow-x-hidden pt-16">
      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center pt-24 overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat opacity-90 transition-transform duration-[10000ms] hover:scale-105"
            style={{
              backgroundImage:
                "url('/assets/hero.png')",
            }}
            aria-label="A massive high-resolution editorial fashion shot. A male model wearing a sleek black blazer stands against a misty alpine mountain landscape."
          />
          <div className="absolute inset-0 bg-gradient-to-b from-surface/30 via-transparent to-surface" />
        </div>

        {/* Content Box */}
        <div className="relative z-10 text-center max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full mt-auto mb-unit-xl">
          {/* Massive Editorial Background Text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full -z-10 pointer-events-none select-none">
            <h1 className="font-display-xl text-[12vw] leading-none text-white opacity-85 tracking-tighter mix-blend-overlay font-black uppercase">
              Oxivos
            </h1>
          </div>

          <div className="bg-surface/70 backdrop-blur-lg p-unit-lg rounded-xl inline-block mt-64 border border-white/30 shadow-elevate-glass max-w-xl mx-auto">
            <h2 className="text-headline-sm md:text-headline-sm text-primary mb-2 font-bold uppercase tracking-wide">
              Inspired by nature. Designed for movement.
            </h2>
            <p className="text-body-md text-on-surface-variant mb-unit-md">
              Style that rises above the ordinary. Engineered for technical refinement.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-unit-md">
              <Link
                href="/products"
                className="bg-primary text-on-primary font-label-md uppercase tracking-wider px-8 py-3 rounded-DEFAULT hover:opacity-85 transition-opacity text-center"
              >
                Explore Collection
              </Link>
              <Link
                href="/products"
                className="border border-primary text-primary font-label-md uppercase tracking-wider px-8 py-3 rounded-DEFAULT hover:bg-surface-variant transition-colors text-center"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>

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
                className="bg-surface/50 backdrop-blur-md p-4 rounded-xl border border-white/50 shadow-elevate hover:shadow-elevate-glass transition-all duration-300"
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
    </main>
  );
}
