import Link from "next/link"
import { CameraIcon, SendIcon } from "lucide-react"

import { SITE, SOCIAL } from "@/lib/config"
import { MAIN_NAV } from "@/lib/nav"

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-secondary">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight text-foreground">
                {SITE.name}
              </span>
              <span className="size-1.5 rounded-full bg-gold" aria-hidden />
            </Link>
            <p className="mt-3 max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
              {SITE.description}
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex size-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:border-gold hover:text-gold"
              >
                <CameraIcon className="size-4.5" />
              </a>
              <a
                href={SOCIAL.telegram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="flex size-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:border-gold hover:text-gold"
              >
                <SendIcon className="size-4.5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Katalog</h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {MAIN_NAV.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Aloqa</h3>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm text-muted-foreground">
              <li>Toshkent sh., O‘zbekiston</li>
              <li>Har kuni: 09:00 — 21:00</li>
              <li>
                <a
                  href={SOCIAL.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-gold"
                >
                  Telegram orqali buyurtma
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {SITE.name}. Barcha huquqlar himoyalangan.
        </div>
      </div>
    </footer>
  )
}
