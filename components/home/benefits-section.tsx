import Link from "next/link"
import {
  ShieldCheckIcon,
  TruckIcon,
  SendIcon,
  RefreshCwIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { SOCIAL } from "@/lib/config"

const BENEFITS = [
  {
    icon: ShieldCheckIcon,
    title: "Original sifat",
    text: "Har bir juft poyabzal sifat nazoratidan o‘tadi.",
  },
  {
    icon: TruckIcon,
    title: "Tez yetkazib berish",
    text: "Toshkent bo‘ylab 1-2 kun ichida yetkazamiz.",
  },
  {
    icon: RefreshCwIcon,
    title: "Almashtirish",
    text: "O‘lcham to‘g‘ri kelmasa, 3 kun ichida almashtiramiz.",
  },
  {
    icon: SendIcon,
    title: "Telegram buyurtma",
    text: "Buyurtmani to‘g‘ridan-to‘g‘ri Telegram orqali bering.",
  },
]

export function BenefitsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {BENEFITS.map((b) => (
          <div
            key={b.title}
            className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5"
          >
            <div className="flex size-11 items-center justify-center rounded-xl bg-soft-yellow text-charcoal">
              <b.icon className="size-5.5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                {b.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {b.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function TelegramCta() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-charcoal px-6 py-12 text-center sm:px-12 sm:py-16">
        <div className="pointer-events-none absolute -left-10 -top-10 size-48 rounded-full bg-gold/20 blur-3xl" />
        <div className="relative">
          <h2 className="text-balance text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Buyurtmani Telegram orqali bering
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-pretty text-sm leading-relaxed text-white/70">
            Mahsulotni tanlang, savatchaga qo‘shing va bir tugma bilan
            buyurtmangizni bizga yuboring. Tez va oson.
          </p>
          <Button
            nativeButton={false}
            className="mt-7 h-12 bg-gold px-7 text-base text-primary-foreground hover:bg-gold-hover"
            render={
              <a
                href={SOCIAL.telegram}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            <SendIcon className="size-4.5" />
            Telegramda yozish
          </Button>
        </div>
      </div>
    </section>
  )
}
