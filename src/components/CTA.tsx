import { ArrowRight } from "lucide-react";
import { siteContent } from "@/content/site";
import Button from "@/components/ui/Button";

export default function CTA() {
  const { cta } = siteContent;

  return (
    <section className="py-24 bg-surface" aria-label="Call to action">
      <div className="max-w-3xl mx-auto px-4 text-center relative">
        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, rgba(59,130,246,0.08) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10">
          <span className="inline-block px-3 py-1 text-xs font-medium text-primary border border-primary/30 rounded-full bg-primary/10 mb-6">
            {cta.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            {cta.title}
          </h2>
          <p className="text-lg text-muted mb-10">{cta.description}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href={cta.primaryButton.href} size="lg">
              {cta.primaryButton.label}
              <ArrowRight size={18} aria-hidden="true" />
            </Button>
            <Button href={cta.secondaryButton.href} variant="outline" size="lg">
              {cta.secondaryButton.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
