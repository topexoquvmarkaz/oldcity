import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRightIcon } from "lucide-react"

import { ProductDetail } from "@/components/product/product-detail"
import { ProductGrid } from "@/components/product/product-grid"
import { SectionHeading } from "@/components/section-heading"
import {
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/products"

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return { title: "Mahsulot topilmadi" }
  return {
    title: product.name,
    description: product.description,
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const related = getRelatedProducts(product)

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground"
      >
        <Link href="/" className="transition-colors hover:text-gold">
          Bosh sahifa
        </Link>
        <ChevronRightIcon className="size-3.5" />
        <Link href="/catalog" className="transition-colors hover:text-gold">
          Katalog
        </Link>
        <ChevronRightIcon className="size-3.5" />
        <Link
          href={`/catalog?category=${product.category}`}
          className="transition-colors hover:text-gold"
        >
          {product.categoryLabel}
        </Link>
        <ChevronRightIcon className="size-3.5" />
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="mt-6">
        <ProductDetail product={product} />
      </div>

      <section className="mt-16">
        <SectionHeading
          title="O‘xshash mahsulotlar"
          href="/catalog"
        />
        <ProductGrid className="mt-8" products={related} />
      </section>
    </div>
  )
}
