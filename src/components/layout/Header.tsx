"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, User, ShoppingBag, Heart, Menu, X, ArrowRight } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { products } from "../../lib/products";
import { Product } from "../../lib/types";
import { ThemeToggle } from "../ui/ThemeToggle";

export const Header: React.FC = () => {
  const { cartCount } = useCart();
  const { wishlistItems } = useWishlist();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentCategory = searchParams.get("category") || "";
  const isWishlist = searchParams.get("wishlist") === "true";

  const isHome = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(!isHome);
  const [isMounted, setIsMounted] = useState(false);

  // Set mounted state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Monitor scroll for nav styling
  useEffect(() => {
    if (!isHome) {
      setIsScrolled(true);
      return;
    }

    setIsScrolled(window.scrollY >= 80);

    const handleScroll = () => {
      if (window.scrollY >= 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome, pathname]);

  // Update search results
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const query = searchQuery.toLowerCase();
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        (product.subtitle && product.subtitle.toLowerCase().includes(query))
    );
    setSearchResults(filtered);
  }, [searchQuery]);

  // Close menus on page change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setSearchQuery("");
  }, [pathname]);

  // Rest of state hooks
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  const navLinks = [
    { label: "Shop", href: "/products" },
    { label: "Men", href: "/products?category=Men" },
    { label: "Women", href: "/products?category=Women" },
    { label: "Kids", href: "/products?category=Kids" },
    { label: "Accessories", href: "/products?category=Accessories" },
  ];

  // Dynamic Theme-Aware styles based on scroll state
  // On non-home pages, we are always solid glass (isScrolled=true)
  const navActive = isMounted ? isScrolled : true;
  
  const logoColorClass = navActive ? "text-primary" : "text-white";
  const navColorClass = navActive 
    ? "text-on-surface-variant border-transparent hover:text-primary hover:border-outline-variant/45" 
    : "text-white/80 border-transparent hover:text-white hover:border-white/50";
  const activeColorClass = navActive ? "text-primary border-primary" : "text-white border-white";
  const iconColorClass = navActive ? "text-primary" : "text-white";
  const trailingIconBgClass = navActive ? "hover:bg-surface-container" : "hover:bg-white/10";

  return (
    <>
      {/* Subtle top gradient scrim for WCAG AA readability on the homepage overlay */}
      {!navActive && isHome && (
        <div className="fixed top-0 left-0 w-full h-[120px] bg-gradient-to-b from-black/45 via-black/15 to-transparent z-40 pointer-events-none transition-opacity duration-300" />
      )}

      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out border-b ${
          navActive
            ? "bg-surface/90 backdrop-blur-xl shadow-md py-3 border-outline-variant/20"
            : "bg-transparent py-5 border-transparent"
        }`}
      >
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto h-12">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className={`md:hidden hover:opacity-75 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded p-1 ${iconColorClass}`}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Brand */}
          <Link
            href="/"
            className={`text-headline-sm md:text-headline-md font-extrabold tracking-tighter hover:opacity-75 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded ${logoColorClass}`}
          >
            Oxivos Fashion<span className="text-error">.</span>
          </Link>

          <div className="hidden md:flex space-x-unit-lg items-center">
            {navLinks.map((link) => {
              const url = new URL(link.href, "http://localhost");
              const linkCategory = url.searchParams.get("category") || "";
              const linkWishlist = url.searchParams.get("wishlist") === "true";
              const isBaseProducts = link.href === "/products";

              let isActive = false;
              if (isBaseProducts) {
                isActive = pathname === "/products" && !currentCategory && !isWishlist;
              } else {
                isActive = pathname === url.pathname && 
                  (linkCategory === currentCategory) && 
                  (linkWishlist === isWishlist);
              }

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`font-label-md text-label-md uppercase tracking-wider transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded px-1 border-b pb-1 ${
                    isActive
                      ? activeColorClass
                      : navColorClass
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className={`flex items-center space-x-unit-md ${iconColorClass}`}>
            <ThemeToggle />

            <button
              onClick={() => setIsSearchOpen(true)}
              className={`hover:opacity-75 transition-opacity duration-300 p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full ${trailingIconBgClass}`}
              aria-label="Search products"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Link with Badge */}
            <Link
              href="/products?wishlist=true"
              className={`hover:opacity-75 transition-opacity duration-300 p-1 relative focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full ${trailingIconBgClass}`}
              aria-label="View wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistItems.length > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center font-bold text-[9px]"
                  style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-on-secondary)' }}
                >
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart Link with Badge */}
            <Link
              href="/cart"
              className={`hover:opacity-75 transition-opacity duration-300 p-1 relative focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full ${trailingIconBgClass}`}
              aria-label="View cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center font-bold text-[9px]"
                  style={{ backgroundColor: 'var(--color-elevate-primary)', color: 'var(--color-on-primary)' }}
                >
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-primary/20 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-surface h-full shadow-2xl flex flex-col p-6 animate-in slide-in-from-left duration-300">
            <div className="flex justify-between items-center mb-10">
              <span className="font-extrabold tracking-tighter text-primary text-headline-sm">Oxivos Fashion<span className="text-error">.</span></span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-primary p-1"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
             <div className="flex flex-col space-y-6">
              {navLinks.map((link) => {
                const url = new URL(link.href, "http://localhost");
                const linkCategory = url.searchParams.get("category") || "";
                const linkWishlist = url.searchParams.get("wishlist") === "true";
                const isBaseProducts = link.href === "/products";

                let isActive = false;
                if (isBaseProducts) {
                  isActive = pathname === "/products" && !currentCategory && !isWishlist;
                } else {
                  isActive = pathname === url.pathname && 
                    (linkCategory === currentCategory) && 
                    (linkWishlist === isWishlist);
                }

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`font-label-md text-headline-sm uppercase tracking-wider border-b pb-2 hover:opacity-70 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded ${
                      isActive
                        ? "text-primary border-primary font-bold"
                        : "text-on-surface-variant border-outline-variant/30"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
            <div className="mt-auto pt-6 border-t border-outline-variant/30 flex items-center gap-4 text-on-surface-variant">
              <User className="w-5 h-5" />
              <span className="text-label-md uppercase tracking-wider font-semibold">Account</span>
            </div>
          </div>
        </div>
      )}

      {/* Full-Screen Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-surface/95 backdrop-blur-xl flex flex-col animate-in fade-in duration-300">
          <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-6">
            <span className="font-extrabold tracking-tighter text-primary text-headline-sm">Oxivos Search<span className="text-error">.</span></span>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="text-primary hover:opacity-75 transition-opacity p-2"
              aria-label="Close search"
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          <div className="flex-grow flex flex-col max-w-2xl w-full mx-auto px-6 justify-center -mt-20">
            <form onSubmit={handleSearchSubmit} className="relative border-b-2 border-primary pb-3 mb-8">
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, categories..."
                className="w-full bg-transparent border-none text-headline-md md:text-headline-lg font-heading text-primary focus:outline-none focus:ring-0 placeholder:text-on-surface-variant/40"
              />
              <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 text-primary">
                <ArrowRight className="w-6 h-6" />
              </button>
            </form>

            {/* Live Search Results */}
            {searchResults.length > 0 && (
              <div className="max-h-[50vh] overflow-y-auto space-y-4 pr-2">
                <p className="text-label-sm uppercase text-on-surface-variant tracking-wider">Suggested Results</p>
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className="flex gap-4 p-2 hover:bg-surface-container rounded transition-colors group"
                  >
                     <div className="w-16 h-20 bg-card-bg rounded overflow-hidden flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h4 className="font-label-md text-primary group-hover:underline">{product.name}</h4>
                      <p className="text-label-sm text-on-surface-variant uppercase">{product.category}</p>
                      <p className="text-body-md text-primary font-medium mt-1">${product.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {searchQuery.trim() && searchResults.length === 0 && (
              <p className="text-body-lg text-on-surface-variant text-center mt-4">
                No products found matching &quot;{searchQuery}&quot;
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};
