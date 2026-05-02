import { siteContent } from "@/content/site";
import SectionHeader from "@/components/SectionHeader";
import { FadeUp } from "@/components/ui/FadeUp";

export default function About() {
  const { about } = siteContent;

  return (
    <section
      id="about"
      className="py-24 bg-surface/50"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Text */}
          <div>
            <SectionHeader
              badge={about.sectionHeader.badge}
              title={about.sectionHeader.title}
              centered={false}
            />
            <FadeUp delay={0.1} className="space-y-4">
              {about.paragraphs.map((p, i) => (
                <p key={i} className="text-foreground-dim leading-relaxed">
                  {p}
                </p>
              ))}
            </FadeUp>
          </div>

          {/* Stats grid */}
          <FadeUp delay={0.2}>
            <div className="grid grid-cols-2 gap-4">
              {about.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="p-6 rounded-2xl border border-border bg-card hover:border-primary/30 transition-colors duration-300 group"
                >
                  <div className="text-4xl font-bold text-primary mb-1 group-hover:scale-105 transition-transform duration-200 origin-left">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-light">{stat.label}</div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
