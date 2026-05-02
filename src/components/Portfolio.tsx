"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
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
                {/* Visual header */}
                <div
                  className={`h-44 relative bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}
                >
                  {/* Grid pattern overlay */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
                      backgroundSize: "24px 24px",
                    }}
                  />
                  <span className="relative text-xs font-semibold uppercase tracking-widest text-foreground-dim/60">
                    {project.type}
                  </span>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

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

                  <button
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-primary transition-colors duration-200 cursor-default"
                    aria-label={`View case study for ${project.title} (coming soon)`}
                    disabled
                  >
                    View Case Study
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </button>
                </div>
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
