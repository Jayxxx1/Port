import { useEffect, lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const HomePage = lazy(() => import('./pages/HomePage'))
const BoonraksaDetail = lazy(() => import('./pages/BoonraksaDetail'))
const TPSFDetail = lazy(() => import('./pages/TPSFDetail'))
const Resume = lazy(() => import('./pages/Resume'))

function PageLoader() {
  return (
    <div className="min-h-screen bg-[#0d0d0b] flex items-center justify-center font-mono text-[10px] text-muted tracking-wider uppercase">
      Loading...
    </div>
  )
}

function LanguageWrapper() {
  const { i18n } = useTranslation()

  useEffect(() => {
    document.documentElement.lang = i18n.language
    if (i18n.language === 'th') {
      document.body.classList.add('lang-th')
      document.body.classList.remove('lang-en')
    } else {
      document.body.classList.add('lang-en')
      document.body.classList.remove('lang-th')
    }
  }, [i18n.language])

  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageWrapper />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/boonraksa" element={<BoonraksaDetail />} />
          <Route path="/projects/tpsf-eila" element={<TPSFDetail />} />
          <Route path="/resume" element={<Resume />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
