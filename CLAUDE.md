# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint check
npx tsc --noEmit # TypeScript check without building
```

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **Tailwind CSS v4** — configured entirely in CSS via `@theme` in [src/app/globals.css](src/app/globals.css), no `tailwind.config.ts`
- **Framer Motion** — scroll animations (`FadeUp`, `StaggerContainer`), hero entrance, hover effects
- **TypeScript 5**
- **Urbanist** (Google Font) — loaded via `next/font/google`, variable `--font-urbanist`
- **lucide-react v1** — brand icons (Github, Twitter, LinkedIn) were removed in v1; use inline SVGs instead

## Architecture

Single-page portfolio site for ByteSpline Tech. The root page ([src/app/page.tsx](src/app/page.tsx)) composes all section components in order. Components are Server Components by default; `'use client'` is added only where browser APIs, event handlers, or Framer Motion are needed.

### Content

All text, labels, and data live in **[src/content/site.ts](src/content/site.ts)**. Edit that file to change any copy, section content, service items, portfolio entries, process steps, or contact details — no component changes needed.

### Key Components

| File                                                                 | Notes                                                                                               |
| -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| [src/components/ui/Button.tsx](src/components/ui/Button.tsx)         | Renders `<Link>` when `href` is set, `<button>` otherwise. Variants: `primary`, `outline`, `ghost`  |
| [src/components/ui/FadeUp.tsx](src/components/ui/FadeUp.tsx)         | `FadeUp`, `StaggerContainer`, `StaggerItem` — Framer Motion scroll-reveal wrappers (`'use client'`) |
| [src/components/SectionHeader.tsx](src/components/SectionHeader.tsx) | Badge + h2 + description; uses `FadeUp` internally                                                  |
| [src/components/HeroVisual.tsx](src/components/HeroVisual.tsx)       | Abstract CSS/SVG/Framer Motion 3D placeholder. See inline comments to swap in Spline or R3F         |
| [src/components/Navbar.tsx](src/components/Navbar.tsx)               | Fixed header, scroll-aware blur, animated mobile menu (`AnimatePresence`)                           |
| [src/components/Services.tsx](src/components/Services.tsx)           | Icon map keyed on string names from `site.ts`; add icons to `iconMap` if extending                  |
| [src/components/WhyChooseUs.tsx](src/components/WhyChooseUs.tsx)     | Same icon-map pattern as Services                                                                   |
| [src/components/Footer.tsx](src/components/Footer.tsx)               | Social icons are inline SVG components (GitHub, LinkedIn, Twitter)                                  |

### Logo

No logo file yet. Navbar and Footer show a text fallback (`ByteSpline Tech`).  
To activate the image logo: place `logo.png` in `/public/` and uncomment the `<Image>` tags in both Navbar and Footer.

### 3D Hero Placeholder

[src/components/HeroVisual.tsx](src/components/HeroVisual.tsx) is the placeholder. It uses animated SVG spline curves, floating orbs, and a CSS grid. Comments inside describe exactly how to replace it with a Spline embed (`@splinetool/react-spline`) or React Three Fiber canvas.

### Tailwind v4 custom tokens

Defined in `@theme` block in [globals.css](src/app/globals.css):

| Token                    | Class prefix                  | Value              |
| ------------------------ | ----------------------------- | ------------------ |
| `--color-background`     | `bg-background`               | `#050d1a`          |
| `--color-surface`        | `bg-surface`                  | `#081525`          |
| `--color-card`           | `bg-card`                     | `#0b1a2e`          |
| `--color-card-hover`     | `bg-card-hover`               | `#0f2038`          |
| `--color-border`         | `border-border`               | `#162c48`          |
| `--color-primary`        | `text-primary` / `bg-primary` | `#22d3ee` (cyan)   |
| `--color-primary-hover`  | `bg-primary-hover`            | `#06b6d4`          |
| `--color-accent`         | `text-accent`                 | `#818cf8` (indigo) |
| `--color-muted`          | `text-muted`                  | `#64748b`          |
| `--color-muted-light`    | `text-muted-light`            | `#94a3b8`          |
| `--color-foreground`     | `text-foreground`             | `#f1f5f9`          |
| `--color-foreground-dim` | `text-foreground-dim`         | `#cbd5e1`          |

### Framer Motion patterns

- **Scroll reveal**: wrap any section content in `<FadeUp delay={0.1}>` or `<StaggerContainer>` + `<StaggerItem>`
- **`ease` arrays**: must use `as const` to satisfy TypeScript — `ease: [0.21, 0.47, 0.32, 0.98] as const`
- **Hero entrance**: uses `fadeUp(delay)` helper that returns `initial`/`animate`/`transition` props directly (avoids Framer `Variants` function overload TS issue)
