import Image from "next/image"
import Link from "next/link"

const CATEGORIES = [
  { label: "Erkaklar", href: "/catalog?gender=erkaklar", image: "/images/categories/men.png" },
  { label: "Ayollar", href: "/catalog?gender=ayollar", image: "/images/categories/women.png" },
  { label: "Sneakers", href: "/catalog?category=sneakers", image: "/images/categories/sneakers.png" },
  { label: "Sport", href: "/catalog?category=sport", image: "/images/categories/sport.png" },
  { label: "Classic", href: "/catalog?category=classic", image: "/images/categories/classic.png" },
]

export function CategorySection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <h2 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        Kategoriyalar
      </h2>
      <p className="mt-1.5 text-sm text-muted-foreground">
        O‘zingizga mos uslubni tanlang
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {CATEGORIES.map((cat, i) => (
          <Link
            key={cat.href}
            href={cat.href}
            className={`group relative overflow-hidden rounded-2xl bg-secondary ${
              i === 0 ? "col-span-2 md:col-span-1" : ""
            }`}
          >
            <div className="relative aspect-square">
              <Image
                src={cat.image || "/placeholder.svg"}
                alt={cat.label}
                fill
                sizes="(max-width: 768px) 50vw, 20vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent" />
            </div>
            <span className="absolute bottom-3 left-3 text-base font-bold text-white">
              {cat.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
