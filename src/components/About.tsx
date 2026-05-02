import { siteContent } from "@/content/site";
import SectionHeader from "@/components/SectionHeader";

export default function About() {
  const { about } = siteContent;

  return (
    <section
      id="about"
      className="py-24 bg-surface"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeader
              badge={about.sectionHeader.badge}
              title={about.sectionHeader.title}
              centered={false}
            />
            <div className="space-y-4">
              {about.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-muted leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {about.stats.map((stat) => (
              <div
                key={stat.label}
                className="p-6 rounded-xl border border-border bg-card text-center hover:border-primary/30 transition-colors"
              >
                <div className="text-3xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
