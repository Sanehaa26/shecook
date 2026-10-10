import React from "react";

export interface BadgeProps {
  children: React.ReactNode;
  variant?:
    | "terracotta"
    | "sage"
    | "neutral"
    | "outline"
    | "warning"
    | "veg"
    | "nonveg";
  size?: "sm" | "md";
  className?: string;
  dot?: boolean;
}

export function Badge({
  children,
  variant = "neutral",
  size = "md",
  className = "",
  dot = false,
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center font-medium rounded-full transition-colors select-none";

  const sizeStyles = {
    sm: "text-[11px] px-2.5 py-0.5 gap-1",
    md: "text-xs px-3 py-1 gap-1.5",
  };

  const variantStyles = {
    terracotta:
      "bg-[#FBEBE5] text-[#923A1A] border border-[#F6D4C7]/60",
    sage:
      "bg-[#EBF3EB] text-[#2C4A2D] border border-[#CDE1CE]",
    neutral:
      "bg-[#F4EFEA] text-stone-700 border border-[#E7DFD5]",
    outline:
      "bg-white text-stone-700 border border-[#DCD3C7]",
    warning:
      "bg-[#FEF5E7] text-[#9A6014] border border-[#FADBA8]",
    veg:
      "bg-[#EBF3EB] text-[#2C4A2D] border border-[#A7CDA8]",
    nonveg:
      "bg-[#FDF0EC] text-[#A33319] border border-[#F5C4B5]",
  };

  const dotColors = {
    terracotta: "bg-[#C85A32]",
    sage: "bg-[#426343]",
    neutral: "bg-stone-500",
    outline: "bg-stone-400",
    warning: "bg-amber-500",
    veg: "bg-[#2E7D32]",
    nonveg: "bg-[#C62828]",
  };

  return (
    <span
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full inline-block ${dotColors[variant]}`}
        />
      )}
      {children}
    </span>
  );
}
