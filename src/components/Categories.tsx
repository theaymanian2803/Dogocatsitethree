import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, PawPrint } from "lucide-react";
import bed from "@/assets/product-bed.jpg";
import bone from "@/assets/product-bone.jpg";
import collar from "@/assets/product-collar.jpg";
import food from "@/assets/product-food.jpg";
import groom from "@/assets/product-groom.jpg";
import biscuit from "@/assets/product-biscuit.jpg";
import { turso } from "@/integrations/turso/client";
import { useI18n } from "@/lib/i18n";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type CategoryRow = { id: string; name: string; slug: string; image: string | null };

const fallbackImages: Record<string, string> = {
  groom,
  collar,
  bed,
  dogs: bone,
  foods: food,
  cats: biscuit,
  toys: biscuit,
};

function CategoryTile({ category, index }: { category: CategoryRow; index: number }) {
  const { t } = useI18n();
  const tone = index % 2 === 0 ? "bg-primary" : "bg-accent";
  const img = category.image || fallbackImages[category.slug] || "";

  return (
    <Link
      to={`/category/${category.slug}`}
      className={`group flex aspect-[3/2] flex-col rounded-[2rem] p-4 text-center card-lift md:p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${tone}`}
    >
      <h3 className="min-h-[2.5rem] font-display text-base font-bold tracking-tight uppercase text-primary-foreground sm:text-lg line-clamp-1">
        {category.name}
      </h3>
      <div className="flex flex-1 items-center justify-center py-3">
        {img ? (
          <img
            src={img}
            alt={category.name}
            loading="lazy"
            width={800}
            height={800}
            className="h-full w-full rounded-[1.25rem] bg-white object-contain p-2 transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <span className="grid h-full w-full place-items-center rounded-[1.25rem] bg-white/90">
            <PawPrint className="h-10 w-10 text-accent" />
          </span>
        )}
      </div>
      <div className="flex justify-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-primary shadow-sm transition-all hover:opacity-90 active:scale-95">
          {t("hero.shop")} <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}

export function Categories() {
  const { t } = useI18n();
  const [categories, setCategories] = useState<CategoryRow[]>([]);

  useEffect(() => {
    turso
      .execute("SELECT id, name, slug, image FROM categories ORDER BY name")
      .then(({ rows }) => setCategories(rows as unknown as CategoryRow[]))
      .catch(() => setCategories([]));
  }, []);

  if (categories.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="text-center">
        <h2 className="font-display text-4xl font-bold md:text-5xl">{t("categories.title")}</h2>
        <div className="squiggle mx-auto mt-5" />
      </div>

      {categories.length > 3 ? (
        <div className="mt-14 px-2 sm:px-10">
          <Carousel opts={{ align: "start" }} className="w-full">
            <CarouselContent className="-ml-2 sm:-ml-4">
              {categories.map((c, i) => (
                <CarouselItem
                  key={c.id}
                  className="basis-1/2 pl-2 sm:basis-1/3 sm:pl-4 lg:basis-1/4"
                >
                  <CategoryTile category={c} index={i} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
      ) : (
        <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3">
          {categories.map((c, i) => (
            <CategoryTile key={c.id} category={c} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}
