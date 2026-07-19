"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Heart, ShoppingBag, Plus, Minus } from "lucide-react";
import { Product } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Button } from "@/components/ui/button";

interface ProductDetailsClientProps {
  product: Product;
}

export const ProductDetailsClient: React.FC<ProductDetailsClientProps> = ({ product }) => {
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Active selections
  const [selectedImage, setSelectedImage] = useState<string>(product.images[0] || product.image);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0] || "");
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || "");
  const [quantity, setQuantity] = useState<number>(1);

  // Accordions state
  const [specsOpen, setSpecsOpen] = useState(true);
  const [materialsOpen, setMaterialsOpen] = useState(false);
  const [shippingOpen, setShippingOpen] = useState(false);

  // Notification feedback
  const [addedNotification, setAddedNotification] = useState(false);

  // Sync state if product changes
  useEffect(() => {
    setSelectedImage(product.images[0] || product.image);
    setSelectedColor(product.colors[0] || "");
    setSelectedSize(product.sizes[0] || "");
    setQuantity(1);
  }, [product]);

  const isFavorite = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addItem(product, selectedColor, selectedSize, quantity);
    setAddedNotification(true);
    setTimeout(() => setAddedNotification(false), 2000);
  };

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-unit-xl">
      {/* Breadcrumbs */}
      <div className="mb-unit-lg flex flex-wrap items-center gap-1 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/products" className="hover:text-primary transition-colors">
          Products
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href={`/products?category=${product.category}`} className="hover:text-primary transition-colors">
          {product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-primary font-semibold">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter md:gap-unit-xl">
        {/* Left Side: Image Gallery (7 columns) */}
        <div className="md:col-span-7 flex flex-col gap-unit-md">
          {/* Main Active Image */}
          <div className="w-full aspect-[4/5] bg-card-bg rounded overflow-hidden relative group">
            {!product.inStock && (
              <div className="absolute top-4 left-4 z-10 bg-error text-on-error font-label-sm px-4 py-1.5 rounded-full uppercase tracking-wider">
                Sold Out
              </div>
            )}
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out mix-blend-multiply dark:mix-blend-normal"
            />
          </div>

          {/* Gallery Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-unit-md overflow-x-auto pb-2 scrollbar-none">
              {product.images.map((imgUrl, idx) => {
                const isSelected = selectedImage === imgUrl;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`w-[100px] md:w-[120px] aspect-[4/5] bg-card-bg rounded overflow-hidden flex-shrink-0 border-2 transition-all focus:outline-none ${
                      isSelected
                        ? "border-primary shadow-sm"
                        : "border-transparent hover:border-outline-variant"
                    }`}
                  >
                    <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal" />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Side: Product Info (5 columns) */}
        <div className="md:col-span-5 flex flex-col pt-unit-md md:pt-0">
          <div className="mb-unit-lg">
            <span className="text-label-sm uppercase text-secondary font-bold tracking-widest block mb-1">
              {product.category}&apos;s Collection
            </span>
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-primary mb-unit-sm uppercase tracking-wide">
              {product.name}
            </h1>
            <p className="font-headline-sm text-headline-sm text-on-surface-variant font-medium">
              ${product.price}.00
            </p>
          </div>

          <p className="font-body-md text-body-md text-on-surface-variant mb-unit-xl leading-relaxed">
            {product.description}
          </p>

          <hr className="border-outline-variant mb-unit-lg" />

          {/* Color swatches */}
          <div className="mb-unit-lg">
            <p className="font-label-md text-label-md text-primary uppercase tracking-wider mb-3 font-semibold">
              Color: <span className="text-on-surface-variant normal-case font-normal">{selectedColor}</span>
            </p>
            <div className="flex gap-3">
              {product.colors.map((color) => {
                const isSelected = selectedColor === color;
                let colorBg = "bg-primary";
                if (color.toLowerCase().includes("white")) colorBg = "bg-white border border-outline-variant";
                if (color.toLowerCase().includes("blue")) colorBg = "bg-secondary-container";
                if (color.toLowerCase().includes("charcoal")) colorBg = "bg-on-surface-variant";
                if (color.toLowerCase().includes("olive")) colorBg = "bg-secondary";
                if (color.toLowerCase().includes("cream")) colorBg = "bg-surface-container";
                if (color.toLowerCase().includes("obsidian")) colorBg = "bg-[#1c1b1b]";
                if (color.toLowerCase().includes("sand")) colorBg = "bg-[#dfe8ff]";

                return (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-9 h-9 rounded-full p-0.5 border ${
                      isSelected ? "border-primary scale-110 shadow-sm" : "border-transparent"
                    } hover:scale-105 transition-all`}
                    title={color}
                  >
                    <div className={`w-full h-full rounded-full ${colorBg}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Size Selectors */}
          {product.sizes.length > 0 && (
            <div className="mb-unit-xl">
              <div className="flex justify-between items-center mb-3">
                <span className="font-label-md text-label-md text-primary uppercase tracking-wider font-semibold">
                  Size
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant underline underline-offset-4 cursor-pointer hover:text-primary transition-colors">
                  Size Guide
                </span>
              </div>
              <div className="grid grid-cols-4 gap-unit-sm">
                {product.sizes.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 border text-center font-label-md text-label-md transition-all rounded ${
                        isSelected
                          ? "border-primary bg-primary text-on-primary font-bold shadow-elevate"
                          : "border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Action Blocks */}
          <div className="flex flex-col gap-unit-md mb-unit-xl">
            {product.inStock ? (
              <div className="flex gap-unit-sm">
                {/* Quantity Controls */}
                <div className="flex items-center border border-outline-variant rounded">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 text-primary hover:bg-surface-container transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-3 font-body-md text-body-md border-x border-outline-variant min-w-[40px] text-center font-bold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 text-primary hover:bg-surface-container transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Bag Button */}
                <Button
                  onClick={handleAddToCart}
                  variant={addedNotification ? "secondary" : "default"}
                  size="lg"
                  className="flex-grow flex justify-center items-center gap-2 shadow-elevate"
                >
                  <ShoppingBag className="w-5 h-5 text-current" />
                  <span>{addedNotification ? "Added to Bag" : "Add to Bag"}</span>
                </Button>
              </div>
            ) : (
              <Button
                disabled
                variant="outline"
                size="lg"
                className="w-full cursor-not-allowed flex justify-center items-center opacity-50"
              >
                Sold Out
              </Button>
            )}

            {/* Wishlist Button */}
            <Button
              onClick={() => toggleWishlist(product)}
              variant={isFavorite ? "default" : "outline"}
              size="lg"
              className="w-full flex justify-center items-center gap-2"
            >
              <Heart className={`w-5 h-5 text-current ${isFavorite ? "fill-current" : ""}`} />
              <span>{isFavorite ? "Saved to Wishlist" : "Save to Wishlist"}</span>
            </Button>
          </div>

          {/* Accordion Specs Sheets */}
          <div className="border-t border-outline-variant">
            {/* Specs Accordion */}
            <div className="border-b border-outline-variant">
              <button
                onClick={() => setSpecsOpen(!specsOpen)}
                className="w-full py-unit-lg flex justify-between items-center focus:outline-none group"
              >
                <span className="font-label-md text-label-md text-primary uppercase tracking-wider font-semibold group-hover:opacity-75 transition-opacity">
                  Technical Specs
                </span>
                <span className={`text-primary transition-transform duration-300 font-light text-xl`}>
                  {specsOpen ? "—" : "+"}
                </span>
              </button>
              <div
                className={`pb-unit-lg transition-all duration-300 ${
                  specsOpen ? "block" : "hidden"
                }`}
              >
                <ul className="list-disc pl-5 font-body-md text-body-md text-on-surface-variant space-y-2 leading-relaxed">
                  {product.details ? (
                    product.details.map((detail, i) => <li key={i}>{detail}</li>)
                  ) : (
                    <>
                      <li>Clean technical design and silhouette</li>
                      <li>Ergonomic cut optimized for mobility</li>
                      <li>Highly durable construction</li>
                      <li>Internal secure item pockets</li>
                    </>
                  )}
                </ul>
              </div>
            </div>

            {/* Materials Accordion */}
            <div className="border-b border-outline-variant">
              <button
                onClick={() => setMaterialsOpen(!materialsOpen)}
                className="w-full py-unit-lg flex justify-between items-center focus:outline-none group"
              >
                <span className="font-label-md text-label-md text-primary uppercase tracking-wider font-semibold group-hover:opacity-75 transition-opacity">
                  Materials & Care
                </span>
                <span className="text-primary font-light text-xl">
                  {materialsOpen ? "—" : "+"}
                </span>
              </button>
              <div
                className={`pb-unit-lg transition-all duration-300 ${
                  materialsOpen ? "block" : "hidden"
                }`}
              >
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  {product.materials || "Premium blended materials. Machine wash cold with similar colors. Do not iron over graphics or custom details."}
                </p>
              </div>
            </div>

            {/* Shipping Accordion */}
            <div className="border-b border-outline-variant">
              <button
                onClick={() => setShippingOpen(!shippingOpen)}
                className="w-full py-unit-lg flex justify-between items-center focus:outline-none group"
              >
                <span className="font-label-md text-label-md text-primary uppercase tracking-wider font-semibold group-hover:opacity-75 transition-opacity">
                  Shipping & Returns
                </span>
                <span className="text-primary font-light text-xl">
                  {shippingOpen ? "—" : "+"}
                </span>
              </button>
              <div
                className={`pb-unit-lg transition-all duration-300 ${
                  shippingOpen ? "block" : "hidden"
                }`}
              >
                <p className="font-body-md text-body-md text-on-surface-variant space-y-2 leading-relaxed">
                  <span>Complimentary standard shipping on all orders over $200. Standard carrier rates apply otherwise.</span>
                  <br /><br />
                  <span>We accept returns of unused items in original packaging within 30 days of shipment receipt. Return tags are included in shipping invoice boxes.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
