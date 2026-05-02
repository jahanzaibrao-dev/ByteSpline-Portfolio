import { siteContent } from "@/content/site";
import SectionHeader from "@/components/SectionHeader";

export default function Process() {
  const { process } = siteContent;

  return (
    <section id="process" className="py-24 px-4" aria-labelledby="process-heading">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge={process.sectionHeader.badge}
          title={process.sectionHeader.title}
          description={process.sectionHeader.description}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector line (large screens) */}
          <div
            className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-border to-transparent"
            aria-hidden="true"
          />

          {process.steps.map((step) => (
            <article key={step.number} className="flex flex-col items-center text-center">
              <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-2 border-primary/40 bg-primary/10 text-primary font-bold text-lg mb-5 shrink-0">
                {step.number}
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
