"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Monitor,
  Rocket,
  Layers,
  BrainCircuit,
  Palette,
  type LucideIcon,
} from "lucide-react";
import { siteContent } from "@/content/site";
import SectionHeader from "@/components/SectionHeader";
import { StaggerContainer, StaggerItem } from "@/components/ui/FadeUp";

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Monitor,
  Rocket,
  Layers,
  BrainCircuit,
  Palette,
};

export default function Services() {
  const { services } = siteContent;

  return (
    <section id="services" className="py-24 px-4" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge={services.sectionHeader.badge}
          title={services.sectionHeader.title}
          description={services.sectionHeader.description}
        />

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.items.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <StaggerItem key={service.title}>
                <motion.article
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="h-full p-6 rounded-2xl border border-border bg-card hover:border-primary/35 hover:bg-card-hover transition-colors duration-300 group cursor-default"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary/18 group-hover:border-primary/35 transition-colors duration-300">
                    <Icon
                      className="text-primary"
                      size={22}
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                    {service.title}
                  </h3>
                  <p className="text-muted-light text-sm leading-relaxed">
                    {service.description}
                  </p>
                </motion.article>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
