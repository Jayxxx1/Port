import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { projects } from '../data/projects'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

const project = projects.find(p => p.id === 'boonraksa')!

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
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

function BoonraksaWorkflowDiagram() {
  return (
    <svg className="w-full max-w-3xl mx-auto my-6" viewBox="0 0 700 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Step 1: Intake */}
      <rect x="10" y="30" width="100" height="50" rx="3" stroke="#252522" fill="#141412" strokeWidth="1"/>
      <text x="60" y="55" fill="#f0efe9" fontSize="10" fontFamily="Sarabun, sans-serif" textAnchor="middle" fontWeight="600">Sales Intake</text>
      <text x="60" y="70" fill="#9a9991" fontSize="8" fontFamily="Sarabun, sans-serif" textAnchor="middle">Order Intake</text>

      <path d="M110 55 H140" stroke="#252522" strokeWidth="1" markerEnd="url(#arrow)"/>

      {/* Step 2: Artwork & QA */}
      <rect x="140" y="30" width="110" height="50" rx="3" stroke="#252522" fill="#141412" strokeWidth="1"/>
      <text x="195" y="55" fill="#f0efe9" fontSize="10" fontFamily="Sarabun, sans-serif" textAnchor="middle" fontWeight="600">Artwork & QA</text>
      <text x="195" y="70" fill="#9a9991" fontSize="8" fontFamily="Sarabun, sans-serif" textAnchor="middle">Graphic Design</text>

      <path d="M250 55 H280" stroke="#252522" strokeWidth="1" markerEnd="url(#arrow)"/>

      {/* Step 3: Stock */}
      <rect x="280" y="30" width="100" height="50" rx="3" stroke="#252522" fill="#141412" strokeWidth="1"/>
      <text x="330" y="55" fill="#f0efe9" fontSize="10" fontFamily="Sarabun, sans-serif" textAnchor="middle" fontWeight="600">Stock Check</text>
      <text x="330" y="70" fill="#9a9991" fontSize="8" fontFamily="Sarabun, sans-serif" textAnchor="middle">Inventory Allocation</text>

      <path d="M380 55 H410" stroke="#252522" strokeWidth="1" markerEnd="url(#arrow)"/>

      {/* Step 4: Production */}
      <rect x="410" y="30" width="120" height="50" rx="3" stroke="#c4a882" fill="#141412" strokeWidth="1"/>
      <text x="470" y="55" fill="#c4a882" fontSize="10" fontFamily="Sarabun, sans-serif" textAnchor="middle" fontWeight="600">Embroidery & Sewing</text>
      <text x="470" y="70" fill="#9a9991" fontSize="8" fontFamily="Sarabun, sans-serif" textAnchor="middle">Rank Guard Protection</text>

      <path d="M530 55 H560" stroke="#252522" strokeWidth="1" markerEnd="url(#arrow)"/>

      {/* Step 5: QC & Ship */}
      <rect x="560" y="30" width="120" height="50" rx="3" stroke="#252522" fill="#141412" strokeWidth="1"/>
      <text x="620" y="55" fill="#f0efe9" fontSize="10" fontFamily="Sarabun, sans-serif" textAnchor="middle" fontWeight="600">QC, Finance & Ship</text>
      <text x="620" y="70" fill="#9a9991" fontSize="8" fontFamily="Sarabun, sans-serif" textAnchor="middle">Slip Check & Closure</text>

      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#252522"/>
        </marker>
      </defs>
    </svg>
  )
}

function BoonraksaLinkedOrderDiagram() {
  return (
    <svg className="w-full max-w-xl mx-auto my-6" viewBox="0 0 500 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Root order box */}
      <rect x="180" y="10" width="140" height="50" rx="4" stroke="#c4a882" fill="#141412" strokeWidth="1"/>
      <text x="250" y="33" fill="#c4a882" fontSize="11" fontFamily="Sarabun, sans-serif" textAnchor="middle" fontWeight="600">Root Order (Main)</text>
      <text x="250" y="47" fill="#9a9991" fontSize="9" fontFamily="Sarabun, sans-serif" textAnchor="middle">Owns Group Payments</text>

      {/* Transaction arrow down */}
      <path d="M250 60 V100" stroke="#c4a882" strokeWidth="1" strokeDasharray="3 3"/>
      <text x="260" y="85" fill="#c4a882" fontSize="9" fontFamily="JetBrains Mono, monospace">prisma.$transaction()</text>

      {/* Child order 1 */}
      <rect x="30" y="110" width="120" height="50" rx="3" stroke="#252522" fill="#141412" strokeWidth="1"/>
      <text x="90" y="133" fill="#f0efe9" fontSize="10" fontFamily="Sarabun, sans-serif" textAnchor="middle">Sub-Order #1 (Sewing)</text>
      <text x="90" y="147" fill="#9a9991" fontSize="8" fontFamily="Sarabun, sans-serif" textAnchor="middle">Inherits tracking no.</text>

      {/* Child order 2 */}
      <rect x="190" y="110" width="120" height="50" rx="3" stroke="#252522" fill="#141412" strokeWidth="1"/>
      <text x="250" y="133" fill="#f0efe9" fontSize="10" fontFamily="Sarabun, sans-serif" textAnchor="middle">Sub-Order #2 (Embroidery)</text>
      <text x="250" y="147" fill="#9a9991" fontSize="8" fontFamily="Sarabun, sans-serif" textAnchor="middle">Inherits tracking no.</text>

      {/* Child order 3 */}
      <rect x="350" y="110" width="120" height="50" rx="3" stroke="#252522" fill="#141412" strokeWidth="1"/>
      <text x="410" y="133" fill="#f0efe9" fontSize="10" fontFamily="Sarabun, sans-serif" textAnchor="middle">Sub-Order #3 (QC)</text>
      <text x="410" y="147" fill="#9a9991" fontSize="8" fontFamily="Sarabun, sans-serif" textAnchor="middle">Inherits tracking no.</text>

      {/* Connecting lines */}
      <path d="M250 100 H90 V110" stroke="#252522" strokeWidth="1"/>
      <path d="M250 100 V110" stroke="#252522" strokeWidth="1"/>
      <path d="M250 100 H410 V110" stroke="#252522" strokeWidth="1"/>
    </svg>
  )
}

interface EvidenceCardProps {
  src: string
  caption: string
  context: string
  significance: string
}

function EvidenceCard({ src, caption, context, significance }: EvidenceCardProps) {
  return (
    <div className="border border-rule bg-bg-surface overflow-hidden my-10">
      <div className="aspect-[16/9] w-full bg-[#10100e] relative flex items-center justify-center overflow-hidden border-b border-rule">
        {/* Real production screenshot image */}
        <img
          src={src}
          alt={caption}
          className="w-full h-full object-cover object-top opacity-95 transition-opacity hover:opacity-100 duration-300"
          onError={(e) => {
            // Safe fallback visually representing image outline if screenshot file is pending
            const target = e.target as HTMLImageElement
            target.style.display = 'none'
            const parent = target.parentElement
            if (parent) {
              const placeholder = document.createElement('div')
              placeholder.className = 'absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-muted font-mono text-[11px]'
              placeholder.innerHTML = `
                <div class="border border-dashed border-rule px-8 py-16 w-full h-full flex flex-col justify-center items-center">
                  <div class="text-accent mb-2">OPERATIONAL EVIDENCE SYSTEM IMAGE</div>
                  <div class="text-secondary max-w-sm mb-1">${caption}</div>
                  <div class="text-[9px] text-muted font-mono mt-4">Place screenshot in: ${src}</div>
                </div>
              `
              parent.appendChild(placeholder)
            }
          }}
        />
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 border-t border-rule/50">
        <div>
          <span className="mono-label text-accent uppercase tracking-wider block mb-1">Operational Evidence</span>
          <h4 className="text-sm font-semibold text-primary">{caption}</h4>
        </div>
        <div className="space-y-3">
          <p className="text-secondary text-xs leading-relaxed">
            <strong className="text-primary">System Context:</strong> {context}
          </p>
          <p className="text-secondary text-xs leading-relaxed">
            <strong className="text-primary">Architectural Significance:</strong> {significance}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function BoonraksaDetail() {
  const { t } = useTranslation()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const getMetricLabel = (originalLabel: string) => {
    const keyMap: Record<string, string> = {
      'User Roles': 'roles',
      'Order States': 'states',
      'Flow Types': 'flows',
      'Service Files': 'services',
      'Test Suites': 'tests',
      'DB Models': 'models',
    }
    const key = keyMap[originalLabel]
    return key ? t(`projects.boonraksa.metrics.${key}`) : originalLabel
  }

  const getStackCategoryLabel = (cat: string) => {
    const keyMap: Record<string, string> = {
      'Frontend': 'Frontend',
      'Backend': 'Backend',
      'Infrastructure': 'Infrastructure',
      'Realtime & Notifications': 'Realtime & Notifications',
      'Production Services': 'Production Services',
      'Testing': 'Testing',
    }
    const key = keyMap[cat]
    return key ? t(`caseStudy.stackCategories.${key}`, cat) : cat
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Case study header */}
      <div className="pt-32 pb-16 border-b border-rule">
        <div className="site-container">
          <motion.div {...fade(0.05)}>
            <Link to="/" className="btn-text mono-label mb-10 inline-flex">
              {t('caseStudy.back')}
            </Link>
          </motion.div>

          <motion.div {...fade(0.1)} className="flex items-center gap-5 mb-8">
            <span className="eyebrow">{t('caseStudy.typeErp')}</span>
            <div className="flex items-center gap-2">
              <span className="status-dot" />
              <span className="mono-label text-accent">{t('caseStudy.largestSystem')}</span>
            </div>
          </motion.div>

          <motion.h1 {...fade(0.18)} className="display text-primary mb-4 max-w-4xl">
            {t('projects.boonraksa.title', project.title)}
          </motion.h1>
          <motion.p {...fade(0.25)} className="text-secondary text-lg max-w-[60ch] mb-8">
            {t('projects.boonraksa.subtitle')}
            <a
              href="https://www.boonraksa-erp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline ml-2 inline-flex items-center gap-1"
            >
              {t('projects.boonraksa.viewSite')}
            </a>
          </motion.p>

          <motion.div {...fade(0.32)} className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="text-accent text-xs font-mono">{t('projects.boonraksa.role')}</span>
            <span className="mono-label text-muted">·</span>
            <span className="mono-label">{t('projects.boonraksa.period')}</span>
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

      {/* Metrics bar */}
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

      <div className="site-container py-20">
        <div className="max-w-5xl mx-auto space-y-24">

          {/* 01 — What it solves */}
          <section>
            <SectionLabel n="01" label={t('caseStudy.sections.problem')} />
            <div className="editorial-grid">
              <div>
                <h2 className="display-xs text-primary mb-0">
                  {t('caseStudy.boonraksa.problem.title')}<br /><em className="text-ink-muted">{t('caseStudy.boonraksa.problem.titleItalic')}</em>
                </h2>
              </div>
              <div className="space-y-4 text-secondary text-sm leading-relaxed">
                <p>
                  {t('caseStudy.boonraksa.problem.p1')}
                </p>
                <p>
                  {t('caseStudy.boonraksa.problem.p2')}
                </p>
                <p className="accent-line py-1 text-secondary">
                  {t('caseStudy.boonraksa.problem.p3')}
                </p>
              </div>
            </div>

            {/* Dashboard Screenshot Integration */}
            <EvidenceCard
              src="/assets/evidence/dashboard.png"
              caption={t('caseStudy.boonraksa.evidence.dashboard.caption')}
              context={t('caseStudy.boonraksa.evidence.dashboard.context')}
              significance={t('caseStudy.boonraksa.evidence.dashboard.significance')}
            />
          </section>

          {/* 02 — Order State Machine */}
          <section>
            <SectionLabel n="02" label={t('caseStudy.sections.workflow')} />
            <div className="space-y-8">
              <div className="editorial-grid items-start">
                <div>
                  <h2 className="display-xs text-primary mb-4">{t('caseStudy.boonraksa.workflow.title')}<br /><em className="text-ink-muted">{t('caseStudy.boonraksa.workflow.titleItalic')}</em></h2>
                  <p className="text-secondary text-sm leading-relaxed">
                    {t('caseStudy.boonraksa.workflow.p1')}
                  </p>
                </div>
                <div>
                  {/* Rank guard highlight */}
                  <div className="border border-rule p-5 mb-4">
                    <div className="mono-label mb-3 text-muted">{t('caseStudy.boonraksa.workflow.labelGuard')}</div>
                    <pre className="code-block text-[0.7rem]">{`// order.workflow.js
if (nextRank < currentRank && !isAdmin) {
  log.warn("SUSPICIOUS_STATUS_REVERSION", {
    actor: user.name,
    role: user.role,
    from: currentStatus,
    to: targetStatus,
  })
  throw new WorkflowError("SUSPICIOUS_STATUS_REVERSION")
}`}</pre>
                  </div>
                  <p className="text-xs text-muted">
                    {t('caseStudy.boonraksa.workflow.p2')}
                  </p>
                </div>
              </div>

              {/* State flow diagram */}
              <div>
                <div className="mono-label mb-4 text-muted">{t('caseStudy.boonraksa.workflow.labelFlow')}</div>
                <BoonraksaWorkflowDiagram />
                
                <div className="flex flex-wrap gap-2 mt-6">
                  {project.workflowStates?.map((state, i) => (
                    <div key={state.label} className="flex items-center gap-1.5">
                      <div
                        className="flex items-center gap-1.5 px-2.5 py-1.5 border text-[0.65rem] font-mono"
                        style={{ borderColor: `${state.color}40`, color: state.color }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: state.color }} />
                        {state.label}
                      </div>
                      {i < (project.workflowStates?.length ?? 0) - 1 && (
                        <span className="text-ink-muted text-xs">→</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Workflow Screenshot Integration */}
              <EvidenceCard
                src="/assets/evidence/order-workflow.png"
                caption={t('caseStudy.boonraksa.evidence.workflow.caption')}
                context={t('caseStudy.boonraksa.evidence.workflow.context')}
                significance={t('caseStudy.boonraksa.evidence.workflow.significance')}
              />
            </div>
          </section>

          {/* 03 — Permission Engine */}
          <section>
            <SectionLabel n="03" label={t('caseStudy.sections.rbac')} />
            <div className="editorial-grid items-start">
              <div>
                <h2 className="display-xs text-primary mb-4">
                  {t('caseStudy.boonraksa.rbac.title')}<br /><em className="text-ink-muted">{t('caseStudy.boonraksa.rbac.titleItalic')}</em>
                </h2>
                <p className="text-secondary text-sm leading-relaxed mb-6">
                  {t('caseStudy.boonraksa.rbac.p1')}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.roles?.map((role) => (
                    <span key={role} className="tag text-accent">{role}</span>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <pre className="code-block text-[0.7rem]">{`// order.permissions.js
canPerformAction(order, "COMPLETE_ORDER", user)
// → { allowed: false, code: "LINKED_MAIN_ORDER_REQUIRED" }

// Shadow assignee detection
isShadowWorkflowAssignee(order, user)
// → allows admin override transparently

// 30+ flags computed at once for frontend
getOrderActionMap(order, user)
// → { canShip, canVerifyPayment,
//    canUploadSlip, canEditSpecs, ... }`}</pre>
                <div className="space-y-3 pt-2">
                  {[
                    [t('caseStudy.boonraksa.rbac.shadowTitle'), t('caseStudy.boonraksa.rbac.shadowDesc')],
                    [t('caseStudy.boonraksa.rbac.linkedTitle'), t('caseStudy.boonraksa.rbac.linkedDesc')],
                    [t('caseStudy.boonraksa.rbac.paymentTitle'), t('caseStudy.boonraksa.rbac.paymentDesc')],
                  ].map(([title, desc]) => (
                    <div key={title} className="border-l border-rule pl-4 py-1">
                      <div className="text-xs font-medium text-primary mb-1">{title}</div>
                      <div className="text-xs text-muted leading-relaxed">{desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Role console screenshot */}
            <EvidenceCard
              src="/assets/evidence/role-interface.png"
              caption={t('caseStudy.boonraksa.evidence.role.caption')}
              context={t('caseStudy.boonraksa.evidence.role.context')}
              significance={t('caseStudy.boonraksa.evidence.role.significance')}
            />
          </section>

          {/* 04 — Engineering Highlights */}
          <section>
            <SectionLabel n="04" label={t('caseStudy.sections.highlights')} />
            <div className="flex flex-col divide-y divide-rule">
              {project.highlights.map((h, i) => (
                <motion.div
                  key={h.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="py-8 first:pt-0"
                >
                  <div className="editorial-grid items-start">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="section-number">{String(i + 1).padStart(2, '0')}</span>
                        {h.badge && <span className="tag text-accent">{h.badge}</span>}
                      </div>
                      <h3 className="text-sm font-medium text-primary leading-snug">
                        {t(`projects.boonraksa.highlights.${i}.title`, h.title)}
                      </h3>
                    </div>
                    <div>
                      <p className="text-secondary text-sm leading-relaxed mb-3">
                        {t(`projects.boonraksa.highlights.${i}.description`, h.description)}
                      </p>
                      {h.code && (
                        <pre className="code-block text-[0.7rem]">{h.code}</pre>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Linked order diagram */}
            <div className="border-t border-rule pt-10 mt-10">
              <span className="mono-label text-accent uppercase tracking-wider block mb-4">Database Operations: Linked Order Transitions</span>
              <BoonraksaLinkedOrderDiagram />
            </div>

            {/* Financial Reconciliation Showcase */}
            <EvidenceCard
              src="/assets/evidence/finance.png"
              caption={t('caseStudy.boonraksa.evidence.finance.caption')}
              context={t('caseStudy.boonraksa.evidence.finance.context')}
              significance={t('caseStudy.boonraksa.evidence.finance.significance')}
            />
          </section>

          {/* 05 — Architecture */}
          <section>
            <SectionLabel n="05" label={t('caseStudy.sections.architecture')} />
            <div className="flex flex-col divide-y divide-rule">
              {project.architecture.map((a, i) => (
                <div key={a.label} className="py-5 first:pt-0">
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8">
                    <span className="text-xs font-medium text-secondary sm:w-56 flex-shrink-0">{a.label}</span>
                    <span className="text-sm text-muted leading-relaxed">
                      {t(`projects.boonraksa.architecture.${i}.description`, a.description)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 06 — Tech Stack */}
          <section>
            <SectionLabel n="06" label={t('caseStudy.sections.stack')} />
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

          {/* Bottom CTA */}
          <div className="border-t border-rule pt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-xl text-primary mb-1">{t('caseStudy.exploreCode')}</h3>
              <p className="text-secondary text-sm">{t('caseStudy.codebaseNote')}</p>
            </div>
            <div className="flex items-center gap-4">
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn">
                {t('caseStudy.viewGithub')}
              </a>
              <Link to="/#contact" className="btn-text text-sm">{t('caseStudy.contactBtn')}</Link>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  )
}
