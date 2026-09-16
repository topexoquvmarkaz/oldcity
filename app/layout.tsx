import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import { MobileBottomNav } from '@/components/layout/mobile-bottom-nav'
import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import { StoreProvider } from '@/components/store-provider'
import { Toaster } from '@/components/ui/sonner'
import { SITE } from '@/lib/config'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — Premium oyoq kiyimlar`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="uz"
      className={`${geistSans.variable} ${geistMono.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <StoreProvider>
          <div className="flex min-h-dvh flex-col">
            <SiteHeader />
            <main className="flex-1 pb-16 lg:pb-0">{children}</main>
            <SiteFooter />
          </div>
          <MobileBottomNav />
        </StoreProvider>
        <Toaster position="top-center" richColors />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
