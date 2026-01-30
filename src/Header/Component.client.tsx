'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-border/10 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2">
          {/* Nike style is often just the logo on the left, quite prominent */}
          <Logo loading="eager" priority="high" className="h-6 w-auto invert dark:invert-0" />
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          {/* Navigation Links */}
          <HeaderNav data={data} />
          {/* We can add search/bag icons here later if needed */}
        </div>
      </div>
    </header>
  )
}
