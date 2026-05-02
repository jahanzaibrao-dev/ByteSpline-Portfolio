"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { siteContent } from "@/content/site";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { nav } = siteContent;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        <Link href="/" className="text-xl font-bold text-foreground">
          <span className="text-primary">Byte</span>Spline
        </Link>

        <ul className="hidden md:flex items-center gap-8" role="list">
          {nav.links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button href="#contact" size="sm">
            {nav.cta}
          </Button>
        </div>

        <button
          className="md:hidden text-muted hover:text-foreground transition-colors"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-surface border-b border-border px-4 pb-4"
        >
          <ul className="flex flex-col gap-3 pt-3" role="list">
            {nav.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block text-sm text-muted hover:text-foreground transition-colors py-1"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <Button
              href="#contact"
              size="sm"
              className="w-full"
              onClick={() => setMenuOpen(false)}
            >
              {nav.cta}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
