import { useTranslation } from 'react-i18next'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Hero from '../components/sections/Hero'
import Projects from '../components/sections/Projects'
import Skills from '../components/sections/Skills'
import About from '../components/sections/About'
import Contact from '../components/sections/Contact'
import { usePageMetadata } from '../hooks/usePageMetadata'
import JSONLD from '../components/layout/JSONLD'

export default function HomePage() {
  const { t } = useTranslation()

  // SEO Setup
  usePageMetadata({
    title: t('meta.title'),
    description: t('meta.description'),
    path: '/',
    ogImage: '/assets/og/home.png'
  })

  // Structured Data
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${window.location.origin}/#website`,
        'url': window.location.origin,
        'name': 'Chinnakrit — Systems & Workflow Engineer Portfolio',
        'description': t('meta.description'),
        'publisher': {
          '@id': `${window.location.origin}/#person`
        }
      },
      {
        '@type': 'Person',
        '@id': `${window.location.origin}/#person`,
        'name': 'Chinnakrit',
        'jobTitle': 'Full-Stack Systems & Workflow Engineer',
        'url': window.location.origin,
        'sameAs': [
          'https://github.com/Jayxxx1'
        ],
        'knowsAbout': [
          'Systems Architecture',
          'Workflow Engineering',
          'Database Design',
          'Docker Operations',
          'Web Security'
        ]
      }
    ]
  }

  return (
    <div className="min-h-screen">
      <JSONLD data={schemaData} />
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
