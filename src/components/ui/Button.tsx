import React, { forwardRef } from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "sage";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = "",
      variant = "primary",
      size = "md",
      fullWidth = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none";

    const variantStyles = {
      primary:
        "bg-[#C85A32] text-white hover:bg-[#B04B25] active:bg-[#923A1A] focus:ring-[#C85A32] shadow-sm",
      secondary:
        "bg-[#FBEBE5] text-[#923A1A] hover:bg-[#F6D4C7] focus:ring-[#C85A32]",
      outline:
        "border border-[#E2D9CE] bg-white text-stone-800 hover:bg-[#FAF7F2] hover:border-[#C85A32] hover:text-[#C85A32] focus:ring-[#C85A32]",
      ghost:
        "text-stone-700 hover:bg-[#FAF7F2] hover:text-stone-900 focus:ring-stone-400",
      sage:
        "bg-[#E3EDE3] text-[#324C33] hover:bg-[#C7DCC7] focus:ring-[#547B55]",
    };

    const sizeStyles = {
      sm: "text-xs px-3 py-1.5 gap-1.5",
      md: "text-sm px-4 py-2.5 gap-2",
      lg: "text-base px-6 py-3 gap-2.5 font-semibold",
    };

    const widthStyle = fullWidth ? "w-full" : "";

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
