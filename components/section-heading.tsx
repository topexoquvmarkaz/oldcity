import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

interface SectionHeadingProps {
  title: string
  subtitle?: string
  href?: string
  linkLabel?: string
}

export function SectionHeading({
  title,
  subtitle,
  href,
  linkLabel = "Barchasi",
}: SectionHeadingProps) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <h2 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="group flex shrink-0 items-center gap-1 text-sm font-medium text-foreground transition-colors hover:text-gold"
        >
          {linkLabel}
          <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  )
}
