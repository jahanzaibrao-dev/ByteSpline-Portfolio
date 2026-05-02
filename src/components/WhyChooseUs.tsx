import {
  Code2,
  Clock,
  MessageCircle,
  Shield,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import { siteContent } from "@/content/site";
import SectionHeader from "@/components/SectionHeader";

const iconMap: Record<string, LucideIcon> = {
  Code2,
  Clock,
  MessageCircle,
  Shield,
  TrendingUp,
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {whyChooseUs.items.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <article
                key={item.title}
                className="p-6 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-card-hover transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Icon
                      className="text-primary"
                      size={18}
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-muted text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
