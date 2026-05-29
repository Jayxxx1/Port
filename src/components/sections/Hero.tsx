import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay },
})

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section className="min-h-screen flex flex-col justify-between pt-32 pb-16">
      <div className="site-container flex-1 flex flex-col justify-center">
        {/* Eyebrow */}
        <motion.div {...fadeUp(0.1)} className="flex items-center gap-3 mb-10">
          <span className="status-dot" />
          <span className="eyebrow">{t('hero.eyebrow')}</span>
        </motion.div>

        {/* Headline */}
        <div className="mb-10 max-w-5xl">
          <motion.h1 {...fadeUp(0.2)} className="display text-primary mb-0 leading-[0.93]">
            {t('hero.line1')}
          </motion.h1>
          <motion.div {...fadeUp(0.28)} className="flex items-baseline gap-4 mt-1">
            <h1 className="display text-ink-muted leading-[0.93]">{t('hero.line2')}</h1>
          </motion.div>
          <motion.h1 {...fadeUp(0.36)} className="display italic text-primary leading-[0.93]">
            {t('hero.line3')}
          </motion.h1>
        </div>

        {/* Descriptor */}
        <motion.p {...fadeUp(0.5)} className="text-secondary text-base max-w-[52ch] leading-relaxed mb-14">
          {t('hero.descriptor')}
        </motion.p>

        {/* CTA row */}
        <motion.div {...fadeUp(0.62)} className="flex flex-wrap items-center gap-5">
          <a href="/#work" className="btn">
            {t('hero.ctaViewWork')}
          </a>
          <a
            href="https://github.com/Jayxxx1"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-text text-secondary"
          >
            {t('hero.ctaGithub')}
          </a>
        </motion.div>
      </div>

      {/* Bottom meta strip */}
      <motion.div {...fadeUp(0.8)} className="site-container">
        <hr className="mb-6" />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
            {[
              ['2', t('hero.stats.production')],
              ['17', t('hero.stats.roles')],
              ['21+', t('hero.stats.states')],
              ['915', t('hero.stats.schema')],
            ].map(([val, label]) => (
              <div key={label} className="flex items-baseline gap-2">
                <span className="font-display text-xl text-primary">{val}</span>
                <span className="mono-label">{label}</span>
              </div>
            ))}
          </div>
          <span className="mono-label hidden sm:block">{t('hero.scroll')}</span>
        </div>
      </motion.div>
    </section>
  )
}
