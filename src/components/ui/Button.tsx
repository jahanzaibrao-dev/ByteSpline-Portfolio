"use client";

import Link from "next/link";
import { type ReactNode } from "react";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const base =
  "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer select-none";

const variants = {
  primary:
    "bg-primary text-background hover:bg-primary-hover shadow-lg shadow-primary/20 hover:shadow-primary/35 hover:-translate-y-0.5 active:translate-y-0 active:shadow-primary/20",
  outline:
    "border border-border hover:border-primary/50 text-foreground hover:text-primary bg-transparent hover:-translate-y-0.5 active:translate-y-0",
  ghost: "text-muted-light hover:text-foreground bg-transparent",
};

const sizes = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-5 py-2.5 text-sm gap-2",
  lg: "px-7 py-3.5 text-base gap-2",
};

export default function Button({
  href,
  onClick,
  variant = "primary",
  size = "md",
  children,
  className = "",
  type = "button",
  disabled = false,
}: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${
    disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
  } ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls} aria-disabled={disabled} tabIndex={disabled ? -1 : undefined}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}
