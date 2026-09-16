import { StarIcon } from "lucide-react"

import { cn } from "@/lib/utils"

interface RatingStarsProps {
  rating: number
  size?: number
  className?: string
}

export function RatingStars({ rating, size = 14, className }: RatingStarsProps) {
  return (
    <div className={cn("flex items-center gap-0.5", className)} aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i + 1 <= Math.round(rating)
        return (
          <StarIcon
            key={i}
            style={{ width: size, height: size }}
            className={cn(
              filled ? "fill-gold text-gold" : "fill-muted text-border",
            )}
          />
        )
      })}
    </div>
  )
}
