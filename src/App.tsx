import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import BoonraksaDetail from './pages/BoonraksaDetail'
import TPSFDetail from './pages/TPSFDetail'

function LanguageWrapper() {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    document.documentElement.lang = i18n.language
    if (i18n.language === 'th') {
      document.body.classList.add('lang-th')
      document.body.classList.remove('lang-en')
    } else {
      document.body.classList.add('lang-en')
      document.body.classList.remove('lang-th')
    }

    // Dynamic SEO Metadata updates
    document.title = t('meta.title')
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', t('meta.description'))
    }
  }, [i18n.language, t])

  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageWrapper />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/boonraksa" element={<BoonraksaDetail />} />
        <Route path="/projects/tpsf-eila" element={<TPSFDetail />} />
      </Routes>
    </BrowserRouter>
  )
}
