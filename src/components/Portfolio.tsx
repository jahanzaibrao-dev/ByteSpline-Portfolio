import { siteContent } from "@/content/site";
import SectionHeader from "@/components/SectionHeader";

export default function Portfolio() {
  const { portfolio } = siteContent;

  return (
    <section
      id="portfolio"
      className="py-24 bg-surface"
      aria-labelledby="portfolio-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={portfolio.sectionHeader.badge}
          title={portfolio.sectionHeader.title}
          description={portfolio.sectionHeader.description}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolio.items.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-border bg-card overflow-hidden hover:border-primary/40 transition-all duration-300 group"
            >
              {/* Placeholder visual */}
              <div className="h-48 relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-transparent">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-medium text-muted/60 uppercase tracking-widest">
                    {item.category}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
