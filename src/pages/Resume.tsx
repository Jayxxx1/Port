import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { usePageMetadata } from '../hooks/usePageMetadata'
import JSONLD from '../components/layout/JSONLD'

export default function Resume() {
  const { t } = useTranslation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // SEO & OpenGraph Setup
  usePageMetadata({
    title: t('resume.title'),
    description: t('resume.metaDescription'),
    path: '/resume',
    ogImage: '/assets/og/home.png'
  })

  // JSON-LD Person Schema for SEO crawlers
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    'name': 'Chinnakrit',
    'jobTitle': 'Full-Stack Systems & Workflow Engineer',
    'email': 'jay.chinnakrit@gmail.com',
    'url': window.location.origin + '/resume',
    'sameAs': [
      'https://github.com/Jayxxx1'
    ],
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Songkhla',
      'addressCountry': 'Thailand'
    },
    'knowsAbout': [
      'Systems Architecture',
      'Workflow Engineering',
      'Database Concurrency & Row Locks',
      'Role-Based Access Control (RBAC)',
      'Docker & Containerization',
      'Node.js & Express',
      'React'
    ]
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-bg-surface md:bg-transparent">
      <JSONLD data={schemaData} />
      
      {/* Navigation hidden during printing */}
      <div className="no-print">
        <Navbar />
      </div>

      <main className="site-container pt-32 pb-24 print-container">
        {/* Print controls row */}
        <div className="no-print flex items-center justify-between gap-4 mb-10 border-b border-rule pb-6">
          <Link to="/" className="btn-text mono-label">
            &larr; {t('caseStudy.back')}
          </Link>
          <button onClick={handlePrint} className="btn font-mono text-xs">
            {t('resume.printResume')}
          </button>
        </div>

        {/* Resume Content Sheet */}
        <div className="max-w-4xl mx-auto border border-rule bg-[#10100e] p-8 md:p-12 shadow-sm print:border-0 print:p-0 print:bg-transparent">
          {/* Header */}
          <header className="border-b border-rule pb-8 mb-8 print:pb-6 print:mb-6">
            <h1 className="display-sm text-primary mb-2 print:text-2xl print:text-black">
              Chinnakrit
            </h1>
            <p className="text-accent font-mono text-xs uppercase tracking-wider mb-4 print:text-xs print:text-black">
              {t('resume.personalInfo.title')}
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-secondary font-mono print:text-[10px] print:text-black">
              <span>📍 {t('resume.personalInfo.location')}</span>
              <span className="hidden md:inline print:inline">·</span>
              <span>✉️ {t('resume.personalInfo.email')}</span>
              <span className="hidden md:inline print:inline">·</span>
              <span>💻 {t('resume.personalInfo.github')}</span>
            </div>
          </header>

          {/* Body Content */}
          <div className="space-y-8 print:space-y-6">
            
            {/* Summary */}
            <section className="space-y-3">
              <h2 className="mono-label text-accent uppercase tracking-wider text-xs border-b border-rule/50 pb-1.5 print:text-[11px] print:text-black print:border-black">
                {t('resume.summary.title')}
              </h2>
              <p className="text-secondary text-sm leading-relaxed print:text-xs print:text-black">
                {t('resume.summary.text')}
              </p>
            </section>

            {/* Technical Focus */}
            <section className="space-y-3">
              <h2 className="mono-label text-accent uppercase tracking-wider text-xs border-b border-rule/50 pb-1.5 print:text-[11px] print:text-black print:border-black">
                {t('resume.focus.title')}
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 list-disc list-inside text-sm text-secondary print:text-xs print:text-black print:grid-cols-2">
                {((t('resume.focus.items', { returnObjects: true }) as string[]) || []).map((focus, i) => (
                  <li key={i}>{focus}</li>
                ))}
              </ul>
            </section>

            {/* Production Systems */}
            <section className="space-y-4">
              <h2 className="mono-label text-accent uppercase tracking-wider text-xs border-b border-rule/50 pb-1.5 print:text-[11px] print:text-black print:border-black">
                {t('resume.systems.title')}
              </h2>
              <div className="space-y-6 print:space-y-4">
                {/* Boonraksa ERP */}
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <h3 className="text-sm font-semibold text-primary print:text-xs print:text-black">
                      {t('resume.systems.boonraksa.name')}
                    </h3>
                    <span className="text-xs text-muted font-mono print:text-[10px] print:text-black">
                      {t('resume.systems.boonraksa.role')}
                    </span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-secondary leading-relaxed space-y-1 pl-2 print:text-[11px] print:text-black">
                    <li>{t('resume.systems.boonraksa.p1')}</li>
                    <li>{t('resume.systems.boonraksa.p2')}</li>
                    <li>{t('resume.systems.boonraksa.p3')}</li>
                  </ul>
                </div>

                {/* TPSF EILA */}
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <h3 className="text-sm font-semibold text-primary print:text-xs print:text-black">
                      {t('resume.systems.tpsf.name')}
                    </h3>
                    <span className="text-xs text-muted font-mono print:text-[10px] print:text-black">
                      {t('resume.systems.tpsf.role')}
                    </span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-secondary leading-relaxed space-y-1 pl-2 print:text-[11px] print:text-black">
                    <li>{t('resume.systems.tpsf.p1')}</li>
                    <li>{t('resume.systems.tpsf.p2')}</li>
                    <li>{t('resume.systems.tpsf.p3')}</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Stack */}
            <section className="space-y-3">
              <h2 className="mono-label text-accent uppercase tracking-wider text-xs border-b border-rule/50 pb-1.5 print:text-[11px] print:text-black print:border-black">
                {t('resume.stack.title')}
              </h2>
              <div className="grid grid-cols-1 gap-y-2.5 text-xs print:grid-cols-1">
                <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] print:grid-cols-[110px_1fr] items-start gap-1">
                  <span className="font-mono font-medium text-muted print:text-black">{t('resume.stack.languages')}:</span>
                  <span className="text-secondary print:text-black">TypeScript, JavaScript (ES6+), HTML5, CSS3</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] print:grid-cols-[110px_1fr] items-start gap-1">
                  <span className="font-mono font-medium text-muted print:text-black">{t('resume.stack.backend')}:</span>
                  <span className="text-secondary print:text-black">Node.js, Express, PostgreSQL, Prisma ORM, pg-client, REST APIs</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] print:grid-cols-[110px_1fr] items-start gap-1">
                  <span className="font-mono font-medium text-muted print:text-black">{t('resume.stack.frontend')}:</span>
                  <span className="text-secondary print:text-black">React (18/19), Vite, TailwindCSS, React Router, Recharts, Socket.IO Client</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] print:grid-cols-[110px_1fr] items-start gap-1">
                  <span className="font-mono font-medium text-muted print:text-black">{t('resume.stack.devops')}:</span>
                  <span className="text-secondary print:text-black">Docker, Docker Compose, Nginx, GitLab CI/CD, AWS S3, PM2, Git</span>
                </div>
              </div>
            </section>

            {/* Education */}
            <section className="space-y-2">
              <h2 className="mono-label text-accent uppercase tracking-wider text-xs border-b border-rule/50 pb-1.5 print:text-[11px] print:text-black print:border-black">
                {t('resume.education.title')}
              </h2>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 text-xs">
                <div>
                  <h3 className="font-semibold text-primary inline print:text-black">{t('resume.education.school')}</h3>
                  <span className="text-secondary block mt-1 print:text-black">{t('resume.education.degree')}</span>
                </div>
                <span className="font-mono text-muted print:text-[10px] print:text-black">{t('resume.education.period')}</span>
              </div>
            </section>
            
          </div>
        </div>
      </main>

      {/* Footer hidden during printing */}
      <div className="no-print">
        <Footer />
      </div>
    </div>
  )
}
