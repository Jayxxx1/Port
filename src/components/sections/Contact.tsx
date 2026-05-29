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

export default function Contact() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" className="section" ref={ref}>
      <div className="site-container">
        {/* Section header */}
        <motion.div {...revealProps(isInView, 0)} className="flex items-center gap-5 mb-16">
          <span className="section-number">04</span>
          <hr className="flex-1" />
          <span className="eyebrow">{t('contact.eyebrow')}</span>
        </motion.div>

        <div className="editorial-grid items-end">
          {/* Left */}
          <motion.div {...revealProps(isInView, 0.1)}>
            <h2 className="display-sm text-primary">
              {t('contact.headline')}<br />
              <em className="text-ink-muted">{t('contact.headlineItalic')}</em>
            </h2>
          </motion.div>

          {/* Right */}
          <div className="flex flex-col gap-8">
            <motion.p {...revealProps(isInView, 0.18)} className="text-secondary leading-relaxed">
              {t('contact.p1')}
            </motion.p>

            <motion.p {...revealProps(isInView, 0.24)} className="text-secondary text-sm leading-relaxed">
              {t('contact.p2')}
            </motion.p>

            {/* Contact links */}
            <motion.div {...revealProps(isInView, 0.32)} className="flex flex-col gap-4 pt-2">
              <a
                href="mailto:cnknz.working@gmail.com"
                className="group flex items-baseline justify-between py-4 border-b border-rule hover:border-ink-muted transition-colors"
              >
                <span className="eyebrow">{t('contact.email')}</span>
                <span className="text-sm text-secondary group-hover:text-primary transition-colors">
                  cnknz.working@gmail.com ↗
                </span>
              </a>
              <a
                href="https://github.com/Jayxxx1"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-baseline justify-between py-4 border-b border-rule hover:border-ink-muted transition-colors"
              >
                <span className="eyebrow">{t('contact.github')}</span>
                <span className="text-sm text-secondary group-hover:text-primary transition-colors">
                  github.com/Jayxxx1 ↗
                </span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
