import { Sparkles, Code2, Zap, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { siteContent } from "@/content/site";

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  Code2,
  Zap,
  TrendingUp,
};

export default function HighlightsStrip() {
  const { highlights } = siteContent;

  return (
    <section
      className="border-y border-border/60 bg-surface/60 backdrop-blur-sm py-5"
      aria-label="Key highlights"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul
          className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4"
          role="list"
        >
          {highlights.map((item) => {
            const Icon = iconMap[item.icon] ?? Zap;
            return (
              <li
                key={item.label}
                className="flex items-center gap-2 text-sm font-medium text-muted-light"
              >
                <Icon size={15} className="text-primary shrink-0" aria-hidden="true" />
                {item.label}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
