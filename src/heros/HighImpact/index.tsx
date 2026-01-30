'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div
      className="relative flex h-[90vh] min-h-[600px] w-full items-center justify-center overflow-hidden bg-black text-white"
      data-theme="dark"
    >
      <div className="absolute inset-0 z-0">
        {media && typeof media === 'object' && (
          <Media fill imgClassName="h-full w-full object-cover" priority resource={media} />
        )}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="container relative z-10 flex h-full items-end pb-12 sm:pb-24">
        <div className="max-w-4xl space-y-6">
          {richText && (
            <div className="mix-blend-normal [&>h1]:text-6xl [&>h1]:font-extrabold [&>h1]:uppercase [&>h1]:tracking-tight md:[&>h1]:text-8xl [&>p]:text-xl [&>p]:font-medium">
              <RichText data={richText} enableGutter={false} />
            </div>
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex flex-wrap gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    {/* Ensure CMSLink renders a button-like style */}
                    <CMSLink {...link} appearance="default" className="bg-white text-black px-8 py-3 font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors rounded-sm" />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
