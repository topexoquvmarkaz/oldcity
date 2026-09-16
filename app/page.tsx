import {
  BenefitsSection,
  TelegramCta,
} from "@/components/home/benefits-section"
import { CategorySection } from "@/components/home/category-section"
import { HeroSection } from "@/components/home/hero-section"
import { ProductGrid } from "@/components/product/product-grid"
import { SectionHeading } from "@/components/section-heading"
import { getFeaturedProducts, getNewArrivals } from "@/lib/products"

export default function HomePage() {
  const featured = getFeaturedProducts()
  const newArrivals = getNewArrivals()

  return (
    <>
      <HeroSection />

      <div className="pt-10">
        <BenefitsSection />
      </div>

      <CategorySection />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Tavsiya etamiz"
          subtitle="Eng ko‘p tanlanadigan va chegirmadagi modellar"
          href="/catalog"
        />
        <ProductGrid className="mt-8" products={featured} priorityCount={4} />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeading
          title="Yangi kelganlar"
          subtitle="So‘nggi qo‘shilgan modellar"
          href="/catalog"
        />
        <ProductGrid className="mt-8" products={newArrivals} />
      </section>

      <TelegramCta />
    </>
  )
}
