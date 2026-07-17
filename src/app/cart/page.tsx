"use client";

import React from "react";
import Link from "next/link";
import { Plus, Minus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { ProductCard } from "@/components/ui/ProductCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { products } from "@/lib/products";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const {
    cartItems,
    removeItem,
    updateQuantity,
    cartSubtotal,
    clearCart,
  } = useCart();

  // Dynamic Shipping calculation
  const shippingThreshold = 200;
  const shippingFee = cartSubtotal >= shippingThreshold || cartSubtotal === 0 ? 0 : 15;

  // Mock Tax calculation (8%)
  const taxRate = 0.08;
  const taxFee = parseFloat((cartSubtotal * taxRate).toFixed(2));

  // Grand Total
  const grandTotal = cartSubtotal + shippingFee + taxFee;

  // Upsell recommendations (filter out items already in the cart)
  const upsellProducts = products
    .filter((p) => !cartItems.some((item) => item.product.id === p.id))
    .slice(0, 3);

  // Fallback to general recommendations if cart contains all items
  const displayUpsells = upsellProducts.length > 0 ? upsellProducts : products.slice(7, 10);

  const handleCheckout = () => {
    alert("This is a frontend demonstration. Your order total would be $" + grandTotal.toFixed(2));
    clearCart();
  };

  if (cartItems.length === 0) {
    return (
      <main className="flex-grow pt-32 pb-section-gap">
        <EmptyState
          title="Your Cart is Empty"
          description="It looks like you haven't added any products to your cart yet. Explore our latest technical apparel collections."
          actionLabel="Explore Collections"
          actionHref="/products"
          icon={<ShoppingBag className="w-16 h-16 stroke-[1.25] text-on-surface-variant/40" />}
        />
      </main>
    );
  }

  return (
    <main className="flex-grow max-w-container-max w-full mx-auto px-margin-mobile md:px-margin-desktop py-unit-xl pt-24 md:pt-32">
      <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-unit-lg text-primary uppercase">
        Your Cart
      </h1>

      <div className="flex flex-col lg:flex-row gap-gutter lg:gap-unit-xl">
        {/* Left Column: Cart Items List (flex-grow) */}
        <div className="flex-grow flex flex-col gap-4 md:gap-unit-lg">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 md:gap-unit-lg py-4 md:py-unit-lg border-b border-outline-variant/45"
            >
              {/* Product Thumbnail */}
              <div className="w-24 h-32 md:w-32 md:h-40 bg-card-bg rounded overflow-hidden flex-shrink-0 flex items-center justify-center">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-full h-full object-cover mix-blend-multiply"
                />
              </div>

              {/* Product Item Details */}
              <div className="flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex justify-between items-start mb-unit-xs">
                    <Link href={`/products/${item.product.id}`} className="hover:underline">
                      <h3 className="font-headline-sm text-label-md md:text-headline-sm text-primary uppercase tracking-wide font-bold">
                        {item.product.name}
                      </h3>
                    </Link>
                    <span className="font-body-lg text-body-md md:text-body-lg text-primary font-semibold">
                      ${item.product.price * item.quantity}.00
                    </span>
                  </div>
                  <p className="font-body-md text-label-sm text-on-surface-variant">
                    Color: {item.selectedColor}
                  </p>
                  <p className="font-body-md text-label-sm text-on-surface-variant">
                    Size: {item.selectedSize}
                  </p>
                </div>

                {/* Controls (quantity & remove button) */}
                <div className="flex justify-between items-end">
                  {/* Quantity Modifier */}
                  <div className="flex items-center border border-outline-variant rounded bg-surface">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2.5 py-1 text-primary hover:bg-surface-container transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 py-1 font-body-md text-label-sm border-x border-outline-variant min-w-[28px] text-center font-bold text-primary">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2.5 py-1 text-primary hover:bg-surface-container transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant hover:text-error transition-colors underline underline-offset-4 flex items-center gap-1.5"
                  >
                    <Trash2 className="w-4 h-4 text-on-surface-variant hover:text-error transition-colors" />
                    <span className="hidden sm:inline">Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Order Summary Box */}
        <div className="w-full lg:w-[400px] flex-shrink-0">
          <div className="bg-card-bg p-unit-lg rounded shadow-sm border border-outline-variant/20">
            <h2 className="font-headline-md text-headline-sm md:text-headline-md text-primary mb-unit-lg uppercase">
              Order Summary
            </h2>
            <div className="flex flex-col gap-unit-sm mb-unit-lg border-b border-outline-variant/60 pb-unit-md">
              {/* Subtotal */}
              <div className="flex justify-between font-body-md text-body-md text-on-surface-variant">
                <span>Subtotal</span>
                <span className="text-primary font-medium">${cartSubtotal}.00</span>
              </div>
              
              {/* Shipping */}
              <div className="flex justify-between font-body-md text-body-md text-on-surface-variant">
                <span>Shipping</span>
                {shippingFee === 0 ? (
                  <span className="text-secondary font-semibold uppercase text-xs tracking-wider">Free Shipping</span>
                ) : (
                  <span className="text-primary font-medium">${shippingFee}.00</span>
                )}
              </div>
              {shippingFee > 0 && (
                <p className="text-[11px] text-on-surface-variant -mt-1 text-right">
                  Add <span className="font-semibold">${shippingThreshold - cartSubtotal}</span> more for Free Shipping
                </p>
              )}

              {/* Tax */}
              <div className="flex justify-between font-body-md text-body-md text-on-surface-variant">
                <span>Estimated Tax (8%)</span>
                <span className="text-primary font-medium">${taxFee.toFixed(2)}</span>
              </div>
            </div>

            {/* Total price */}
            <div className="flex justify-between font-headline-sm text-headline-sm text-primary mb-unit-lg">
              <span className="uppercase tracking-wide font-black">Total</span>
              <span className="font-black">${grandTotal.toFixed(2)}</span>
            </div>

            {/* Checkout Action */}
            <Button
              onClick={handleCheckout}
              variant="default"
              size="lg"
              className="w-full flex justify-center items-center gap-2 shadow-elevate"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 text-current" />
            </Button>
          </div>
        </div>
      </div>

      {/* Recommended Upsell section */}
      <div className="mt-section-gap border-t border-outline-variant/30 pt-unit-xl">
        <h2 className="font-headline-md text-headline-md text-primary mb-unit-lg uppercase">
          You May Also Like
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {displayUpsells.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}
