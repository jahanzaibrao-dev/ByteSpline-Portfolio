"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { siteContent } from "@/content/site";
import Button from "@/components/ui/Button";
import HeroVisual from "@/components/HeroVisual";

const ease = [0.21, 0.47, 0.32, 0.98] as const;

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease },
  };
}

export default function Hero() {
  const { hero } = siteContent;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
      aria-label="Hero"
    >
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 60% 40%, rgba(34,211,238,0.06) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* ── Text column ── */}
        <div className="flex flex-col gap-6 relative z-10">
          {/* Badge */}
          <motion.div {...fadeUp(0)}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/8 text-primary text-sm font-semibold">
              <span
                className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"
                aria-hidden="true"
              />
              {hero.badge}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...fadeUp(0.1)}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.08] tracking-tight"
          >
            <span className="text-foreground">{hero.titleLine1} </span>
            <span className="bg-linear-to-r from-primary via-cyan-300 to-accent bg-clip-text text-transparent">
              {hero.titleHighlight}
            </span>
            <span className="text-foreground"> {hero.titleLine2}</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            {...fadeUp(0.22)}
            className="text-lg text-foreground-dim leading-relaxed max-w-xl"
          >
            {hero.description}
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(0.34)} className="flex flex-col sm:flex-row gap-3">
            <Button href={hero.primaryCta.href} size="lg">
              {hero.primaryCta.label}
              <ArrowRight size={18} aria-hidden="true" />
            </Button>
            <Button href={hero.secondaryCta.href} variant="outline" size="lg">
              {hero.secondaryCta.label}
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            {...fadeUp(0.46)}
            className="flex gap-8 pt-4 border-t border-border/50"
          >
            {hero.stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-light mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Visual column (desktop only) ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="hidden lg:block relative"
          aria-hidden="true"
        >
          <HeroVisual />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#services"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted hover:text-primary transition-colors"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        aria-label="Scroll to services"
      >
        <ChevronDown size={22} />
      </motion.a>
    </section>
  );
}
