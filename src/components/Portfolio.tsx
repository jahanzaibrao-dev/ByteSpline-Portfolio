"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Lock } from "lucide-react";
import { siteContent } from "@/content/site";
import SectionHeader from "@/components/SectionHeader";
import { StaggerContainer, StaggerItem } from "@/components/ui/FadeUp";

export default function Portfolio() {
  const { portfolio } = siteContent;

  return (
    <section
      id="work"
      className="py-24 bg-surface/50"
      aria-labelledby="portfolio-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={portfolio.sectionHeader.badge}
          title={portfolio.sectionHeader.title}
          description={portfolio.sectionHeader.description}
        />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolio.items.map((project) => (
            <StaggerItem key={project.title}>
              <motion.article
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="h-full rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/35 transition-colors duration-300 group flex flex-col"
              >
                {/* ── Card visual header ── */}
                <div
                  className={`h-44 relative bg-gradient-to-br ${project.gradient} overflow-hidden`}
                >
                  {project.image ? (
                    /* Real screenshot */
                    <>
                      <Image
                        src={project.image}
                        alt={`Screenshot of ${project.title}`}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {/* Subtle dark gradient at bottom for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-card/60 via-transparent to-transparent" />
                    </>
                  ) : project.image === null ? (
                    /* NDA placeholder */
                    <>
                      <div
                        className="absolute inset-0 opacity-15"
                        style={{
                          backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
                          backgroundSize: "24px 24px",
                        }}
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                        <div className="w-9 h-9 rounded-full bg-border/60 border border-border flex items-center justify-center">
                          <Lock
                            size={16}
                            className="text-muted-light/70"
                            aria-hidden="true"
                          />
                        </div>
                        <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-light/60">
                          Protected by Client NDA
                        </span>
                      </div>
                    </>
                  ) : (
                    /* Fallback: category label (no image field set) */
                    <>
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
                          backgroundSize: "24px 24px",
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-semibold uppercase tracking-widest text-foreground-dim/60">
                          {project.type}
                        </span>
                      </div>
                    </>
                  )}

                  {/* Hover shimmer */}
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* ── Card body ── */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full bg-primary/8 text-primary border border-primary/20 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-muted-light text-sm leading-relaxed flex-1">
                    {project.description}
                  </p>
                </div>
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
