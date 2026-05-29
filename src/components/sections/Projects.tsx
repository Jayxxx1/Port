import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { projects } from '../../data/projects'

function revealProps(isInView: boolean, delay = 0) {
  return {
    initial: { opacity: 1, y: 0 },
    animate: { opacity: isInView ? 1 : 1, y: 0 },
    transition: { duration: 0, delay },
  }
}

export default function Projects() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const navigate = useNavigate()

  const getMetricLabel = (projectId: string, originalLabel: string) => {
    const keyMap: Record<string, string> = {
      'User Roles': 'roles',
      'Order States': 'states',
      'Workflow States': 'states',
      'Flow Types': 'flows',
      'Service Files': 'services',
      'Test Suites': 'tests',
      'DB Models': 'models',
      'API Modules': 'modules',
      'Auth Modes': 'auth',
      'PDF Markers Scanned': 'pdf',
      'Deployment': 'deploy',
    }
    const key = keyMap[originalLabel]
    return key ? t(`projects.${projectId}.metrics.${key}`) : originalLabel
  }

  return (
    <section id="work" className="section" ref={ref}>
      <div className="site-container">
        {/* Section header */}
        <motion.div {...revealProps(isInView, 0)} className="flex items-center gap-5 mb-16">
          <span className="section-number">01</span>
          <hr className="flex-1" />
          <span className="eyebrow">{t('projects.eyebrow')}</span>
        </motion.div>

        {/* Projects */}
        <div className="flex flex-col">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              {...revealProps(isInView, 0.1 + i * 0.12)}
            >
              {/* Rule above each */}
              {i > 0 && <hr className="my-0" />}

              <article
                onClick={() => navigate(`/projects/${project.id}`)}
                className="group py-14 cursor-pointer"
              >
                <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6 lg:gap-16 items-start">
                  {/* Large index number */}
                  <div className="hidden lg:block">
                    <span className="project-index leading-none select-none">
                      0{i + 1}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-6">
                    {/* Title row */}
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3">
                      <h2 className="display-xs group-hover:text-accent transition-colors duration-200">
                        {t(`projects.${project.id}.title`, project.title)}
                      </h2>
                      <span className="mono-label flex-shrink-0">{t(`projects.${project.id}.period`, project.period)}</span>
                    </div>

                    {/* Subtitle + Role */}
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                      <span className="text-secondary text-sm">{t(`projects.${project.id}.subtitle`)}</span>
                      <span className="text-muted text-xs">·</span>
                      <span className="text-accent text-xs font-mono">{t(`projects.${project.id}.role`)}</span>
                      <span className="text-muted text-xs">·</span>
                      <span className="inline-flex items-center gap-1.5 text-xs text-muted font-mono">
                        <span className="status-dot" style={{ backgroundColor: '#4a7c59' }} />
                        {project.id === 'boonraksa' ? 'Active Production System' : 'Deployed at PSU'}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-secondary text-sm leading-relaxed max-w-[72ch]">
                      {t(`projects.${project.id}.description`)}
                    </p>

                    {/* Metrics */}
                    <div className="flex flex-wrap gap-x-8 gap-y-3">
                      {project.metrics.slice(0, 5).map((m) => (
                        <div key={m.label} className="flex flex-col gap-0.5">
                          <span className="font-display text-lg text-primary">{m.value}</span>
                          <span className="mono-label">{getMetricLabel(project.id, m.label)}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech line */}
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.slice(0, 3).flatMap(c => c.items.slice(0, 3)).slice(0, 9).map((item) => (
                        <span key={item} className="tag">{item}</span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-6 pt-2">
                      <span className="btn-text text-sm group-hover:text-primary transition-colors">
                        {t('projects.cta')}
                      </span>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs text-muted hover:text-secondary transition-colors"
                      >
                        {t('projects.ctaGithub')}
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            </motion.div>
          ))}
        </div>
        <hr />
      </div>
    </section>
  )
}
