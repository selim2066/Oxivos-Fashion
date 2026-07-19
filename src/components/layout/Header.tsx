"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, User, ShoppingBag, Heart, Menu, X, ArrowRight, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { products } from "../../lib/products";
import { Product } from "../../lib/types";
import { ThemeToggle } from "../ui/ThemeToggle";

import { Logo } from "../ui/Logo";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setIsMounted(true); }, []);

  // Scroll-aware transparency
  useEffect(() => {
    if (!isHome) { setIsScrolled(true); return; }
    const check = () => setIsScrolled(window.scrollY >= 60);
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, [isHome, pathname]);

  // Live search
  useEffect(() => {
    if (!searchQuery.trim()) { setSearchResults([]); return; }
    const q = searchQuery.toLowerCase();
    setSearchResults(
      products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.subtitle && p.subtitle.toLowerCase().includes(q))
      ).slice(0, 6)
    );
  }, [searchQuery]);

  // Close on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setSearchQuery("");
  }, [pathname]);

  // Lock body scroll when drawers open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen || isSearchOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen, isSearchOpen]);

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen) setTimeout(() => searchInputRef.current?.focus(), 80);
  }, [isSearchOpen]);

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

  const isLinkActive = (href: string) => {
    const url = new URL(href, "http://localhost");
    const linkCat = url.searchParams.get("category") || "";
    const linkWish = url.searchParams.get("wishlist") === "true";
    if (href === "/products") return pathname === "/products" && !currentCategory && !isWishlist;
    return pathname === url.pathname && linkCat === currentCategory && linkWish === isWishlist;
  };

  const navActive = isMounted ? isScrolled : true;
  const isTransparent = !navActive;

  return (
    <>
      {/* Top gradient scrim — only on home transparent state */}
      {isTransparent && isHome && (
        <div className="fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-black/50 via-black/15 to-transparent z-40 pointer-events-none" />
      )}

      {/* ─── Main Navbar ──────────────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out ${navActive
            ? "bg-surface/92 backdrop-blur-xl shadow-sm border-b border-outline-variant/20 py-2.5"
            : "bg-transparent py-4 border-b border-transparent"
          }`}
      >
        <div className="flex items-center justify-between w-full px-4 sm:px-6 md:px-8 lg:px-12 max-w-[1440px] mx-auto h-12">

          {/* ── Left: Hamburger (mobile) + Logo ───────────────────────────────── */}
          <div className="flex items-center gap-2 min-w-0">
            {/* Hamburger — mobile only */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={`md:hidden flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${isTransparent ? "text-white hover:bg-white/10" : "text-primary hover:bg-surface-container"
                }`}
              aria-label="Open navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Logo */}
            <Link
              href="/"
              className={`flex-shrink-0 hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded ${isTransparent ? "text-white" : "text-primary"
                }`}
              aria-label="Oxivos Fashion home"
            >
              <Logo className="text-base sm:text-lg md:text-xl" />
            </Link>
          </div>

          {/* ── Center: Desktop nav links ──────────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative px-3 py-1.5 text-[11px] lg:text-xs font-bold uppercase tracking-widest rounded transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${active
                      ? isTransparent
                        ? "text-white"
                        : "text-primary"
                      : isTransparent
                        ? "text-white/70 hover:text-white"
                        : "text-on-surface-variant hover:text-primary"
                    }`}
                >
                  {link.label}
                  {/* Active underline dot */}
                  {active && (
                    <span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ backgroundColor: "#800020" }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* ── Right: Icon actions ────────────────────────────────────────────── */}
          <div className={`flex items-center gap-0.5 sm:gap-1 ${isTransparent ? "text-white" : "text-primary"}`}>
            <ThemeToggle />

            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${isTransparent ? "hover:bg-white/10" : "hover:bg-surface-container"
                }`}
              aria-label="Search"
            >
              <Search className="w-4.5 h-4.5" />
            </button>

            {/* Wishlist — hidden on xs */}
            <Link
              href="/products?wishlist=true"
              className={`hidden sm:flex items-center justify-center w-9 h-9 rounded-lg relative transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${isTransparent ? "hover:bg-white/10" : "hover:bg-surface-container"
                }`}
              aria-label="Wishlist"
            >
              <Heart className="w-4.5 h-4.5" />
              {isMounted && wishlistItems.length > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full flex items-center justify-center font-bold text-[9px] bg-secondary text-on-secondary">
                  {wishlistItems.length > 9 ? "9+" : wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className={`flex items-center justify-center w-9 h-9 rounded-lg relative transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${isTransparent ? "hover:bg-white/10" : "hover:bg-surface-container"
                }`}
              aria-label="Cart"
            >
              <ShoppingBag className="w-4.5 h-4.5" />
              {isMounted && cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full flex items-center justify-center font-bold text-[9px] bg-primary text-on-primary">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── Mobile Drawer ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 340, damping: 34 }}
              className="fixed top-0 left-0 bottom-0 z-[70] w-[82vw] max-w-[340px] bg-surface shadow-2xl flex flex-col md:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-outline-variant/20">
                <Logo className="text-base text-primary" />
                <button
                  className="w-9 h-9 flex items-center justify-center rounded-lg text-primary hover:bg-surface-container transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto px-3 py-4">
                <ul className="space-y-1" role="list">
                  {navLinks.map((link, i) => {
                    const active = isLinkActive(link.href);
                    return (
                      <motion.li
                        key={link.label}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 + 0.05 }}
                      >
                        <Link
                          href={link.href}
                          className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-bold uppercase tracking-widest transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${active
                              ? "text-primary"
                              : "text-on-surface-variant hover:text-primary hover:bg-surface-container"
                            }`}
                          style={active ? { borderLeft: "3px solid #800020", paddingLeft: "13px" } : {}}
                        >
                          {link.label}
                          <ChevronRight className="w-4 h-4 opacity-40" />
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              {/* Drawer footer */}
              <div className="px-5 py-5 border-t border-outline-variant/20 space-y-3">
                {/* Wishlist + Cart quick links */}
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/products?wishlist=true"
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-surface-container text-on-surface-variant text-xs font-bold uppercase tracking-wider hover:text-primary transition-colors"
                  >
                    <Heart className="w-4 h-4" />
                    Wishlist
                    {isMounted && wishlistItems.length > 0 && (
                      <span className="ml-auto w-5 h-5 rounded-full bg-secondary text-on-secondary text-[9px] font-bold flex items-center justify-center">
                        {wishlistItems.length}
                      </span>
                    )}
                  </Link>
                  <Link
                    href="/cart"
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-surface-container text-on-surface-variant text-xs font-bold uppercase tracking-wider hover:text-primary transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Cart
                    {isMounted && cartCount > 0 && (
                      <span className="ml-auto w-5 h-5 rounded-full bg-primary text-on-primary text-[9px] font-bold flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant/60 text-xs">
                  <User className="w-4 h-4" />
                  <span className="font-semibold uppercase tracking-wider">Account</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ─── Full-screen Search Overlay ────────────────────────────────────────── */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            key="search"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[80] bg-surface/97 backdrop-blur-2xl flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Search"
          >
            <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-4 border-b border-outline-variant/20">
              <Logo className="text-sm sm:text-base text-primary" />
              <button
                className="w-9 h-9 flex items-center justify-center rounded-lg text-primary hover:bg-surface-container transition-colors focus:outline-none"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search input */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 pt-8 pb-6 max-w-2xl w-full mx-auto">
              <form onSubmit={handleSearchSubmit} className="relative mb-8">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/50" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, categories..."
                  className="w-full bg-transparent border-b-2 border-primary/40 focus:border-primary pl-8 pr-10 pb-3 text-xl sm:text-2xl font-heading text-primary focus:outline-none placeholder:text-on-surface-variant/30 transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-primary hover:opacity-70 transition-opacity"
                  aria-label="Submit search"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>

              {/* Results */}
              {searchResults.length > 0 && (
                <div className="space-y-2">
                  <p className="text-[10px] uppercase tracking-widest text-on-surface-variant/60 font-bold mb-3">
                    Results
                  </p>
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.id}`}
                      className="flex gap-4 p-3 hover:bg-surface-container rounded-xl transition-colors group"
                    >
                      <div className="w-14 h-16 sm:w-16 sm:h-20 bg-surface-container rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col justify-center min-w-0">
                        <h4 className="font-bold text-primary text-sm group-hover:underline truncate">{product.name}</h4>
                        <p className="text-[10px] text-on-surface-variant uppercase tracking-wider mt-0.5">{product.category}</p>
                        <p className="text-sm text-primary font-semibold mt-1">${product.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {searchQuery.trim() && searchResults.length === 0 && (
                <p className="text-on-surface-variant text-center mt-8 text-sm">
                  No results for <strong>"{searchQuery}"</strong>
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
