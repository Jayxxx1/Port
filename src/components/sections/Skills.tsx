import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'

function revealProps(isInView: boolean, delay = 0) {
  return {
    initial: { opacity: 1, y: 0 },
    animate: { opacity: isInView ? 1 : 1, y: 0 },
    transition: { duration: 0, delay },
  }
}

const capabilities = [
  {
    key: 'frontend',
    items: ['React 19', 'TypeScript', 'Vite', 'TailwindCSS', 'React Router', 'Recharts', 'Socket.IO Client'],
  },
  {
    key: 'backend',
    items: ['Node.js', 'Express 4 / 5', 'REST API Design', 'Middleware Architecture', 'JWT / Session Auth', 'Role-Based Access Control'],
  },
  {
    key: 'database',
    items: ['PostgreSQL', 'Prisma ORM', 'Schema Design', 'Migration Strategy', 'Transactional Mutations', 'Composite Index Design'],
  },
  {
    key: 'security',
    items: ['HttpOnly Cookie JWT', 'CSRF Protection', 'OAuth2 / OIDC (Authentik)', 'Timing-Safe Comparison', 'Policy Layer Enforcement'],
  },
  {
    key: 'systems',
    items: ['State Machine Design', 'Permission Engine Patterns', 'Workflow Modeling', 'Audit Trail Design', 'SLA Tracking', 'Linked-Entity Transactions'],
  },
  {
    key: 'devops',
    items: ['Docker Compose', 'Nginx', 'PM2', 'AWS S3 SDK v3', 'GitLab CI/CD', 'VPS Deployment', 'Sentry Monitoring'],
  },
]

export default function Skills() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="capabilities" className="section" ref={ref}>
      <div className="site-container">
        {/* Section header */}
        <motion.div {...revealProps(isInView, 0)} className="flex items-center gap-5 mb-16">
          <span className="section-number">02</span>
          <hr className="flex-1" />
          <span className="eyebrow">{t('capabilities.eyebrow')}</span>
        </motion.div>

        {/* Editorial two-column layout */}
        <div className="editorial-grid items-start">
          {/* Left — Statement */}
          <motion.div {...revealProps(isInView, 0.1)}>
            <h2 className="display-sm text-primary mb-6">
              {t('capabilities.headline')}<br />
              <em className="text-ink-muted">{t('capabilities.headlineItalic')}</em>
            </h2>
            <p className="text-secondary text-sm leading-relaxed max-w-[38ch]">
              {t('capabilities.descriptor')}
            </p>
          </motion.div>

          {/* Right — Capability list */}
          <div className="flex flex-col divide-y divide-rule">
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.key}
                {...revealProps(isInView, 0.15 + i * 0.06)}
                className="py-5 first:pt-0"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-8">
                  <span className="text-xs font-medium text-secondary w-full sm:w-44 flex-shrink-0">
                    {t(`capabilities.categories.${cap.key}`)}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cap.items.map((item) => (
                      <span key={item} className="tag">{item}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
