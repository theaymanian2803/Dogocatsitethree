# Hearth & Hound (dogositethree) Redesign — Design

Date: 2026-09-14
Status: Approved by user in chat

## Purpose

dogositethree is the third template in the PetPals family being sold from the same
onboarding/storefront/admin product. Functionally identical to dogositetwo, it gets an
entirely new visual identity: **"warm editorial premium"**, sold under the brand name
**Hearth & Hound**. It must read as a distinct product from site 1 (light orange, pill
radius) and site 2 (light green, soft radius).

## Approach

Start from the dogositetwo copy (already created and building), restyle the visual layer
top to bottom, then update brand copy. No functional, schema, route, or dependency
changes. No new packages — the existing Fraunces + Poppins import stays, re-voiced for an
editorial warm feel.

## Brand

- Name: **Hearth & Hound**.
- Touchpoints to rename: `index.html` title/meta, `PRODUCT.md`, brand copy in
  `src/lib/i18n.tsx`, `src/lib/infoPages.tsx`, `src/lib/sampleData.ts`, admin header/login
  copy, onboarding tour copy that mentions PetPals.
- Demo credentials hint (admin@gmail.com / admin123) stays.

## Design system (`src/styles.css` tokens + `@theme`)

Warm editorial premium palette (oklch):

| Token                | Value                     |
| -------------------- | ------------------------- |
| `--background`       | `oklch(0.985 0.01 85)`    | warm cream
| `--foreground`       | `oklch(0.27 0.02 45)`     | espresso
| `--card`             | `oklch(0.995 0.006 85)`   | warm white
| `--card-foreground`  | `oklch(0.27 0.02 45)`     |
| `--secondary`        | `oklch(0.955 0.015 80)`   | warm sand
| `--secondary-foreground` | `oklch(0.4 0.03 45)`  |
| `--muted`            | `oklch(0.95 0.015 80)`    |
| `--muted-foreground` | `oklch(0.52 0.025 45)`    |
| `--accent`           | `oklch(0.58 0.14 38)`     | terracotta
| `--accent-foreground`| `oklch(0.99 0.01 85)`     | cream
| `--border`           | `oklch(0.9 0.015 80)`     | warm taupe
| `--radius`           | `1.5rem`                  |

- Typography: keep `--font-display: Fraunces` + `--font-sans: Poppins`; editorial voice
  via heavier serif weights, tighter leading on display, uppercase tracked section labels,
  generous vertical rhythm.
- Buttons: terracotta `btn-accent`, cream-on-espresso `btn-primary`, thin warm borders.
- Shadows: warm-tinted, low-opacity (e.g. `0 20px 60px -20px oklch(0.27 0.02 45 / 0.25)`).

## Redesign scope

### Storefront components
- `SiteHeader.tsx` — cream header, editorial wordmark (terracotta paw mark), warm mega
  menu, refined search bar.
- `Hero.tsx` — warm editorial hero: cream/espresso gradient over imagery, larger serif
  headline, terracotta CTA, refined badge.
- `Categories.tsx` — terracotta/sand editorial category tiles (replacing site 2's green
  masonry).
- `ProductCard.tsx` / `ProductGrid.tsx` — warm cards, serif product names, terracotta
  price/CTA accents.
- `TrustBar.tsx`, `PromoBanner.tsx`, `ReviewsSection.tsx`, `SectionBanner.tsx`,
  `SectionGrid.tsx`, `SectionProducts.tsx`, `BestProducts.tsx`, `SiteFooter.tsx`,
  `FloatingContact.tsx`, `DemoBanner.tsx` — restyled to tokens (no structural change).

### Pages
Shop, Product, Category, Cart, Checkout, Account, Auth/Login/Register, Track,
OrderConfirmed, InfoPage, NotFound — token-driven restyle, warm editorial treatment of
cards/forms/tables/empty states.

### Admin + onboarding
- `Admin.tsx` (and its sub-sections) — warm editorial dashboard: terracotta accents on
  active nav/tabs, warm cards for stats/orders/products/categories, consistent form fields.
- `OnboardingDialog.tsx` + `TursoSettingsDialog.tsx` — restyled to the new tokens, tour
  copy updated to "Hearth & Hound".

### Copy / data
- `sampleData.ts` info pages and any brand copy → Hearth & Hound.
- `.env` unchanged (same demo Turso creds, gitignored).

## Out of scope

- Any functional, schema, routing, auth, or feature change.
- New dependencies or font swaps.
- Touching dogositeone / dogositetwo.

## Verification

- `bun run lint` on changed files.
- `bun run build`.
- Dev-server walkthrough of storefront, admin, and onboarding to confirm warm editorial
  identity reads consistently and nothing is visually broken.