"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Footer } from "./Footer";

export const ConditionalFooter: React.FC = () => {
  const pathname = usePathname();
  
  // Show footer ONLY on the home page
  if (pathname === "/") {
    return <Footer />;
  }
  
  return null;
};
