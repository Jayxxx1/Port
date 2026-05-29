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

export default function About() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="section" ref={ref}>
      <div className="site-container">
        {/* Section header */}
        <motion.div {...revealProps(isInView, 0)} className="flex items-center gap-5 mb-16">
          <span className="section-number">03</span>
          <hr className="flex-1" />
          <span className="eyebrow">{t('about.eyebrow')}</span>
        </motion.div>

        <div className="editorial-grid items-start">
          {/* Left — Headline */}
          <motion.div {...revealProps(isInView, 0.1)} className="sticky top-24">
            <h2 className="display-sm text-primary mb-0">
              {t('about.headline')}<br />
              <em className="text-ink-muted">{t('about.headlineItalic')}</em>
            </h2>
          </motion.div>

          {/* Right — Narrative */}
          <div className="flex flex-col gap-8">
            <motion.p {...revealProps(isInView, 0.18)} className="text-secondary leading-relaxed">
              {t('about.p1')}
            </motion.p>

            <motion.p {...revealProps(isInView, 0.24)} className="text-secondary leading-relaxed">
              {t('about.p2')}
            </motion.p>

            {/* Pull quote */}
            <motion.blockquote {...revealProps(isInView, 0.32)} className="accent-line py-2">
              <p className="font-display text-xl text-primary italic leading-relaxed">
                "{t('about.pullquote')}"
              </p>
            </motion.blockquote>

            <motion.p {...revealProps(isInView, 0.38)} className="text-secondary leading-relaxed">
              {t('about.p3')}
            </motion.p>

            {/* Facts list */}
            <motion.div {...revealProps(isInView, 0.44)} className="border-t border-rule pt-8 flex flex-col divide-y divide-rule">
              {[
                ['currently', t('about.keys.currently'), t('about.values.currently')],
                ['now', t('about.keys.now'), t('about.values.now')],
                ['based', t('about.keys.based'), t('about.values.based')],
                ['github', t('about.keys.github'), t('about.values.github')],
                ['focus', t('about.keys.focus'), t('about.values.focus')],
              ].map(([key, label, val]) => (
                <div key={key} className="flex items-baseline gap-6 py-4 first:pt-0">
                  <span className="text-xs font-medium text-muted w-24 flex-shrink-0">{label}</span>
                  <span className="text-sm text-secondary">{val}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
