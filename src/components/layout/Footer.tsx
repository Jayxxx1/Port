import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-rule py-10">
      <div className="site-container flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <span className="font-display text-ink-muted">{t('nav.brand')}</span>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/Jayxxx1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted hover:text-primary transition-colors"
          >
            github.com/Jayxxx1 ↗
          </a>
          <span className="mono-label">{t('footer.builtWith')}</span>
        </div>
      </div>
    </footer>
  )
}
