import { ArrowRight } from "lucide-react";
import { siteContent } from "@/content/site";
import Button from "@/components/ui/Button";
import { FadeUp } from "@/components/ui/FadeUp";

export default function CTA() {
  const { cta } = siteContent;

  return (
    <section className="py-24 relative overflow-hidden" aria-label="Call to action">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(34,211,238,0.07) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      {/* Subtle border strip */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" aria-hidden="true" />

      <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
        <FadeUp>
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary border border-primary/25 rounded-full bg-primary/8 mb-6">
            {cta.badge}
          </span>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h2
            className="text-4xl md:text-5xl font-bold text-foreground mb-5 leading-tight"
            style={{ whiteSpace: "pre-line" }}
          >
            {cta.title}
          </h2>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p className="text-lg text-foreground-dim mb-10 leading-relaxed">
            {cta.description}
          </p>
        </FadeUp>

        <FadeUp delay={0.28}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href={cta.primaryCta.href} size="lg">
              {cta.primaryCta.label}
              <ArrowRight size={18} aria-hidden="true" />
            </Button>
            <Button href={cta.secondaryCta.href} variant="outline" size="lg">
              {cta.secondaryCta.label}
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
