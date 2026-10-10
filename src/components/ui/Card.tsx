import React from "react";

export function Card({
  className = "",
  children,
  onClick,
  interactive = false,
}: {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  interactive?: boolean;
}) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl border border-[#ECE5DC] shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden transition-all duration-200 ${
        interactive
          ? "cursor-pointer hover:shadow-md hover:border-[#DFCFC0] hover:-translate-y-0.5"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={`p-5 sm:p-6 pb-2 ${className}`}>{children}</div>;
}

export function CardTitle({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <h3
      className={`text-lg sm:text-xl font-semibold tracking-tight text-stone-900 ${className}`}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p className={`text-sm text-stone-600 mt-1 leading-relaxed ${className}`}>
      {children}
    </p>
  );
}

export function CardContent({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={`p-5 sm:p-6 pt-2 ${className}`}>{children}</div>;
}

export function CardFooter({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`p-5 sm:p-6 pt-3 border-t border-[#F2ECE3] bg-[#FCFAF6] flex items-center justify-between ${className}`}
    >
      {children}
    </div>
  );
}
