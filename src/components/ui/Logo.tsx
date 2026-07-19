import React from "react";
import { cn } from "../../lib/utils";

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => (
  <span className={cn("font-black tracking-tighter", className)}>
    OXIVOS{" "}
    <span className="italic font-black" style={{ color: "#800020" }}>
      Fashion
    </span>
    <span className="text-error font-black">.</span>
  </span>
);
