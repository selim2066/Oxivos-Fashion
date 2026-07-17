"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../lib/types';

interface WishlistContextType {
  wishlistItems: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: number) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    try {
      const storedWishlist = localStorage.getItem('oxivos_wishlist');
      if (storedWishlist) {
        setWishlistItems(JSON.parse(storedWishlist));
      }
    } catch (error) {
      console.error('Failed to load wishlist from localStorage:', error);
    }
    setIsInitialized(true);
  }, []);

  // Save wishlist to localStorage on change
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem('oxivos_wishlist', JSON.stringify(wishlistItems));
    } catch (error) {
      console.error('Failed to save wishlist to localStorage:', error);
    }
  }, [wishlistItems, isInitialized]);

  const toggleWishlist = (product: Product) => {
    setWishlistItems((prevItems) => {
      const exists = prevItems.some((item) => item.id === product.id);
      if (exists) {
        return prevItems.filter((item) => item.id !== product.id);
      } else {
        return [...prevItems, product];
      }
    });
  };

  const isInWishlist = (productId: number) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
