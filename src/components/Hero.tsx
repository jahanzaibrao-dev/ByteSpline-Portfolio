import { ArrowRight, ChevronDown } from "lucide-react";
import { siteContent } from "@/content/site";
import Button from "@/components/ui/Button";

export default function Hero() {
  const { hero } = siteContent;

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-16"
      aria-label="Hero"
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.14) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/5 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-8">
          <span
            className="w-2 h-2 rounded-full bg-primary animate-pulse"
            aria-hidden="true"
          />
          {hero.badge}
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
          <span className="text-foreground">{hero.title.start}</span>
          <span
            className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent"
          >
            {hero.title.highlight}
          </span>
          <span className="text-foreground">{hero.title.end}</span>
        </h1>

        <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10">
          {hero.description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button href={hero.primaryButton.href} size="lg">
            {hero.primaryButton.label}
            <ArrowRight size={18} aria-hidden="true" />
          </Button>
          <Button href={hero.secondaryButton.href} variant="outline" size="lg">
            {hero.secondaryButton.label}
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-sm mx-auto border-t border-border/50 pt-10">
          {hero.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-foreground">
                {stat.value}
              </div>
              <div className="text-xs text-muted mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted animate-bounce"
        aria-hidden="true"
      >
        <ChevronDown size={24} />
      </div>
    </section>
  );
}
