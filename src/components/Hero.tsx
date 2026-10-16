import { Link } from "react-router-dom";
import { ArrowRight, PawPrint, Star } from "lucide-react";
import heroPets from "@/assets/hero-pets.jpg";
import { useSettings } from "@/hooks/useSettings";
import { useI18n } from "@/lib/i18n";

export function Hero() {
  const { settings } = useSettings();
  const { t } = useI18n();
  const lines = settings.hero_title.split("\n");

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Warm backdrop accents */}
      <div className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-secondary/60 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-16 md:py-24 lg:grid-cols-2 lg:gap-16">
        {/* Copy */}
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
            <PawPrint className="h-3.5 w-3.5" />
            {settings.hero_badge}
          </span>

          <h1
            data-tour="home-hero"
            className="mt-6 font-display text-5xl font-bold leading-[1.02] tracking-tight text-foreground md:text-6xl xl:text-7xl"
          >
            {lines.map((line, i) => (
              <span
                key={line}
                className={`block ${i === lines.length - 1 ? "italic text-accent" : ""}`}
              >
                {line}
              </span>
            ))}
          </h1>

          <div className="squiggle mt-6" />

          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
            {settings.hero_subtitle}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              to="/shop"
              data-tour="home-shop"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-accent-foreground transition-all hover:-translate-y-0.5 hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/25"
            >
              {t("hero.shop")} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/shop"
              className="inline-flex items-center justify-center rounded-full border border-border bg-card px-8 py-3.5 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent"
            >
              {t("nav.categories")}
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-3 border-t border-border pt-6">
            <div className="flex gap-0.5 text-accent">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Loved by <span className="font-semibold text-foreground">2,000+</span> pet parents
            </p>
          </div>
        </div>

        {/* Visual */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="absolute -right-4 -top-6 h-36 w-36 rounded-[3rem] bg-accent/15 rotate-12" />
          <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-secondary" />

          <div className="relative overflow-hidden rounded-t-[999px] rounded-b-[2.5rem] border border-border shadow-2xl shadow-foreground/15">
            <img
              src={settings.hero_image || heroPets}
              alt={settings.hero_image ? settings.brand_name : "Puppy and kitten with bowl of food"}
              width={1024}
              height={1024}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>

          <div className="absolute -left-4 bottom-8 rounded-2xl border border-border bg-card px-5 py-4 shadow-xl shadow-foreground/10 md:-left-8">
            <p className="font-display text-2xl font-bold text-accent">400+</p>
            <p className="text-xs font-medium text-muted-foreground">happy pets served</p>
          </div>
        </div>
      </div>
    </section>
  );
}
