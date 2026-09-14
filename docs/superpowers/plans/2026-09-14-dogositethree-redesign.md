# Hearth & Hound (dogositethree) Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle dogositethree into "Hearth & Hound", a warm editorial premium pet-store template distinct from sites 1 and 2.

**Architecture:** Token-first redesign. The single design-system file `src/styles.css` carries the new palette/typography/radius; nearly every component already styles itself with semantic tokens (`bg-primary`, `text-accent`, `bg-card`, `border-border`, `font-display`), so the token swap re-skins the whole app. Remaining work is targeted editorial lifts on hero/header/cards, a hardcoded-color sweep, and the Hearth & Hound copy rename.

**Tech Stack:** React 19 + Vite 7 + Tailwind CSS v4 (oklch tokens in `@theme inline`) + Fraunces/Poppins (Google Fonts import in `styles.css`), Turso/libSQL, react-router-dom.

**Spec:** `docs/superpowers/specs/2026-09-14-dogositethree-redesign-design.md`

## Global Constraints

- **No functional, schema, route, auth, or feature changes.** Only markup classes, tokens, copy, and metadata.
- **No new dependencies and no font swaps.** Keep the existing Fraunces + Poppins Google Fonts import.
- **Brand name: "Hearth & Hound"** everywhere user-facing (titles, admin, onboarding, info pages, settings default). Do not rename files, routes, package names, or the docs history.
- **Palette (oklch), verbatim from spec:**
  - `--background: oklch(0.985 0.01 85)` (warm cream)
  - `--foreground: oklch(0.27 0.02 45)` (espresso)
  - `--card: oklch(0.995 0.006 85)`, `--card-foreground: oklch(0.27 0.02 45)`
  - `--secondary: oklch(0.955 0.015 80)`, `--secondary-foreground: oklch(0.4 0.03 45)`
  - `--muted: oklch(0.95 0.015 80)`, `--muted-foreground: oklch(0.52 0.025 45)`
  - `--accent: oklch(0.58 0.14 38)` (terracotta), `--accent-foreground: oklch(0.99 0.01 85)`
  - `--border: oklch(0.9 0.015 80)`, `--input: oklch(0.9 0.015 80)`, `--ring: oklch(0.58 0.14 38)`
  - `--radius: 1.5rem`
- **Preserve `data-tour` attributes** on every element that carries them (`home-hero`, `home-shop`, `nav-shop`, `nav-search`, `nav-cart`, `nav-admin`, `connect-button`) — the onboarding tour targets them.
- **Preserve** the demo-credentials hint on `Login.tsx` (admin@gmail.com / admin123).
- Do not modify `dogositeone/`, `dogositetwo/`, or any file outside `dogositethree/`.
- `.env` is untouched (gitignored demo Turso creds).
- Success/semantic green (`emerald`) is allowed to stay for status/in-stock/free-shipping semantics; only **brand greens** (FloatingContact button) become terracotta.

---

### Task 1: Design-system token overhaul (`src/styles.css`)

**Files:**
- Modify: `src/styles.css`

**Interfaces:** Produces the token vocabulary every later task consumes: `bg-primary` (espresso), `text-accent`/`bg-accent` (terracotta), `bg-background` (cream), `bg-card`, `bg-secondary`, `bg-muted`, `border-border`, `bg-hero`, `bg-promo`, `font-display`. No component needs new utility classes — the warm palette flows through the existing Tailwind token classes.

- [ ] **Step 1: Replace the `:root` token block with the warm editorial palette**

In `src/styles.css`, replace the entire `:root { ... }` block (lines 38–62) with:

```css
:root {
  --radius: 1.5rem;
  --background: oklch(0.985 0.01 85);
  --foreground: oklch(0.27 0.02 45);
  --card: oklch(0.995 0.006 85);
  --card-foreground: oklch(0.27 0.02 45);
  --popover: oklch(0.995 0.006 85);
  --popover-foreground: oklch(0.27 0.02 45);
  --primary: oklch(0.3 0.03 45);
  --primary-foreground: oklch(0.99 0.01 85);
  --secondary: oklch(0.955 0.015 80);
  --secondary-foreground: oklch(0.4 0.03 45);
  --muted: oklch(0.95 0.015 80);
  --muted-foreground: oklch(0.52 0.025 45);
  --accent: oklch(0.58 0.14 38);
  --accent-foreground: oklch(0.99 0.01 85);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.99 0.01 85);
  --border: oklch(0.9 0.015 80);
  --input: oklch(0.9 0.015 80);
  --ring: oklch(0.58 0.14 38);
  --hero: oklch(0.96 0.015 80);
  --promo: oklch(0.93 0.03 60);
}
```

- [ ] **Step 2: Sharpen the editorial base heading style**

In `@layer base`, change the heading rules (currently `font-weight: 600; letter-spacing: -0.02em;`) to:

```css
  h1,
  h2,
  h3,
  h4 {
    font-family: var(--font-display);
    font-weight: 700;
    letter-spacing: -0.03em;
  }
```

- [ ] **Step 3: Re-tint the `.squiggle` divider to terracotta**

The `.squiggle` utility (line 97–103) has a hardcoded green stroke `%233c9a62`. Replace the URL's stroke value with terracotta `%23b4553d` (keep everything else identical):

```css
  .squiggle {
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 12' fill='none' stroke='%23b4553d' stroke-width='2.5'><path d='M0 6 Q 8 0 16 6 T 32 6 T 48 6 T 64 6 T 80 6 T 96 6'/></svg>");
    background-repeat: no-repeat;
    background-size: contain;
    height: 12px;
    width: 120px;
  }
```

- [ ] **Step 4: Verify**

Run: `bun run lint` and `bun run build` in `dogositethree/`.
Expected: lint passes (repo CRLF warnings are pre-existing), build succeeds.
Optionally start `bun run dev` and confirm the homepage renders in warm cream/terracotta/espresso with no green left.

- [ ] **Step 5: Commit**

```bash
git add src/styles.css
git commit -m "feat: apply warm editorial design tokens (Hearth & Hound)"
```

---

### Task 2: Brand rename — Hearth & Hound copy

**Files:**
- Modify: `index.html`, `PRODUCT.md`, `src/hooks/useSettings.tsx`, `src/lib/infoPages.tsx`, `src/pages/Admin.tsx`, `src/pages/Index.tsx`, `src/pages/Shop.tsx`, `src/pages/Product.tsx`, `src/pages/Category.tsx`, `src/pages/Cart.tsx`, `src/pages/Checkout.tsx`, `src/pages/Account.tsx`, `src/pages/Auth.tsx`, `src/pages/Login.tsx`, `src/pages/Register.tsx`, `src/pages/Track.tsx`, `src/pages/OrderConfirmed.tsx`, `src/components/OnboardingDialog.tsx`

**Interfaces:** Consumes nothing from Task 1. Produces the correct user-facing brand string "Hearth & Hound" used by every later visual task.

- [ ] **Step 1: `index.html`**

`<title>` → `Hearth & Hound — Premium Food & Supplies for Dogs and Cats`; `meta description` → `Shop premium pet food, beds, collars, grooming and more at Hearth & Hound.`

- [ ] **Step 2: `PRODUCT.md`**

Replace the four PetPals name references (lines 11, 15, 38 `Name: PetPals.`, 49) with "Hearth & Hound". Keep the rest of the product description intact.

- [ ] **Step 3: `src/hooks/useSettings.tsx`**

`brand_name: "PetPals"` → `"Hearth & Hound"`; `contact_email: "hello@petpals.com"` → `"hello@hearthandhound.com"`. Leave all other defaults unchanged.

- [ ] **Step 4: `src/lib/infoPages.tsx`**

Replace every "PetPals" occurrence (About title + body line 54, Careers title + "Why PetPals" line 228, Press intro + lines 260/267/270) with "Hearth & Hound". Keep surrounding copy.

- [ ] **Step 5: `src/pages/Admin.tsx`**

Replace: line 118 `user_name: "PetPals Team"` → `"Hearth & Hound Team"`; line 298 `document.title = "Admin — PetPals"` → `"Admin — Hearth & Hound"`; line 444 "manage PetPals" → "manage Hearth & Hound"; line 945 header brand span `PetPals` → `Hearth & Hound`; line 2274 placeholder `e.g. PetPals Team` → `e.g. Hearth & Hound Team`. No other Admin.tsx changes in this task.

- [ ] **Step 6: `src/components/OnboardingDialog.tsx`**

Line 34 step title `"Welcome to PetPals"` → `"Welcome to Hearth & Hound"`. Grep the file for any other "PetPals" and replace.

- [ ] **Step 7: Page `document.title` swaps**

In each of these pages, replace `PetPals` with `Hearth & Hound` in the `document.title` assignment, keeping the surrounding wording:
- `Index.tsx` (line 18) — also use the full `"Hearth & Hound — Premium Food & Supplies for Dogs and Cats"`
- `Shop.tsx` (42), `Product.tsx` (93), `Category.tsx` (27), `Cart.tsx` (23), `Account.tsx` (42), `Auth.tsx` (15), `Login.tsx` (21), `Register.tsx` (22), `Track.tsx` (150), `OrderConfirmed.tsx` (14)

- [ ] **Step 8: `src/pages/Checkout.tsx` WhatsApp order message**

Line 163 `"🐾 *New Order Request — PetPals*"` → `"🐾 *New Order Request — Hearth & Hound*"`.

- [ ] **Step 9: Verify no stray brand names**

Run in `dogositethree/`: `grep -rn "PetPals" src index.html PRODUCT.md`
Expected: only hits inside `docs/` (historical specs/plans) may remain — `src/`, `index.html`, `PRODUCT.md` must be clean.

- [ ] **Step 10: Lint, build, commit**

Run: `bun run lint` and `bun run build`. Then:

```bash
git add index.html PRODUCT.md src/hooks/useSettings.tsx src/lib/infoPages.tsx src/pages/Admin.tsx src/pages/Index.tsx src/pages/Shop.tsx src/pages/Product.tsx src/pages/Category.tsx src/pages/Cart.tsx src/pages/Checkout.tsx src/pages/Account.tsx src/pages/Auth.tsx src/pages/Login.tsx src/pages/Register.tsx src/pages/Track.tsx src/pages/OrderConfirmed.tsx src/components/OnboardingDialog.tsx
git commit -m "feat: rebrand copy to Hearth & Hound"
```

---

### Task 3: Storefront chrome (header, trust bar, demo banner, footer, floating contact)

**Files:**
- Modify: `src/components/SiteHeader.tsx`, `src/components/TrustBar.tsx`, `src/components/DemoBanner.tsx`, `src/components/SiteFooter.tsx`, `src/components/FloatingContact.tsx`

**Interfaces:** Consumes Task 1 tokens. Preserves `data-tour="nav-shop"`, `nav-search`, `nav-cart`, `nav-admin`, `connect-button` exactly.

- [ ] **Step 1: `SiteHeader.tsx` — editorial wordmark + terracotta accents**

- Logo fallback (line 318): `bg-primary text-primary-foreground` → `bg-accent text-accent-foreground` so the paw mark is terracotta. Keep size classes.
- Active nav underline (line 336): `after:bg-primary` → `after:bg-accent`.
- Desktop nav hover (line 335/345) already uses `hover:text-accent` — no change.
- Mega menu category icon (line 384): `bg-accent/10 text-accent group-hover:bg-primary group-hover:text-white` → keep `bg-accent/10 text-accent`, change hover to `group-hover:bg-accent group-hover:text-accent-foreground`.
- Search input focus (lines 286, 493): `focus:border-accent` stays; add `focus:ring-accent/25` consistency — leave as-is if already present.
- Do **not** alter any `data-tour` attribute or the header structure/logic.

- [ ] **Step 2: `TrustBar.tsx` — no change needed**

Verify it reads well on the new cream background (`bg-secondary/40`, `text-muted-foreground`, `text-accent` icons). No edits required.

- [ ] **Step 3: `DemoBanner.tsx` — no change needed**

Tokens (`bg-accent/5`, `text-accent`, `bg-primary`) re-skin automatically. Confirm `data-tour="connect-button"` untouched.

- [ ] **Step 4: `SiteFooter.tsx` — warm espresso footer**

- `bg-primary text-primary-foreground` (line 40) now renders espresso — keep.
- Logo fallback (line 51): `🐾` emoji → replace with a `PawPrint` icon from `lucide-react` rendered in terracotta (`text-accent`), keeping the `bg-primary-foreground/10` well. Import `PawPrint` alongside the existing lucide imports.
- Footer heading accent (line 100 `text-primary-foreground/60`) and link hover (line 106 `hover:text-accent`) — token-driven, no change.

- [ ] **Step 5: `FloatingContact.tsx` — terracotta WhatsApp button**

Line 20: `bg-emerald-500 text-white shadow-lg shadow-emerald-500/30` → `bg-accent text-accent-foreground shadow-lg shadow-accent/30`.

- [ ] **Step 6: Verify, lint, build, commit**

Run: `bun run lint` and `bun run build`.
Then:

```bash
git add src/components/SiteHeader.tsx src/components/SiteFooter.tsx src/components/FloatingContact.tsx
git commit -m "feat: warm editorial header, footer, and contact chrome"
```

---

### Task 4: Homepage sections (hero, categories, promo, best, reviews, dynamic sections)

**Files:**
- Modify: `src/components/Hero.tsx`, `src/components/Categories.tsx`, `src/components/PromoBanner.tsx`, `src/components/BestProducts.tsx`, `src/components/ReviewsSection.tsx`, `src/components/SectionBanner.tsx`, `src/components/SectionGrid.tsx`, `src/components/SectionProducts.tsx`

**Interfaces:** Consumes Task 1 tokens. Preserves `data-tour="home-hero"` and `data-tour="home-shop"` on Hero.

- [ ] **Step 1: `Hero.tsx` — terracotta CTA + warm gradient**

- Primary CTA (line 37, `className="btn-accent gap-2"`): keep `btn-accent`, but swap the button to terracotta by replacing `btn-accent` with `inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-accent-foreground transition-all hover:-translate-y-0.5 hover:bg-accent/90`.
- Secondary CTA (line 42 `border-white/40 bg-white/10`): keep — re-skins via backdrop.
- Gradient overlay (line 19): `from-foreground/85 via-foreground/50 to-foreground/15` stays (espresso overlay is warm).
- Headline (line 24 `font-display text-5xl font-bold ... md:text-7xl`): keep — Task 1 already set heading weight 700/tracking.
- Badge (line 47): keep.
- Verify `data-tour="home-hero"` (line 23) and `data-tour="home-shop"` (line 37) are unchanged.

- [ ] **Step 2: `Categories.tsx` — warm editorial tiles**

- Tiles use `tone` classes `bg-primary` / `bg-accent` (lines 11–28) — these now render espresso/terracotta automatically. **No tone change.**
- Update the two code comments (line 40 "equal-width green tiles", line 65 "inverted on green") to say "terracotta/espresso tiles" / "inverted on color".
- Tile title (line 49 `text-primary-foreground`): keep.
- Shop pill (line 67 `bg-primary-foreground ... text-primary`): keep — inverts warm.
- Card radius (line 46 `rounded-[2rem]`): keep.

- [ ] **Step 3: `PromoBanner.tsx` — token re-skin only**

- Card surface (line 33 `bg-card`) and price (line 44 `text-accent`) re-skin automatically. `btn-dark` (line 48) is now espresso — keep. No edits required.

- [ ] **Step 4: `BestProducts.tsx`, `ReviewsSection.tsx` — token re-skin only**

Both use `bg-card`, `text-accent`, `bg-primary` badges, `font-display` headings — no edits required. Confirm serif headings look editorial (they do via Task 1).

- [ ] **Step 5: `SectionBanner.tsx`, `SectionGrid.tsx`, `SectionProducts.tsx` — token re-skin only**

- `SectionBanner` uses `bg-promo` (now warm) and `bg-card/95` panel + `btn-dark` — no edits.
- `SectionGrid` label overlay `bg-foreground/60` (espresso) — no edits.
- `SectionProducts` renders `ProductCard` (Task 5) — no edits.

- [ ] **Step 6: Verify, lint, build, commit**

Run: `bun run lint` and `bun run build`.
Then:

```bash
git add src/components/Hero.tsx src/components/Categories.tsx
git commit -m "feat: warm editorial homepage sections"
```

---

### Task 5: Product surfaces and catalog pages

**Files:**
- Modify: `src/components/ProductCard.tsx`, `src/components/ProductGrid.tsx`, `src/pages/Shop.tsx`, `src/pages/Product.tsx`, `src/pages/Category.tsx`

**Interfaces:** Consumes Task 1 tokens.

- [ ] **Step 1: `ProductCard.tsx` — warm editorial card**

- Card surface (line 23 `rounded-[2.5rem] bg-card ... card-lift`): keep radius, add warm border `border border-border/60` and swap shadow to `shadow-sm shadow-foreground/5`.
- Badge (line 28 `bg-primary text-primary-foreground`): keep (espresso).
- Name (line 42 `font-display ... text-foreground`): keep.
- Price (line 56 `text-lg font-bold text-accent`): keep (terracotta).
- Add-to-cart (line 70 `bg-primary ... text-primary-foreground`): keep (espresso).

- [ ] **Step 2: `ProductGrid.tsx` — verify only**

Read it; it composes `ProductCard`. Confirm no hardcoded colors. No edits expected.

- [ ] **Step 3: `src/pages/Shop.tsx` — token re-skin + warm touches**

Read the file. Replace any hardcoded color classes found; confirm headings use `font-display`, filter chips use `bg-secondary`/`border-border`, prices use `text-accent`. Fix the emerald **only if** it is a brand accent, not a status (there is none expected in Shop). No structural changes.

- [ ] **Step 4: `src/pages/Product.tsx` — token re-skin**

Read the file (25KB). Replace hardcoded colors with tokens where they are brand accents. The in-stock line 605 `text-emerald-600` is **semantic** — keep. Confirm `document.title` already reads "Hearth & Hound" (Task 2). No structural changes.

- [ ] **Step 5: `src/pages/Category.tsx` — verify only**

Read it; confirm token-driven (likely grid of `ProductCard`). No edits expected beyond any hardcoded color found.

- [ ] **Step 6: Verify, lint, build, commit**

Run: `bun run lint` and `bun run build`.
Then:

```bash
git add src/components/ProductCard.tsx src/pages/Shop.tsx src/pages/Product.tsx src/pages/Category.tsx
git commit -m "feat: warm editorial product surfaces and catalog pages"
```

---

### Task 6: Commerce and account pages

**Files:**
- Modify: `src/pages/Cart.tsx`, `src/pages/Checkout.tsx`, `src/pages/OrderConfirmed.tsx`, `src/pages/Track.tsx`, `src/pages/Account.tsx`, `src/pages/Auth.tsx`, `src/pages/Login.tsx`, `src/pages/Register.tsx`, `src/pages/InfoPage.tsx`, `src/pages/NotFound.tsx`

**Interfaces:** Consumes Task 1 tokens. Preserves the demo-credentials hint on `Login.tsx`.

- [ ] **Step 1: `Checkout.tsx` — terracotta pay CTA**

Line 348 (pay button `border-emerald-600 bg-emerald-600 ... text-white`): → `border-accent bg-accent ... text-accent-foreground` (keep all hover/active classes). Line 96 (`text-emerald-600` free-shipping note) is **semantic** — keep.

- [ ] **Step 2: `Track.tsx` + `Account.tsx` — keep semantic status pills**

Lines `Track.tsx:32` and `Account.tsx:29` (`bg-emerald-50 text-emerald-700 ring-emerald-600/20` etc.) are order-status semantics — keep. Confirm no brand-green elsewhere.

- [ ] **Step 3: `InfoPage.tsx` — warm header re-skin**

Line 55 `bg-hero` and line 57 `bg-promo/40` now render warm (Task 1). Read and confirm the header uses `font-display` and warm surfaces; fix any hardcoded color found. No structural changes.

- [ ] **Step 4: `Auth.tsx`, `Login.tsx`, `Register.tsx`, `Cart.tsx`, `OrderConfirmed.tsx`, `NotFound.tsx` — verify + token re-skin**

Read each; replace hardcoded brand colors with tokens; confirm `font-display` headings, `bg-card` surfaces, `text-accent` links/CTAs, espresso `bg-primary` primary buttons. Preserve the Login demo-credentials hint block exactly.

- [ ] **Step 5: Verify, lint, build, commit**

Run: `bun run lint` and `bun run build`.
Then:

```bash
git add src/pages/Cart.tsx src/pages/Checkout.tsx src/pages/OrderConfirmed.tsx src/pages/Track.tsx src/pages/Account.tsx src/pages/Auth.tsx src/pages/Login.tsx src/pages/Register.tsx src/pages/InfoPage.tsx src/pages/NotFound.tsx
git commit -m "feat: warm editorial commerce and account pages"
```

---

### Task 7: Admin panel

**Files:**
- Modify: `src/pages/Admin.tsx` (104KB), `src/components/admin/ControlsManager.tsx`

**Interfaces:** Consumes Task 1 tokens. Brand copy was already renamed in Task 2 — do not repeat it here.

- [ ] **Step 1: Read `Admin.tsx` fully and inventory hardcoded colors**

Grep within `src/pages/Admin.tsx` for: `emerald`, `green`, `#hex`. The emerald hits at lines 210–211 (status pill/dot), 1559 (approved review status), 1620 (approved-review button), 1733 (`bg-emerald-400` custom-config indicator) are **semantic statuses** — keep. Confirm there are no other brand greens.

- [ ] **Step 2: Token re-skin of admin chrome**

- Sidebar/nav active states: confirm they use `bg-accent`/`text-accent` (re-skin automatically). If any hardcoded green is used as the admin's active accent, swap it to `bg-accent`/`text-accent`.
- Stat cards, tables, forms: confirm `bg-card`, `border-border`, `bg-secondary`, `bg-muted`, `font-display` headings — swap any hardcoded colors to tokens.
- Chart colors in any dashboard charts: keep existing chart palette if it reads fine on cream; no new deps.

- [ ] **Step 3: `ControlsManager.tsx` — token re-skin**

Read it; swap hardcoded colors to tokens; confirm brand rename placeholder (Task 2) is intact.

- [ ] **Step 4: Verify, lint, build, commit**

Run: `bun run lint` and `bun run build`.
Then:

```bash
git add src/pages/Admin.tsx src/components/admin/ControlsManager.tsx
git commit -m "feat: warm editorial admin panel"
```

---

### Task 8: Onboarding and database-settings dialogs

**Files:**
- Modify: `src/components/OnboardingDialog.tsx`, `src/components/TursoSettingsDialog.tsx`

**Interfaces:** Consumes Task 1 tokens. `SettingsDialogProvider.tsx` and `src/lib/settingsDialog.ts` need no changes (they are the shell).

- [ ] **Step 1: `OnboardingDialog.tsx` — warm editorial tour**

- Read the file. Swap hardcoded colors to tokens (`bg-card`, `border-border`, `bg-accent` for the primary step button, `text-accent` for highlights).
- Step 1 title already says "Hearth & Hound" (Task 2).
- Preserve all `data-tour` targeting and the step ordering, including the last step that opens the settings dialog.

- [ ] **Step 2: `TursoSettingsDialog.tsx` — token re-skin**

- Read the file. Connected/demo indicators (lines 111, 150 `bg-emerald-400` / `text-emerald-500`) are **semantic** — keep.
- Confirm form fields use `bg-secondary`/`border-border`, primary save button uses `bg-primary`, and the dialog card uses `bg-card`. Swap any hardcoded brand colors.

- [ ] **Step 3: Verify, lint, build, commit**

Run: `bun run lint` and `bun run build`.
Then:

```bash
git add src/components/OnboardingDialog.tsx src/components/TursoSettingsDialog.tsx
git commit -m "feat: warm editorial onboarding and DB settings"
```

---

### Task 9: Final verification sweep

**Files:**
- None (verification only; fix stragglers inline if found)

**Interfaces:** Confirms the whole spec is satisfied.

- [ ] **Step 1: Brand-name sweep**

Run in `dogositethree/`: `grep -rn "PetPals" src index.html PRODUCT.md`
Expected: zero matches outside `docs/`.

- [ ] **Step 2: Green sweep**

Run: `grep -rn "emerald\|bg-green\|text-green\|3c9a62" src --include=*.tsx`
Expected: only semantic-status emerald in `Admin.tsx`, `Track.tsx`, `Account.tsx`, `TursoSettingsDialog.tsx`, `Checkout.tsx` (free note), `Product.tsx` (in-stock). No `FloatingContact` green, no `#3c9a62`.

- [ ] **Step 3: data-tour integrity**

Run: `grep -rn "data-tour" src`
Expected: `home-hero`, `home-shop`, `nav-shop`, `nav-search`, `nav-cart`, `nav-admin`, `connect-button` all present.

- [ ] **Step 4: Full checks**

Run: `bun run lint` and `bun run build` — both green.

- [ ] **Step 5: Visual walkthrough (manual, with the user)**

Start `bun run dev`; walk storefront (home, shop, product, cart, checkout), admin, and onboarding. Confirm the warm editorial identity reads consistently. Fix any visual straggler found (commit as `style: polish Hearth & Hound visual details`).

---