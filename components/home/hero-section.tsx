import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-charcoal text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:gap-6 lg:py-20 lg:px-8">
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-beige">
            <span className="size-1.5 rounded-full bg-gold" />
            Yangi 2026 kolleksiya
          </span>
          <h1 className="mt-5 text-balance text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Har qadamda
            <br />
            <span className="text-gold">o‘z uslubingni</span> ko‘rsat
          </h1>
          <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-white/70">
            Zamonaviy, sifatli va qulay oyoq kiyimlar. Sneakers, sport,
            klassik va botinkalar — hammasi bir joyda.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              nativeButton={false}
              className="h-12 bg-gold px-6 text-base text-primary-foreground hover:bg-gold-hover"
              render={<Link href="/catalog" />}
            >
              Xarid qilish
              <ArrowRightIcon className="size-4.5" />
            </Button>
            <Button
              variant="outline"
              nativeButton={false}
              className="h-12 border-white/20 bg-transparent px-6 text-base text-white hover:bg-white/10 hover:text-white"
              render={<Link href="/catalog?category=sneakers" />}
            >
              Sneakers
            </Button>
          </div>

          <dl className="mt-10 flex gap-8">
            <div>
              <dt className="text-2xl font-bold text-white">12+</dt>
              <dd className="text-xs text-white/60">Model</dd>
            </div>
            <div>
              <dt className="text-2xl font-bold text-white">5</dt>
              <dd className="text-xs text-white/60">Kategoriya</dd>
            </div>
            <div>
              <dt className="text-2xl font-bold text-white">24/7</dt>
              <dd className="text-xs text-white/60">Telegram buyurtma</dd>
            </div>
          </dl>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:aspect-square">
            <Image
              src="/images/hero.png"
              alt="STEP premium oyoq kiyimlar kolleksiyasi"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="pointer-events-none absolute -bottom-6 -right-6 hidden size-40 rounded-full bg-gold/20 blur-3xl lg:block" />
        </div>
      </div>
    </section>
  )
}
