"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/ui/ProductCard";
import { ProductGridSkeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { products } from "@/lib/products";
import { useWishlist } from "@/context/WishlistContext";


const ProductsListContent: React.FC = () => {
  const searchParams = useSearchParams();
  const { isInWishlist } = useWishlist();

  // Search parameters
  const categoryParam = searchParams.get("category");
  const searchParam = searchParams.get("search");
  const wishlistParam = searchParams.get("wishlist");

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || "All");
  const [selectedSize, setSelectedSize] = useState<string>("All");
  const [selectedColor, setSelectedColor] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("default");

  // Pagination
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Sync category state when URL changes
  useEffect(() => {
    setSelectedCategory(categoryParam || "All");
    setVisibleCount(6);
  }, [categoryParam]);

  // Sync search loading state mock
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [selectedCategory, selectedSize, selectedColor, sortBy, searchParam, wishlistParam]);

  // Filter list of available sizes and colors in the store
  const allSizes = Array.from(new Set(products.flatMap((p) => p.sizes))).sort();
  const allColors = Array.from(new Set(products.flatMap((p) => p.colors))).sort();

  // Filter products based on active parameters
  const filteredProducts = products.filter((product) => {
    // 1. Category Filter
    if (selectedCategory !== "All" && product.category.toLowerCase() !== selectedCategory.toLowerCase()) {
      return false;
    }

    // 2. Size Filter
    if (selectedSize !== "All" && !product.sizes.includes(selectedSize)) {
      return false;
    }

    // 3. Color Filter
    if (selectedColor !== "All" && !product.colors.includes(selectedColor)) {
      return false;
    }

    // 4. Search Filter
    if (searchParam) {
      const query = searchParam.toLowerCase();
      const matchName = product.name.toLowerCase().includes(query);
      const matchSubtitle = product.subtitle?.toLowerCase().includes(query);
      const matchDesc = product.description.toLowerCase().includes(query);
      if (!matchName && !matchSubtitle && !matchDesc) {
        return false;
      }
    }

    // 5. Wishlist Filter
    if (wishlistParam === "true" && !isInWishlist(product.id)) {
      return false;
    }

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") {
      return a.price - b.price;
    }
    if (sortBy === "price-high") {
      return b.price - a.price;
    }
    if (sortBy === "rating") {
      return b.rating - a.rating;
    }
    return 0; // default order
  });

  // Paginated display items
  const displayProducts = sortedProducts.slice(0, visibleCount);

  // Dynamic Page Headers
  let pageTitle = "New Arrivals";
  let pageDescription = "Fresh essentials inspired by open skies and new horizons.";

  if (wishlistParam === "true") {
    pageTitle = "Your Wishlist";
    pageDescription = "Items you saved to browse or buy later.";
  } else if (selectedCategory !== "All") {
    pageTitle = `${selectedCategory}'s Collection`;
    pageDescription = `Technical refinement designed for ${selectedCategory.toLowerCase()}.`;
  } else if (searchParam) {
    pageTitle = `Search: "${searchParam}"`;
    pageDescription = `Search results matching your keyword.`;
  }

  const handleResetFilters = () => {
    setSelectedCategory("All");
    setSelectedSize("All");
    setSelectedColor("All");
    setSortBy("default");
  };

  return (
    <main className="flex-grow pt-24 md:pt-32 pb-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
      {/* Header details */}
      <header className="mb-unit-xl">
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-primary mb-unit-sm text-center md:text-left uppercase">
          {pageTitle}
        </h1>
        <p className="font-body-lg text-on-surface-variant mb-unit-lg text-center md:text-left">
          {pageDescription}
        </p>

        {/* Filter bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-unit-md border-y border-outline-variant/30 gap-unit-md">
          <div className="flex flex-wrap items-center gap-x-gutter gap-y-unit-sm text-on-surface-variant w-full md:w-auto">
            <span className="font-label-md text-label-md uppercase font-bold text-primary">Filter By:</span>
            
            {/* Category selection */}
            {categoryParam === null && (
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setVisibleCount(6);
                }}
                className="form-select bg-transparent border-none focus:ring-0 text-primary font-label-md text-label-md uppercase cursor-pointer py-1 pl-0 pr-6"
              >
                <option value="All">Category</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            )}

            {/* Size selection */}
            <select
              value={selectedSize}
              onChange={(e) => {
                setSelectedSize(e.target.value);
                setVisibleCount(6);
              }}
              className="form-select bg-transparent border-none focus:ring-0 text-primary font-label-md text-label-md uppercase cursor-pointer py-1 pl-0 pr-6"
            >
              <option value="All">Size</option>
              {allSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>

            {/* Color selection */}
            <select
              value={selectedColor}
              onChange={(e) => {
                setSelectedColor(e.target.value);
                setVisibleCount(6);
              }}
              className="form-select bg-transparent border-none focus:ring-0 text-primary font-label-md text-label-md uppercase cursor-pointer py-1 pl-0 pr-6"
            >
              <option value="All">Color</option>
              {allColors.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>

            {/* Sort order */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-select bg-transparent border-none focus:ring-0 text-primary font-label-md text-label-md uppercase cursor-pointer py-1 pl-0 pr-6"
            >
              <option value="default">Sort by</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>

          <div className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
            Showing {sortedProducts.length} {sortedProducts.length === 1 ? "Result" : "Results"}
          </div>
        </div>
      </header>

      {/* Main product display */}
      {isLoading ? (
        <ProductGridSkeleton count={6} />
      ) : displayProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-gutter gap-y-unit-xl">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Load More Pagination */}
          {visibleCount < sortedProducts.length && (
            <div className="mt-section-gap flex justify-center">
              <button
                onClick={() => setVisibleCount((prev) => Math.min(prev + 6, sortedProducts.length))}
                className="bg-transparent border border-primary text-primary font-label-md text-label-md uppercase px-unit-xl py-unit-md hover:bg-primary hover:text-on-primary transition-colors duration-300 rounded-DEFAULT"
              >
                Load More
              </button>
            </div>
          )}
        </>
      ) : (
        <EmptyState
          title="No Products Found"
          description="We couldn't find any products matching your active filters. Try adjusting your selections or resetting."
          actionLabel="Reset All Filters"
          actionHref="" // Triggers reset in custom handler instead of navigation
          icon={
            <div
              onClick={handleResetFilters}
              className="cursor-pointer hover:opacity-80 transition-opacity"
            >
              <svg
                className="w-12 h-12 mx-auto stroke-[1.25] text-on-surface-variant/40"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89M9 11l3-3 3 3m-3-3v12"
                />
              </svg>
            </div>
          }
        />
      )}
    </main>
  );
};

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductGridSkeleton count={6} />}>
      <ProductsListContent />
    </Suspense>
  );
}
