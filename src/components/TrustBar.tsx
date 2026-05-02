import { siteContent } from "@/content/site";

export default function TrustBar() {
  const { trustBar } = siteContent;

  return (
    <section
      className="border-y border-border bg-surface py-8"
      aria-label="Technologies we use"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs text-muted/70 uppercase tracking-widest mb-6">
          {trustBar.label}
        </p>
        <ul
          className="flex flex-wrap justify-center items-center gap-x-10 gap-y-3"
          role="list"
        >
          {trustBar.technologies.map((tech) => (
            <li
              key={tech}
              className="text-sm font-medium text-muted/60 hover:text-muted transition-colors"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
