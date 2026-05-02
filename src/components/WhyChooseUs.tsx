"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Layers,
  Palette,
  Zap,
  MessageCircle,
  Users,
  type LucideIcon,
} from "lucide-react";
import { siteContent } from "@/content/site";
import SectionHeader from "@/components/SectionHeader";
import { StaggerContainer, StaggerItem } from "@/components/ui/FadeUp";

const iconMap: Record<string, LucideIcon> = {
  Code2,
  Layers,
  Palette,
  Zap,
  MessageCircle,
  Users,
};

export default function WhyChooseUs() {
  const { whyChooseUs } = siteContent;

  return (
    <section id="why-us" className="py-24 px-4" aria-labelledby="why-heading">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge={whyChooseUs.sectionHeader.badge}
          title={whyChooseUs.sectionHeader.title}
          description={whyChooseUs.sectionHeader.description}
        />

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {whyChooseUs.items.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <StaggerItem key={item.title}>
                <motion.article
                  whileHover={{ y: -3, transition: { duration: 0.18 } }}
                  className="p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:bg-card-hover transition-colors duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/18 transition-colors duration-200">
                      <Icon
                        className="text-primary"
                        size={18}
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors duration-200">
                        {item.title}
                      </h3>
                      <p className="text-muted-light text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.article>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
