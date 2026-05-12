# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start dev server at http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serve the production build locally
npm run lint      # run ESLint
```

## Architecture

All UI lives in a single file: `src/fernanda-torcida-portfolio.jsx`. It exports one default component (`FernandaTorcida`) and is mounted directly in `src/main.jsx` — there is no router, no state manager, no additional components.

**File layout:**
- `src/fernanda-torcida-portfolio.jsx` — entire landing page + design tokens + global CSS string
- `src/main.jsx` — React root, mounts `<FernandaTorcida />`
- `index.html` — single entry point, title set here

**Inside `fernanda-torcida-portfolio.jsx`:**
- Two custom hooks at the top: `useParallax` (scroll-based image translate) and `useFadeIn` (IntersectionObserver entrance animation)
- The main component renders five sections in order: Hero → Statement → Practice → Selected Work → Collaborations → Contact
- Design tokens live in the `C` object (colors) and `FONT` object (font families) — both defined below the component
- Global CSS (Google Fonts import, reset, keyframes, responsive breakpoints) lives in the `CSS` template literal injected via `<style>{CSS}</style>`

## Design System

This project follows the **ElevenLabs design system** documented in `../design-systems/design-md/elevenlabs/DESIGN.md`.

Key rules to respect:
- **Display font:** EB Garamond weight 300, italic for headings — never bold
- **Body font:** Inter 400/500/600 for all UI text, nav, labels, buttons
- **CTA shape:** always `border-radius: 9999px` (pill) — no sharp buttons
- **Labels/badges:** Inter 12px, weight 600, `letter-spacing: 0.96px`, uppercase — this is the `caption-uppercase` token
- **Gradient orbs** (mint `#a7e5d3`, peach `#f4c5a8`, lavender `#c8b8e0`, sky `#a8c8e8`, rose `#e8b8c4`) are atmospheric decoration only — never use as button fills or text colors
- **Dark sections** use `C.surfaceDark` (`#0c0a09`) with `C.onDark` / `C.onDarkSoft` text
- **Light sections** use `C.canvas` (`#f5f5f5`) or `C.canvasSoft` (`#fafafa`) with `C.ink` / `C.body` text

## Responsive Strategy

Mobile-first. Breakpoints in the `CSS` string:
- `< 640px` — hamburger nav, full-bleed work images, single-column
- `≥ 640px` — desktop nav, work images offset with padding
- `≥ 768px` — clients grid goes 2-column

Font sizes use `clamp()` throughout — no need for separate font-size media queries.
