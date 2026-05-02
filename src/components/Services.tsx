import {
  Globe,
  LayoutTemplate,
  Layers,
  Smartphone,
  BrainCircuit,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { siteContent } from "@/content/site";
import SectionHeader from "@/components/SectionHeader";

const iconMap: Record<string, LucideIcon> = {
  Globe,
  LayoutTemplate,
  Layers,
  Smartphone,
  BrainCircuit,
  Zap,
};

export default function Services() {
  const { services } = siteContent;

  return (
    <section
      id="services"
      className="py-24 px-4"
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge={services.sectionHeader.badge}
          title={services.sectionHeader.title}
          description={services.sectionHeader.description}
        />
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          role="list"
        >
          {services.items.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <article
                key={service.title}
                className="p-6 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-card-hover transition-all duration-300 group"
                role="listitem"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon
                    className="text-primary"
                    size={22}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {service.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
