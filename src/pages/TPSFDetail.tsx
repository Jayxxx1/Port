import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { projects } from '../data/projects'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { usePageMetadata } from '../hooks/usePageMetadata'
import JSONLD from '../components/layout/JSONLD'

const project = projects.find(p => p.id === 'tpsf-eila')!

interface SecurityItem {
  title: string
  desc: string
}

interface ChallengeItem {
  title: string
  problem: string
  decision: string
  result: string
}

interface DecisionItem {
  question: string
  answer: string
}

const fade = (delay = 0) => ({
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0, delay },
})

function SectionLabel({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-5 mb-12">
      <span className="section-number">{n}</span>
      <hr className="flex-1" />
      <span className="eyebrow">{label}</span>
    </div>
  )
}

function TPSFAssessmentFlowDiagram() {
  return (
    <svg className="w-full max-w-3xl mx-auto my-6" viewBox="0 0 700 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Row 1: Intake & EILA Check */}
      {/* Draft */}
      <rect x="10" y="20" width="100" height="45" rx="3" stroke="#252522" fill="#141412" strokeWidth="1"/>
      <text x="60" y="42" fill="#f0efe9" fontSize="10" fontFamily="Sarabun, sans-serif" textAnchor="middle" fontWeight="600">DRAFT</text>
      <text x="60" y="54" fill="#9a9991" fontSize="8" fontFamily="Sarabun, sans-serif" textAnchor="middle">Applicant Input</text>

      <path d="M110 42.5 H140" stroke="#252522" strokeWidth="1" markerEnd="url(#arrow)"/>

      {/* Submitted */}
      <rect x="140" y="20" width="100" height="45" rx="3" stroke="#252522" fill="#141412" strokeWidth="1"/>
      <text x="190" y="42" fill="#f0efe9" fontSize="10" fontFamily="Sarabun, sans-serif" textAnchor="middle" fontWeight="600">SUBMITTED</text>
      <text x="190" y="54" fill="#9a9991" fontSize="8" fontFamily="Sarabun, sans-serif" textAnchor="middle">Awaiting EILA Intake</text>

      <path d="M240 42.5 H270" stroke="#252522" strokeWidth="1" markerEnd="url(#arrow)"/>

      {/* Under Review EILA */}
      <rect x="270" y="20" width="120" height="45" rx="3" stroke="#252522" fill="#141412" strokeWidth="1"/>
      <text x="330" y="42" fill="#f0efe9" fontSize="10" fontFamily="Sarabun, sans-serif" textAnchor="middle" fontWeight="600">UNDERREVIEW_EILA</text>
      <text x="330" y="54" fill="#9a9991" fontSize="8" fontFamily="Sarabun, sans-serif" textAnchor="middle">EILA Reviewing Criteria</text>

      <path d="M390 42.5 H420" stroke="#252522" strokeWidth="1" markerEnd="url(#arrow)"/>

      {/* Assign Commit */}
      <rect x="420" y="20" width="110" height="45" rx="3" stroke="#252522" fill="#141412" strokeWidth="1"/>
      <text x="475" y="42" fill="#f0efe9" fontSize="10" fontFamily="Sarabun, sans-serif" textAnchor="middle" fontWeight="600">ASSIGN_COMMIT</text>
      <text x="475" y="54" fill="#9a9991" fontSize="8" fontFamily="Sarabun, sans-serif" textAnchor="middle">Assigning Evaluators</text>

      {/* Down arrow to Evaluating */}
      <path d="M475 65 V95" stroke="#252522" strokeWidth="1" markerEnd="url(#arrow)"/>

      {/* Row 2: Evaluation */}
      {/* Evaluating */}
      <rect x="420" y="95" width="110" height="45" rx="3" stroke="#c4a882" fill="#141412" strokeWidth="1"/>
      <text x="475" y="117" fill="#c4a882" fontSize="10" fontFamily="Sarabun, sans-serif" textAnchor="middle" fontWeight="600">EVALUATING</text>
      <text x="475" y="129" fill="#9a9991" fontSize="8" fontFamily="Sarabun, sans-serif" textAnchor="middle">Experts Scoring</text>

      <path d="M420 117.5 H390" stroke="#252522" strokeWidth="1" markerEnd="url(#arrow)"/>

      {/* Evaluated */}
      <rect x="270" y="95" width="120" height="45" rx="3" stroke="#252522" fill="#141412" strokeWidth="1"/>
      <text x="330" y="117" fill="#f0efe9" fontSize="10" fontFamily="Sarabun, sans-serif" textAnchor="middle" fontWeight="600">EVALUATED</text>
      <text x="330" y="129" fill="#9a9991" fontSize="8" fontFamily="Sarabun, sans-serif" textAnchor="middle">Scoring Complete</text>

      {/* Down arrow to terminal states */}
      <path d="M330 140 V170" stroke="#252522" strokeWidth="1"/>

      {/* Row 3: Terminal States */}
      {/* Approved */}
      <rect x="210" y="170" width="110" height="45" rx="3" stroke="#22c55e" fill="#141412" strokeWidth="1"/>
      <text x="265" y="192" fill="#22c55e" fontSize="10" fontFamily="Sarabun, sans-serif" textAnchor="middle" fontWeight="600">APPROVED</text>
      <text x="265" y="204" fill="#9a9991" fontSize="8" fontFamily="Sarabun, sans-serif" textAnchor="middle">Certified & Approved</text>

      {/* Rejected */}
      <rect x="340" y="170" width="110" height="45" rx="3" stroke="#ef4444" fill="#141412" strokeWidth="1"/>
      <text x="395" y="192" fill="#ef4444" fontSize="10" fontFamily="Sarabun, sans-serif" textAnchor="middle" fontWeight="600">REJECTED</text>
      <text x="395" y="204" fill="#9a9991" fontSize="8" fontFamily="Sarabun, sans-serif" textAnchor="middle">Application Rejected</text>

      {/* Connect Evaluated to Approved/Rejected branches */}
      <path d="M330 155 H265 V170" stroke="#252522" strokeWidth="1" markerEnd="url(#arrow)"/>
      <path d="M330 155 H395 V170" stroke="#252522" strokeWidth="1" markerEnd="url(#arrow)"/>

      {/* Loop to Moredoc */}
      {/* Moredoc box */}
      <rect x="140" y="95" width="100" height="45" rx="3" stroke="#ef4444" fill="#141412" strokeWidth="1"/>
      <text x="190" y="117" fill="#ef4444" fontSize="10" fontFamily="Sarabun, sans-serif" textAnchor="middle" fontWeight="600">MOREDOC</text>
      <text x="190" y="129" fill="#9a9991" fontSize="8" fontFamily="Sarabun, sans-serif" textAnchor="middle">Need Info Request</text>

      {/* Connection from UNDERREVIEW_EILA / EVALUATING to MOREDOC */}
      <path d="M330 65 V80 H190 V95" stroke="#252522" strokeWidth="1" markerEnd="url(#arrow)"/>
      <path d="M475 140 V155 H190 V140" stroke="#252522" strokeWidth="1"/>

      {/* Connection from MOREDOC back to SUBMITTED */}
      <path d="M140 117.5 H120 V42.5 H140" stroke="#252522" strokeWidth="1" strokeDasharray="3 3" markerEnd="url(#arrow)"/>
      <text x="75" y="105" fill="#9a9991" fontSize="7" fontFamily="JetBrains Mono, monospace">data-driven return</text>

      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#252522"/>
        </marker>
      </defs>
    </svg>
  )
}

function TPSFPolicyCheckDiagram() {
  return (
    <svg className="w-full max-w-xl mx-auto my-6" viewBox="0 0 500 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Request Ingestion */}
      <circle cx="40" cy="80" r="18" fill="#141412" stroke="#252522" strokeWidth="1"/>
      <text x="40" y="83" fill="#f0efe9" fontSize="8" fontFamily="JetBrains Mono, monospace" textAnchor="middle">REQ</text>
      
      <path d="M58 80 H90" stroke="#c4a882" strokeWidth="1" markerEnd="url(#arrow)"/>

      {/* Layer 1: Role Check */}
      <rect x="90" y="45" width="90" height="70" rx="3" stroke="#252522" fill="#141412" strokeWidth="1"/>
      <text x="135" y="65" fill="#f0efe9" fontSize="9" fontFamily="Sarabun, sans-serif" textAnchor="middle" fontWeight="600">Layer 1: Role</text>
      <text x="135" y="80" fill="#9a9991" fontSize="8" fontFamily="Sarabun, sans-serif" textAnchor="middle">Is role allowed?</text>
      <text x="135" y="95" fill="#9a9991" fontSize="7" fontFamily="JetBrains Mono, monospace" textAnchor="middle">canPerformAction()</text>

      <path d="M180 80 H210" stroke="#22c55e" strokeWidth="1" markerEnd="url(#arrow)"/>
      <path d="M135 115 V160" stroke="#ef4444" strokeWidth="1" markerEnd="url(#arrow)"/>

      {/* Layer 2: Assignment Check */}
      <rect x="210" y="45" width="90" height="70" rx="3" stroke="#252522" fill="#141412" strokeWidth="1"/>
      <text x="255" y="65" fill="#f0efe9" fontSize="9" fontFamily="Sarabun, sans-serif" textAnchor="middle" fontWeight="600">Layer 2: Assign</text>
      <text x="255" y="80" fill="#9a9991" fontSize="8" fontFamily="Sarabun, sans-serif" textAnchor="middle">Is expert assigned?</text>
      <text x="255" y="95" fill="#9a9991" fontSize="7" fontFamily="JetBrains Mono, monospace" textAnchor="middle">request_evaluators</text>

      <path d="M300 80 H330" stroke="#22c55e" strokeWidth="1" markerEnd="url(#arrow)"/>
      <path d="M255 115 V160" stroke="#ef4444" strokeWidth="1" markerEnd="url(#arrow)"/>

      {/* Layer 3: Scope Check */}
      <rect x="330" y="45" width="90" height="70" rx="3" stroke="#252522" fill="#141412" strokeWidth="1"/>
      <text x="375" y="65" fill="#f0efe9" fontSize="9" fontFamily="Sarabun, sans-serif" textAnchor="middle" fontWeight="600">Layer 3: Scope</text>
      <text x="375" y="80" fill="#9a9991" fontSize="8" fontFamily="Sarabun, sans-serif" textAnchor="middle">Faculty / Campus</text>
      <text x="375" y="95" fill="#9a9991" fontSize="7" fontFamily="JetBrains Mono, monospace" textAnchor="middle">Normalized Compare</text>

      <path d="M420 80 H450" stroke="#22c55e" strokeWidth="1" markerEnd="url(#arrow)"/>
      <path d="M375 115 V160" stroke="#ef4444" strokeWidth="1" markerEnd="url(#arrow)"/>

      {/* Pass - Authorized Access */}
      <circle cx="468" cy="80" r="18" fill="#141412" stroke="#22c55e" strokeWidth="1"/>
      <text x="468" y="83" fill="#22c55e" fontSize="8" fontFamily="JetBrains Mono, monospace" textAnchor="middle">200</text>
      <text x="468" y="110" fill="#22c55e" fontSize="7" fontFamily="Sarabun, sans-serif" textAnchor="middle">Authorized</text>

      {/* Fail - Access Denied */}
      <rect x="90" y="160" width="330" height="40" rx="3" stroke="#ef4444" fill="#141412" strokeWidth="1"/>
      <text x="255" y="180" fill="#ef4444" fontSize="9" fontFamily="Sarabun, sans-serif" textAnchor="middle" fontWeight="600">403 FORBIDDEN (Access Denied)</text>
      <text x="255" y="192" fill="#9a9991" fontSize="7" fontFamily="JetBrains Mono, monospace" textAnchor="middle">Security anomaly logged with IP + User-Agent</text>

      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#252522"/>
        </marker>
      </defs>
    </svg>
  )
}

export default function TPSFDetail() {
  const { t } = useTranslation()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  // SEO Setup
  usePageMetadata({
    title: `PSU TPSF EILA — ${t('projects.tpsf-eila.subtitle')}`,
    description: t('projects.tpsf-eila.description'),
    path: '/projects/tpsf-eila',
    ogImage: '/assets/og/tpsf.png'
  })

  // Structured Data
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    'name': 'PSU TPSF EILA',
    'description': t('projects.tpsf-eila.description'),
    'codeRepository': 'https://github.com/Jayxxx1/TPSF_EILA',
    'programmingLanguage': ['JavaScript'],
    'runtimePlatform': 'Node.js',
    'author': {
      '@type': 'Person',
      'name': 'Chinnakrit'
    }
  }

  const getMetricLabel = (originalLabel: string) => {
    const keyMap: Record<string, string> = {
      'User Roles': 'roles',
      'Workflow States': 'states',
      'API Modules': 'modules',
      'Auth Modes': 'auth',
      'PDF Markers Scanned': 'pdf',
      'Deployment': 'deploy',
    }
    const key = keyMap[originalLabel]
    return key ? t(`projects.tpsf-eila.metrics.${key}`) : originalLabel
  }

  const getStackCategoryLabel = (cat: string) => {
    const keyMap: Record<string, string> = {
      'Frontend': 'Frontend',
      'Backend': 'Backend',
      'Auth': 'Auth',
      'Storage': 'Storage',
      'Infrastructure': 'Infrastructure',
    }
    const key = keyMap[cat]
    return key ? t(`caseStudy.stackCategories.${key}`, cat) : cat
  }

  return (
    <div className="min-h-screen">
      <JSONLD data={schemaData} />
      <Navbar />

      {/* Header */}
      <div className="pt-32 pb-16 border-b border-rule">
        <div className="site-container">
          <motion.div {...fade(0.05)}>
            <Link to="/" className="btn-text mono-label mb-10 inline-flex">
              {t('caseStudy.back')}
            </Link>
          </motion.div>

          <motion.div {...fade(0.1)} className="flex items-center gap-5 mb-8">
            <span className="eyebrow">{t('caseStudy.typeUni')}</span>
          </motion.div>

          <motion.h1 {...fade(0.18)} className="display text-primary mb-4 max-w-4xl">
            {t('projects.tpsf-eila.title', project.title)}
          </motion.h1>
          <motion.p {...fade(0.25)} className="text-secondary text-lg max-w-[60ch] mb-8">
            {t('projects.tpsf-eila.subtitle')}
          </motion.p>

          <motion.div {...fade(0.32)} className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="text-accent text-xs font-mono">{t('projects.tpsf-eila.role')}</span>
            <span className="mono-label text-muted">·</span>
            <span className="mono-label">{t('projects.tpsf-eila.period')}</span>
            <span className="mono-label text-muted">·</span>
            <span className="mono-label text-accent">{t('caseStudy.deployedPsu')}</span>
            <span className="mono-label text-muted">·</span>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-text mono-label"
            >
              {t('projects.ctaGithub')}
            </a>
          </motion.div>
        </div>
      </div>

      {/* Metrics */}
      <div className="border-b border-rule bg-bg-surface">
        <div className="site-container py-6">
          <div className="flex flex-wrap gap-x-12 gap-y-4">
            {project.metrics.map((m) => (
              <div key={m.label} className="flex items-baseline gap-2">
                <span className="font-display text-2xl text-primary">{m.value}</span>
                <span className="mono-label">{getMetricLabel(m.label)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Executive Summary Panel */}
      <div className="border-b border-rule bg-bg-surface/10 py-12">
        <div className="site-container">
          <div className="border border-rule p-8 bg-[#10100e] max-w-5xl mx-auto">
            <span className="mono-label text-accent uppercase tracking-wider block mb-6">{t('caseStudy.tpsf.execSummary.title')}</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
              <div className="space-y-4">
                <div>
                  <strong className="text-primary font-mono text-[10px] uppercase block mb-1">{t('caseStudy.tpsf.execSummary.system')}</strong>
                  <span className="text-secondary leading-relaxed">{t('caseStudy.tpsf.execSummary.systemVal')}</span>
                </div>
                <div>
                  <strong className="text-primary font-mono text-[10px] uppercase block mb-1">{t('caseStudy.tpsf.execSummary.operators')}</strong>
                  <span className="text-secondary leading-relaxed">{t('caseStudy.tpsf.execSummary.operatorsVal')}</span>
                </div>
                <div>
                  <strong className="text-primary font-mono text-[10px] uppercase block mb-1">{t('caseStudy.tpsf.execSummary.purpose')}</strong>
                  <span className="text-secondary leading-relaxed">{t('caseStudy.tpsf.execSummary.purposeVal')}</span>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <strong className="text-primary font-mono text-[10px] uppercase block mb-1">{t('caseStudy.tpsf.execSummary.complexity')}</strong>
                  <span className="text-secondary leading-relaxed">{t('caseStudy.tpsf.execSummary.complexityVal')}</span>
                </div>
                <div>
                  <strong className="text-primary font-mono text-[10px] uppercase block mb-1">{t('caseStudy.tpsf.execSummary.deployment')}</strong>
                  <span className="text-secondary leading-relaxed">{t('caseStudy.tpsf.execSummary.deploymentVal')}</span>
                </div>
                <div>
                  <strong className="text-primary font-mono text-[10px] uppercase block mb-1">{t('caseStudy.tpsf.execSummary.focus')}</strong>
                  <span className="text-secondary leading-relaxed accent-line block">{t('caseStudy.tpsf.execSummary.focusVal')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="site-container py-20">
        <div className="max-w-5xl mx-auto space-y-24">

          {/* 01 — What it solves */}
          <section>
            <SectionLabel n="01" label={t('caseStudy.sections.problem')} />
            <div className="editorial-grid">
              <div>
                <h2 className="display-xs text-primary mb-0">
                  {t('caseStudy.tpsf.problem.title')}<br /><em className="text-ink-muted">{t('caseStudy.tpsf.problem.titleItalic')}</em>
                </h2>
              </div>
              <div className="space-y-4 text-secondary text-sm leading-relaxed">
                <p>
                  {t('caseStudy.tpsf.problem.p1')}
                </p>
                <p>
                  {t('caseStudy.tpsf.problem.p2')}
                </p>
                <p className="accent-line py-1 text-secondary">
                  {t('caseStudy.tpsf.problem.p3')}
                </p>
              </div>
            </div>
          </section>

          {/* 02 — Workflow */}
          <section>
            <SectionLabel n="02" label={t('caseStudy.sections.assessmentWorkflow')} />
            <div className="space-y-8">
              {/* Layered Readability Panel */}
              <div className="border border-rule p-6 bg-[#10100e] max-w-4xl">
                <p className="font-display text-[15px] text-primary italic leading-relaxed mb-6">
                  {t('caseStudy.tpsf.workflow.summary')}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[11px] leading-relaxed">
                  <div>
                    <strong className="text-accent font-mono text-[9px] uppercase block mb-1">Business Context</strong>
                    <p className="text-secondary">{t('caseStudy.tpsf.workflow.purpose')}</p>
                  </div>
                  <div>
                    <strong className="text-primary font-mono text-[9px] uppercase block mb-1">Implementation Strategy</strong>
                    <p className="text-secondary">{t('caseStudy.tpsf.workflow.implementation')}</p>
                  </div>
                </div>
              </div>
              <div className="editorial-grid items-start">
                <div>
                  <h2 className="display-xs text-primary mb-4">
                    {t('caseStudy.tpsf.workflow.title')}<br /><em className="text-ink-muted">{t('caseStudy.tpsf.workflow.titleItalic')}</em>
                  </h2>
                  <p className="text-secondary text-sm leading-relaxed">
                    {t('caseStudy.tpsf.workflow.p1')}
                  </p>
                </div>
                <div>
                  <pre className="code-block text-[0.7rem] mb-4">{`// status.service.js
// Row-level state guard — concurrent safety
const result = await client.query(
  \`UPDATE requests SET status = $1
   WHERE id = $2 AND status = 'SUBMITTED'
   RETURNING id\`,
  ['UNDERREVIEW_EILA', requestId]
)
// rowCount === 0 → concurrent modification
// → ROLLBACK + throw ConflictError`}</pre>
                  <p className="text-xs text-muted leading-relaxed">
                    {t('caseStudy.tpsf.workflow.p2')}
                  </p>
                  <p className="text-xs text-secondary leading-relaxed mt-2 pt-2 border-t border-rule/30">
                    {t('caseStudy.tpsf.workflow.detail')}
                  </p>
                </div>
              </div>

              {/* State flow */}
              <div>
                <div className="mono-label mb-4 text-muted">{t('caseStudy.tpsf.workflow.labelFlow')}</div>
                <TPSFAssessmentFlowDiagram />
                <div className="flex flex-wrap gap-2 items-center">
                  {project.workflowStates?.map((state, i) => (
                    <div key={state.label} className="flex items-center gap-1.5">
                      <div
                        className="px-2.5 py-1.5 border text-[0.65rem] font-mono"
                        style={{ borderColor: `${state.color}40`, color: state.color }}
                      >
                        {state.label}
                      </div>
                      {i < (project.workflowStates?.length ?? 0) - 1 && (
                        <span className="text-ink-muted text-xs">→</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 03 — Role System / Policy */}
          <section>
            <SectionLabel n="03" label={t('caseStudy.sections.access')} />
            <div className="space-y-10">
              {/* Layered Readability Panel */}
              <div className="border border-rule p-6 bg-[#10100e] max-w-4xl">
                <p className="font-display text-[15px] text-primary italic leading-relaxed mb-6">
                  {t('caseStudy.tpsf.access.summary')}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[11px] leading-relaxed">
                  <div>
                    <strong className="text-accent font-mono text-[9px] uppercase block mb-1">Business Context</strong>
                    <p className="text-secondary">{t('caseStudy.tpsf.access.purpose')}</p>
                  </div>
                  <div>
                    <strong className="text-primary font-mono text-[9px] uppercase block mb-1">Implementation Strategy</strong>
                    <p className="text-secondary">{t('caseStudy.tpsf.access.implementation')}</p>
                  </div>
                </div>
              </div>

              <div className="editorial-grid items-start">
                <div>
                  <h2 className="display-xs text-primary mb-4">
                    {t('caseStudy.tpsf.access.title')}<br /><em className="text-ink-muted">{t('caseStudy.tpsf.access.titleItalic')}</em>
                  </h2>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.roles?.map((role) => (
                      <span key={role} className="tag">{role}</span>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    [t('caseStudy.tpsf.access.layer1Title'), t('caseStudy.tpsf.access.layer1Desc')],
                    [t('caseStudy.tpsf.access.layer2Title'), t('caseStudy.tpsf.access.layer2Desc')],
                    [t('caseStudy.tpsf.access.layer3Title'), t('caseStudy.tpsf.access.layer3Desc')],
                  ].map(([title, desc]) => (
                    <div key={title} className="border-l border-rule pl-4 py-1">
                      <div className="text-xs font-medium text-primary mb-1">{title}</div>
                      <div className="text-xs text-muted leading-relaxed">{desc}</div>
                    </div>
                  ))}
                  <p className="text-xs text-muted leading-relaxed pt-2">
                    {t('caseStudy.tpsf.access.detail')}
                  </p>
                </div>
              </div>
            </div>

            {/* Policy check diagram */}
            <div className="border-t border-rule pt-10 mt-10">
              <span className="mono-label text-accent uppercase tracking-wider block mb-4">Security Architecture: 3-Layer Policy Verification</span>
              <TPSFPolicyCheckDiagram />
            </div>
          </section>

          {/* 04 — Auth System */}
          <section>
            <SectionLabel n="04" label={t('caseStudy.sections.auth')} />
            <div className="editorial-grid items-start">
              <div>
                <h2 className="display-xs text-primary mb-0">
                  {t('caseStudy.tpsf.auth.title')}<br /><em className="text-ink-muted">{t('caseStudy.tpsf.auth.titleItalic')}</em>
                </h2>
              </div>
              <div className="space-y-4">
                <pre className="code-block text-[0.7rem]">{`// auth.middleware.js
// HttpOnly cookie takes precedence over Bearer
// When BOTH present with DIFFERENT values:
if (cookieToken && bearerToken
    && cookieToken !== bearerToken) {
  log.warn("[auth anomaly]", { ip, userAgent })
}

// CSRF — timing-safe comparison only
crypto.timingSafeEqual(
  Buffer.from(csrfHeader),
  Buffer.from(csrfCookie)
)`}</pre>
                <div className="space-y-2">
                  {[
                    t('caseStudy.tpsf.auth.desc1'),
                    t('caseStudy.tpsf.auth.desc2'),
                    t('caseStudy.tpsf.auth.desc3'),
                    t('caseStudy.tpsf.auth.desc4'),
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 text-xs text-muted">
                      <span className="text-accent mt-0.5 flex-shrink-0">—</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 05 — Security Architecture */}
          <section>
            <SectionLabel n="05" label={t('caseStudy.sections.securityArch')} />
            <div className="flex flex-col divide-y divide-rule">
              {((t('caseStudy.tpsf.security', { returnObjects: true }) as SecurityItem[]) || []).map((s, i) => (
                <div key={i} className="py-5 first:pt-0">
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8">
                    <span className="text-xs font-medium text-secondary sm:w-48 flex-shrink-0">{s.title}</span>
                    <span className="text-sm text-muted leading-relaxed">{s.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 06 — Engineering Challenges & Decisions */}
          <section>
            <SectionLabel n="06" label={t('caseStudy.sections.challenges')} />
            <div className="space-y-12">
              {((t('caseStudy.tpsf.challenges', { returnObjects: true }) as ChallengeItem[]) || []).map((c, i) => (
                <div key={i} className="editorial-grid items-start pb-8 border-b border-rule/30 last:border-b-0 last:pb-0">
                  <div>
                    <span className="section-number block mb-2">CHALLENGE {String(i + 1).padStart(2, '0')}</span>
                    <h3 className="text-sm font-semibold text-primary">{c.title}</h3>
                  </div>
                  <div className="space-y-4">
                    <p className="text-xs text-secondary leading-relaxed">
                      <strong className="text-primary font-mono text-[10px] uppercase block mb-1">Operational Problem:</strong>
                      {c.problem}
                    </p>
                    <p className="text-xs text-secondary leading-relaxed">
                      <strong className="text-accent font-mono text-[10px] uppercase block mb-1">Engineering Decision:</strong>
                      {c.decision}
                    </p>
                    <p className="text-xs text-secondary leading-relaxed accent-line">
                      <strong className="text-primary font-mono text-[10px] uppercase block mb-1">Result:</strong>
                      {c.result}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 07 — Why This Architecture */}
          <section>
            <SectionLabel n="07" label={t('caseStudy.sections.decisions')} />
            <div className="space-y-10">
              {((t('caseStudy.tpsf.decisions', { returnObjects: true }) as DecisionItem[]) || []).map((d, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-[1.5fr_2fr] gap-8 pb-8 border-b border-rule/30 last:border-b-0 last:pb-0">
                  <div>
                    <h4 className="text-xs font-medium text-primary mb-2 font-mono text-accent">Q: {d.question}</h4>
                    <p className="text-xs text-secondary leading-relaxed">{d.answer}</p>
                  </div>
                  <div>
                    {i === 0 && (
                      <div className="border border-rule p-4 bg-[#10100e]">
                        <a
                          href="https://github.com/Jayxxx1/TPSF_EILA/blob/main/backend/src/services/status.service.js"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mono-label text-[9px] text-accent hover:underline block mb-2"
                        >
                          Explicit SQL Row Lock Transaction ↗
                        </a>
                        <pre className="text-[10px] text-secondary font-mono leading-normal">{`const client = await pool.connect();
try {
  await client.query('BEGIN');
  const result = await client.query(
    \`UPDATE requests SET status = $1 
     WHERE id = $2 AND status = 'SUBMITTED' 
     RETURNING id\`,
    ['UNDERREVIEW_EILA', requestId]
  );
  if (result.rowCount === 0) {
    throw new ConflictError('CONCURRENT_MODIFICATION');
  }
  await client.query('COMMIT');
} catch (e) {
  await client.query('ROLLBACK');
  throw e;
} finally { client.release(); }`}</pre>
                      </div>
                    )}
                    {i === 1 && (
                      <div className="border border-rule p-4 bg-[#10100e]">
                        <a
                          href="https://github.com/Jayxxx1/TPSF_EILA/blob/main/backend/src/middlewares/auth.js"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mono-label text-[9px] text-accent hover:underline block mb-2"
                        >
                          Timing-Safe CSRF Verification ↗
                        </a>
                        <pre className="text-[10px] text-secondary font-mono leading-normal">{`import crypto from 'crypto';
export function verifyCsrfToken(csrfHeader, csrfCookie) {
  const headerBuf = Buffer.from(csrfHeader);
  const cookieBuf = Buffer.from(csrfCookie);
  if (headerBuf.length !== cookieBuf.length) {
    return false;
  }
  return crypto.timingSafeEqual(headerBuf, cookieBuf);
}`}</pre>
                      </div>
                    )}
                    {i === 2 && (
                      <div className="border border-rule p-4 bg-[#10100e]">
                        <a
                          href="https://github.com/Jayxxx1/TPSF_EILA/blob/main/backend/src/services/upload.service.js"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mono-label text-[9px] text-accent hover:underline block mb-2"
                        >
                          Upload Binary Scanner ↗
                        </a>
                        <pre className="text-[10px] text-secondary font-mono leading-normal">{`const DANGEROUS_MARKERS = [
  '/JavaScript', '/OpenAction', '/Launch', '/EmbeddedFile', '/AcroForm'
];
export function scanPdfBuffer(buffer) {
  const content = buffer.toString('utf-8');
  for (const marker of DANGEROUS_MARKERS) {
    if (content.includes(marker)) {
      throw new ValidationError(\`MALICIOUS_PDF_MARKER: \${marker}\`);
    }
  }
}`}</pre>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 08 — Operational Realities & Maintenance */}
          <section>
            <SectionLabel n="08" label={t('caseStudy.sections.productionReality')} />
            <div className="editorial-grid items-start">
              <div>
                <h3 className="text-sm font-semibold text-primary mb-2">
                  {t('caseStudy.tpsf.productionReality.title')}
                </h3>
                <p className="text-xs text-secondary leading-relaxed">
                  Academic operations exist within strict institutional sandboxes. Sustaining an enterprise-wide application requires accommodating hardware limits, peak submission loads, and raw data inconsistencies.
                </p>
              </div>
              <div className="space-y-6 text-xs text-secondary leading-relaxed">
                <div>
                  <strong className="text-primary font-mono text-[9px] uppercase block mb-1">Database Migrations & Maintenance</strong>
                  <p>{t('caseStudy.tpsf.productionReality.maintenance')}</p>
                </div>
                <div>
                  <strong className="text-primary font-mono text-[9px] uppercase block mb-1">Concurrency & Connection Safety</strong>
                  <p>{t('caseStudy.tpsf.productionReality.concurrency')}</p>
                </div>
                <div>
                  <strong className="text-primary font-mono text-[9px] uppercase block mb-1">Data Quality & Normalization Realities</strong>
                  <p>{t('caseStudy.tpsf.productionReality.behavior')}</p>
                </div>
              </div>
            </div>
          </section>

          {/* 09 — Reality & System Scars */}
          <section>
            <SectionLabel n="09" label={t('caseStudy.sections.scars')} />
            <div className="editorial-grid items-start">
              <div>
                <h3 className="text-sm font-semibold text-primary mb-2">System Evolution in Production</h3>
                <p className="text-xs text-secondary leading-relaxed">
                  Academic assessment cycles are subject to strict institutional policies. Evolving the system to match university structures required addressing real-world edge cases.
                </p>
              </div>
              <div className="space-y-4">
                {((t('caseStudy.tpsf.scars', { returnObjects: true }) as string[]) || []).map((scar, i) => (
                  <div key={i} className="flex gap-4 items-start border-l border-rule pl-4 py-1">
                    <span className="font-mono text-[10px] text-accent mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                    <p className="text-xs text-muted leading-relaxed">{scar}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 10 — Full-Stack Ownership & Context */}
          <section>
            <SectionLabel n="10" label={t('caseStudy.sections.ownership')} />
            <div className="editorial-grid items-start">
              <div>
                <h3 className="text-sm font-semibold text-primary mb-2">
                  {t('caseStudy.tpsf.ownership.title')}
                </h3>
              </div>
              <div className="space-y-4 text-xs text-secondary leading-relaxed">
                <p>{t('caseStudy.tpsf.ownership.p1')}</p>
                <p className="accent-line">{t('caseStudy.tpsf.ownership.p2')}</p>
              </div>
            </div>
          </section>

          {/* 11 — Engineering Highlights */}
          <section>
            <SectionLabel n="11" label={t('caseStudy.sections.highlights')} />
            <div className="flex flex-col divide-y divide-rule">
              {project.highlights.map((h, i) => (
                <div key={h.title} className="py-8 first:pt-0">
                  <div className="editorial-grid items-start">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="section-number">{String(i + 1).padStart(2, '0')}</span>
                        {h.badge && <span className="tag text-accent">{h.badge}</span>}
                      </div>
                      <h3 className="text-sm font-medium text-primary leading-snug">
                        {t(`projects.tpsf-eila.highlights.${i}.title`, h.title)}
                      </h3>
                    </div>
                    <div>
                      <p className="text-secondary text-sm leading-relaxed mb-3">
                        {t(`projects.tpsf-eila.highlights.${i}.description`, h.description)}
                      </p>
                      {h.code && (
                        <>
                          <pre className="code-block text-[0.7rem]">{h.code}</pre>
                          <div className="mt-2 text-right">
                            <a
                              href={
                                i === 0 ? "https://github.com/Jayxxx1/TPSF_EILA/blob/main/backend/src/middlewares/auth.js" :
                                i === 1 ? "https://github.com/Jayxxx1/TPSF_EILA/blob/main/backend/src/services/status.service.js" :
                                i === 3 ? "https://github.com/Jayxxx1/TPSF_EILA/blob/main/backend/src/services/upload.service.js" :
                                project.github
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[10px] text-accent hover:underline font-mono inline-flex items-center gap-1"
                            >
                              Inspect implementation in repository &rarr;
                            </a>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 12 — Full Stack */}
          <section>
            <SectionLabel n="12" label={t('caseStudy.sections.stack')} />
            <div className="flex flex-col divide-y divide-rule">
              {project.techStack.map((cat) => (
                <div key={cat.category} className="py-5 first:pt-0">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-8">
                    <span className="text-xs font-medium text-secondary sm:w-56 flex-shrink-0 pt-0.5">
                      {getStackCategoryLabel(cat.category)}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.items.map(item => <span key={item} className="tag">{item}</span>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="border-t border-rule pt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-xl text-primary mb-1">{t('caseStudy.exploreCode')}</h3>
              <p className="text-secondary text-sm">{t('caseStudy.codebaseNoteTPSF')}</p>
            </div>
            <div className="flex items-center gap-4">
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn">
                {t('caseStudy.viewGithub')}
              </a>
              <Link to="/projects/boonraksa" className="btn-text text-sm">{t('caseStudy.viewBoonraksa')}</Link>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  )
}
