import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { label: t('nav.links.work'), href: '/#work' },
    { label: t('nav.links.about'), href: '/#about' },
    { label: t('nav.links.contact'), href: '/#contact' },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handle = requestAnimationFrame(() => setOpen(false))
    return () => cancelAnimationFrame(handle)
  }, [location])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${scrolled ? 'bg-bg border-b border-rule' : 'bg-transparent'
        }`}
    >
      <div className="site-container flex items-center justify-between h-14">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="font-display text-lg text-primary tracking-tight leading-none">{t('nav.brand')}</span>
          <span className="section-number hidden sm:block">{t('nav.role')}</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[0.8125rem] font-medium text-secondary hover:text-primary transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/resume"
            className="text-[0.8125rem] font-medium text-secondary hover:text-primary transition-colors duration-200"
          >
            {t('nav.links.resume')}
          </Link>
          <a
            href="https://github.com/Jayxxx1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.8125rem] font-medium text-secondary hover:text-primary transition-colors duration-200"
          >
            GitHub ↗
          </a>

          {/* Lang Switcher */}
          <div className="flex items-center gap-2 border-l border-rule pl-4 ml-1">
            <button
              onClick={() => i18n.changeLanguage('th')}
              className={`text-[10px] font-mono tracking-wider transition-colors ${i18n.language.startsWith('th') ? 'text-accent font-semibold' : 'text-muted hover:text-secondary'
                }`}
            >
              TH
            </button>
            <span className="text-ink-muted/30 text-[9px] font-mono">/</span>
            <button
              onClick={() => i18n.changeLanguage('en')}
              className={`text-[10px] font-mono tracking-wider transition-colors ${!i18n.language.startsWith('th') ? 'text-accent font-semibold' : 'text-muted hover:text-secondary'
                }`}
            >
              EN
            </button>
          </div>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-secondary hover:text-primary transition-colors p-1"
          aria-label="Toggle menu"
        >
          <span className="section-number">{open ? t('nav.close') : t('nav.menu')}</span>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden bg-bg border-b border-rule"
          >
            <div className="site-container py-6 flex flex-col gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-sm text-secondary hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <Link
                to="/resume"
                onClick={() => setOpen(false)}
                className="text-sm text-secondary hover:text-primary transition-colors"
              >
                {t('nav.links.resume')}
              </Link>
              <a
                href="https://github.com/Jayxxx1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-secondary hover:text-primary transition-colors"
              >
                GitHub ↗
              </a>

              {/* Mobile switcher */}
              <div className="flex items-center gap-3 pt-3 border-t border-rule">
                <button
                  onClick={() => {
                    i18n.changeLanguage('th')
                    setOpen(false)
                  }}
                  className={`text-xs font-mono tracking-wider transition-colors ${i18n.language.startsWith('th') ? 'text-accent font-semibold' : 'text-muted'
                    }`}
                >
                  TH (ไทย)
                </button>
                <span className="text-muted text-[10px]">/</span>
                <button
                  onClick={() => {
                    i18n.changeLanguage('en')
                    setOpen(false)
                  }}
                  className={`text-xs font-mono tracking-wider transition-colors ${!i18n.language.startsWith('th') ? 'text-accent font-semibold' : 'text-muted'
                    }`}
                >
                  EN (English)
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
