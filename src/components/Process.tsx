import { siteContent } from "@/content/site";
import SectionHeader from "@/components/SectionHeader";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/FadeUp";

export default function Process() {
  const { process } = siteContent;

  return (
    <section id="process" className="py-24 px-4" aria-labelledby="process-heading">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          badge={process.sectionHeader.badge}
          title={process.sectionHeader.title}
          description={process.sectionHeader.description}
        />

        <div className="relative">
          {/* Vertical connector line (mobile) */}
          <div
            className="lg:hidden absolute left-6 top-6 bottom-6 w-px bg-gradient-to-b from-primary/40 via-border to-transparent"
            aria-hidden="true"
          />

          {/* Horizontal connector line (desktop) */}
          <div
            className="hidden lg:block absolute top-7 left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-border to-transparent"
            aria-hidden="true"
          />

          <StaggerContainer className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4">
            {process.steps.map((step) => (
              <StaggerItem key={step.number}>
                <div className="flex lg:flex-col items-start lg:items-center gap-5 lg:gap-4 lg:text-center pl-14 lg:pl-0">
                  {/* Number badge */}
                  <div className="relative z-10 shrink-0 w-12 h-12 lg:mx-auto rounded-full border-2 border-primary/40 bg-card flex items-center justify-center shadow-md shadow-primary/10">
                    <span className="text-sm font-bold text-primary">
                      {step.number}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-foreground mb-1.5">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-light leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
