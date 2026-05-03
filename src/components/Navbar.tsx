"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteContent } from "@/content/site";
import Button from "@/components/ui/Button";

function Logo() {
  return (
    <Link
      href="#home"
      className="flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded"
      aria-label="ByteSpline Tech — home"
    >
      {/* Swap in next/image when /public/logo.png is available */}
      {/* <Image src="/logo.png" alt="ByteSpline Tech" width={140} height={36} priority className="h-8 w-auto" /> */}
      <span className="text-lg font-bold tracking-tight">
        <span className="text-primary">ByteSpline</span>
        <span className="text-foreground"> Tech</span>
      </span>
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { nav } = siteContent;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border/60 shadow-lg shadow-background/30"
          : "bg-transparent"
      }`}
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        <Logo />

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-7" role="list">
          {nav.links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-muted-light hover:text-foreground transition-colors duration-150"
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

        {/* Mobile toggle */}
        <button
          className="md:hidden text-muted-light hover:text-foreground transition-colors p-1"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-surface/95 backdrop-blur-xl border-b border-border/60"
          >
            <div className="px-4 pb-5 pt-3 space-y-1">
              {nav.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-2.5 text-sm font-medium text-muted-light hover:text-foreground transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3">
                <Button
                  href="#contact"
                  size="sm"
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  {nav.cta}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
