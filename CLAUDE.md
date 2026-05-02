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

- **Next.js 16** (App Router, Turbopack, static export)
- **React 19**
- **Tailwind CSS v4** — configured entirely in CSS via `@theme` in [src/app/globals.css](src/app/globals.css), no `tailwind.config.ts`
- **TypeScript 5**
- **lucide-react v1** — brand icons (Github, Twitter, LinkedIn) were removed in v1; use inline SVGs instead

## Architecture

Single-page marketing site. The root page ([src/app/page.tsx](src/app/page.tsx)) composes all section components in order. Components are Server Components by default; `'use client'` is only added where browser APIs or event handlers are needed (`Navbar`, `Contact`, `ui/Button`).

### Content

All text, labels, and data live in **[src/content/site.ts](src/content/site.ts)**. Edit that file to change any copy, section content, service items, portfolio entries, process steps, or contact details — no component changes needed.

### Components

| File | Notes |
|------|-------|
| [src/components/ui/Button.tsx](src/components/ui/Button.tsx) | Renders `<Link>` when `href` is set, `<button>` otherwise. Variants: `primary`, `outline`, `ghost` |
| [src/components/SectionHeader.tsx](src/components/SectionHeader.tsx) | Reusable badge + h2 + description block used by every section |
| [src/components/Navbar.tsx](src/components/Navbar.tsx) | Fixed header, scroll-aware blur, mobile hamburger menu |
| [src/components/Services.tsx](src/components/Services.tsx) | Icon map keyed on string names from `site.ts`; add icons to `iconMap` if extending |
| [src/components/WhyChooseUs.tsx](src/components/WhyChooseUs.tsx) | Same icon-map pattern as Services |
| [src/components/Footer.tsx](src/components/Footer.tsx) | Social icons are inline SVG components (GitHub, LinkedIn, Twitter) |

### Tailwind v4 custom tokens

Defined in `@theme` block in [globals.css](src/app/globals.css):

| Token | Class prefix | Value |
|-------|-------------|-------|
| `--color-background` | `bg-background` | `#0a0b14` |
| `--color-surface` | `bg-surface` | `#0f1120` |
| `--color-card` | `bg-card` | `#131628` |
| `--color-card-hover` | `bg-card-hover` | `#1a1f36` |
| `--color-border` | `border-border` | `#1e2444` |
| `--color-primary` | `text-primary` / `bg-primary` | `#3b82f6` |
| `--color-primary-hover` | `bg-primary-hover` | `#2563eb` |
| `--color-accent` | `text-accent` | `#6366f1` |
| `--color-muted` | `text-muted` | `#94a3b8` |
| `--color-foreground` | `text-foreground` | `#f1f5f9` |
