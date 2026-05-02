import { FadeUp } from "@/components/ui/FadeUp";

interface SectionHeaderProps {
  badge: string;
  title: string;
  description?: string;
  centered?: boolean;
}

export default function SectionHeader({
  badge,
  title,
  description,
  centered = true,
}: SectionHeaderProps) {
  const align = centered ? "text-center items-center" : "items-start";

  return (
    <div className={`flex flex-col ${align} mb-14 gap-4`}>
      <FadeUp>
        <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary border border-primary/25 rounded-full bg-primary/8">
          {badge}
        </span>
      </FadeUp>

      <FadeUp delay={0.08}>
        <h2
          className={`text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight ${centered ? "max-w-2xl mx-auto" : ""}`}
          style={{ whiteSpace: "pre-line" }}
        >
          {title}
        </h2>
      </FadeUp>

      {description && (
        <FadeUp delay={0.16}>
          <p
            className={`text-muted-light text-lg leading-relaxed ${centered ? "max-w-xl mx-auto" : "max-w-lg"}`}
          >
            {description}
          </p>
        </FadeUp>
      )}
    </div>
  );
}
