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
  return (
    <div className={`mb-14 ${centered ? "text-center" : ""}`}>
      <span className="inline-block px-3 py-1 text-xs font-medium text-primary border border-primary/30 rounded-full bg-primary/10 mb-4">
        {badge}
      </span>
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
        {title}
      </h2>
      {description && (
        <p
          className={`text-muted text-lg ${centered ? "max-w-2xl mx-auto" : "max-w-xl"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
