"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, ShoppingBag, X } from "lucide-react";
import { Product } from "../../lib/types";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || "");
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [addedNotification, setAddedNotification] = useState(false);

  const isFavorite = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addItem(product, selectedColor, selectedSize, quantity);
    setAddedNotification(true);
    setTimeout(() => setAddedNotification(false), 2000);
  };

  return (
    <>
      <div className="group relative flex flex-col w-full">
        {/* Image Container with 3:4 aspect ratio */}
        <div className="relative bg-card-bg aspect-[3/4] mb-unit-md overflow-hidden rounded-sm flex items-center justify-center">
          {/* Out of Stock Badge */}
          {!product.inStock && (
            <div className="absolute top-4 left-4 z-10 bg-error text-on-error font-label-sm px-3 py-1 rounded-full uppercase tracking-wider">
              Sold Out
            </div>
          )}

          {/* Product Image */}
          <img
            src={product.image}
            alt={product.name}
            className={`object-cover w-full h-full mix-blend-multiply opacity-90 transition-transform duration-700 ease-out group-hover:scale-105 ${
              !product.inStock ? "opacity-50" : ""
            }`}
          />

          {/* Quick View and Action Overlay (hidden on touch, hover on desktop) */}
          <div className="absolute inset-0 bg-primary/5 flex flex-col items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => toggleWishlist(product)}
              className="self-end bg-surface-container-lowest text-primary p-2 rounded-full hover:bg-primary hover:text-on-primary transition-all duration-300 shadow-elevate"
              aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={`w-4.5 h-4.5 ${isFavorite ? "fill-primary" : ""}`} />
            </button>

            <button
              onClick={() => setIsQuickViewOpen(true)}
              className="bg-surface-container-lowest text-primary font-label-md text-label-md uppercase px-unit-lg py-unit-sm tracking-wider shadow-elevate hover:bg-primary hover:text-on-primary transition-colors duration-300 rounded-DEFAULT"
            >
              Quick View
            </button>

            {/* Spacer */}
            <div className="h-9" />
          </div>
        </div>

        {/* Product Details (bottom-aligned) */}
        <div className="flex justify-between items-start mt-auto">
          <div className="flex-grow pr-2">
            <Link href={`/products/${product.id}`} className="hover:underline">
              <h3 className="font-label-md text-label-md text-primary mb-1 uppercase tracking-wider">
                {product.name}
              </h3>
            </Link>
            <p className="font-label-sm text-label-sm text-on-surface-variant">
              {product.subtitle || `${product.colors.join(" / ")}`}
            </p>
          </div>
          <span className="font-label-md text-label-md text-primary font-semibold">
            ${product.price}
          </span>
        </div>
      </div>

      {/* Quick View Modal Overlay */}
      {isQuickViewOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-primary/45 backdrop-blur-md"
            onClick={() => setIsQuickViewOpen(false)}
          />

          {/* Modal Content */}
          <div className="relative bg-surface w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:max-h-none animate-in zoom-in duration-300 z-10">
            {/* Close Button */}
            <button
              onClick={() => setIsQuickViewOpen(false)}
              className="absolute top-4 right-4 text-primary hover:opacity-70 transition-opacity p-2 z-20 bg-surface/50 backdrop-blur rounded-full md:bg-transparent"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Side: Image */}
            <div className="w-full md:w-1/2 bg-card-bg aspect-[4/5] md:aspect-auto md:h-auto flex items-center justify-center relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover mix-blend-multiply"
              />
            </div>

            {/* Right Side: Info & Actions */}
            <div className="w-full md:w-1/2 p-unit-lg flex flex-col overflow-y-auto">
              <div className="mb-unit-md">
                <span className="text-label-sm uppercase text-secondary font-bold tracking-wider mb-1 block">
                  {product.category}
                </span>
                <h2 className="font-headline-sm text-headline-sm text-primary mb-1">
                  {product.name}
                </h2>
                <p className="font-headline-sm text-body-lg text-primary font-semibold mt-1">
                  ${product.price}
                </p>
              </div>

              <p className="font-body-md text-body-md text-on-surface-variant mb-unit-lg">
                {product.description}
              </p>

              <hr className="border-outline-variant mb-unit-md" />

              {/* Color swatches */}
              <div className="mb-unit-md">
                <p className="font-label-sm text-label-sm uppercase tracking-wider text-primary mb-2">
                  Color: <span className="text-on-surface-variant normal-case font-normal">{selectedColor}</span>
                </p>
                <div className="flex gap-2">
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
                        className={`w-8 h-8 rounded-full p-0.5 border ${
                          isSelected ? "border-primary" : "border-transparent"
                        } hover:border-outline-variant transition-colors`}
                        title={color}
                      >
                        <div className={`w-full h-full rounded-full ${colorBg}`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size selectors */}
              {product.sizes.length > 0 && (
                <div className="mb-unit-lg">
                  <p className="font-label-sm text-label-sm uppercase tracking-wider text-primary mb-2">
                    Size
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => {
                      const isSelected = selectedSize === size;
                      return (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-3 py-1.5 border text-center font-label-sm text-label-sm transition-all rounded ${
                            isSelected
                              ? "border-primary bg-primary text-on-primary shadow-sm"
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

              {/* Action Buttons */}
              <div className="mt-auto flex flex-col gap-2">
                {product.inStock ? (
                  <div className="flex gap-2">
                    <div className="flex items-center border border-outline-variant rounded">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-2 text-primary hover:bg-surface-container transition-colors"
                      >
                        -
                      </button>
                      <span className="px-3 py-2 font-body-md text-body-md border-x border-outline-variant min-w-[32px] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-2 text-primary hover:bg-surface-container transition-colors"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={handleAddToCart}
                      className="flex-grow py-3 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider rounded hover:opacity-90 transition-opacity shadow-elevate flex justify-center items-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>{addedNotification ? "Added" : "Add to Bag"}</span>
                    </button>
                  </div>
                ) : (
                  <button
                    disabled
                    className="w-full py-3 bg-outline text-on-primary font-label-md text-label-md uppercase tracking-wider rounded cursor-not-allowed flex justify-center items-center"
                  >
                    Out of Stock
                  </button>
                )}

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`w-full py-2 border rounded font-label-sm text-label-sm uppercase tracking-wider transition-colors flex justify-center items-center gap-2 ${
                    isFavorite
                      ? "border-primary bg-primary text-on-primary"
                      : "border-outline-variant text-primary hover:bg-surface-container-low"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
                  <span>{isFavorite ? "In Wishlist" : "Save to Wishlist"}</span>
                </button>

                <Link
                  href={`/products/${product.id}`}
                  className="text-center font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors uppercase tracking-wider underline underline-offset-4 mt-2"
                >
                  View Full Product Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
