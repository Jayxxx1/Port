import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

interface MetadataProps {
  title: string
  description: string
  ogImage?: string
  path: string
  ogType?: string
}

export function usePageMetadata({
  title,
  description,
  ogImage = '/assets/og/home.png',
  path,
  ogType = 'website',
}: MetadataProps) {
  const { i18n } = useTranslation()

  useEffect(() => {
    // 1. Language HTML attribute
    document.documentElement.lang = i18n.language

    // 2. Page Title
    document.title = title

    // Helper function to update or create meta tags
    const updateMeta = (selector: string, attribute: string, value: string) => {
      let element = document.head.querySelector(selector)
      if (!element) {
        const matches = selector.match(/\[([^=]+)=["']?([^"']+)["']?\]/)
        if (matches) {
          element = document.createElement('meta')
          element.setAttribute(matches[1], matches[2])
          document.head.appendChild(element)
        }
      }
      if (element) {
        element.setAttribute(attribute, value)
      }
    }

    // Helper function to update or create link tags
    const updateLink = (selector: string, rel: string, href: string, extraAttrs?: Record<string, string>) => {
      let element = document.head.querySelector(selector)
      if (!element) {
        const newEl = document.createElement('link')
        newEl.setAttribute('rel', rel)
        if (extraAttrs) {
          Object.entries(extraAttrs).forEach(([k, v]) => newEl.setAttribute(k, v))
        }
        document.head.appendChild(newEl)
        element = newEl
      }
      element.setAttribute('href', href)
    }

    const origin = window.location.origin
    const canonicalUrl = `${origin}${path}`

    // 3. Meta Description
    updateMeta('meta[name="description"]', 'content', description)

    // 4. OpenGraph Tags
    updateMeta('meta[property="og:title"]', 'content', title)
    updateMeta('meta[property="og:description"]', 'content', description)
    updateMeta('meta[property="og:image"]', 'content', `${origin}${ogImage}`)
    updateMeta('meta[property="og:url"]', 'content', canonicalUrl)
    updateMeta('meta[property="og:type"]', 'content', ogType)

    // 5. Twitter Card Tags
    updateMeta('meta[name="twitter:title"]', 'content', title)
    updateMeta('meta[name="twitter:description"]', 'content', description)
    updateMeta('meta[name="twitter:image"]', 'content', `${origin}${ogImage}`)

    // 6. Canonical link
    updateLink('link[rel="canonical"]', 'canonical', canonicalUrl)

    // 7. Alternate language links for bilingual routing
    updateLink('link[rel="alternate"][hreflang="en"]', 'alternate', canonicalUrl, { hreflang: 'en' })
    updateLink('link[rel="alternate"][hreflang="th"]', 'alternate', canonicalUrl, { hreflang: 'th' })

  }, [title, description, ogImage, path, ogType, i18n.language])
}
