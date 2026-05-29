export interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  role: string
  period: string
  github: string
  liveUrl?: string
  isPrimary: boolean
  metrics: { label: string; value: string }[]
  techStack: { category: string; items: string[] }[]
  highlights: {
    title: string
    description: string
    code?: string
    badge?: string
  }[]
  architecture: {
    label: string
    description: string
  }[]
  workflowStates?: { label: string; color: string; description: string }[]
  roles?: string[]
}

export const projects: Project[] = [
  {
    id: 'boonraksa',
    title: 'Boonraksa-ERP System',
    subtitle: 'ERP & Production Workflow System',
    description:
      'A full-stack operational ERP system built from scratch for a custom embroidery and apparel manufacturing business. Replaces scattered manual tools — chat, spreadsheets, human memory — with a single cross-department platform that coordinates sales, artwork, stock, production, sewing, QC, delivery, finance, and marketing.',
    role: 'Sole Developer — Architecture to Deployment',
    period: '2024 – Present',
    github: 'https://github.com/Jayxxx1/BoonraksaV2',
    isPrimary: true,
    metrics: [
      { label: 'User Roles', value: '17' },
      { label: 'Order States', value: '21+' },
      { label: 'Flow Types', value: '4' },
      { label: 'Service Files', value: '42' },
      { label: 'Test Suites', value: '17' },
      { label: 'DB Models', value: '30+' },
    ],
    roles: [
      'SALES', 'GRAPHIC', 'LEAD_GRAPHIC', 'QA', 'STOCK', 'PURCHASING',
      'PRODUCTION', 'QC', 'SEWING_QC', 'SEWING', 'DELIVERY',
      'FINANCE', 'MARKETING', 'MARKETING_HEADER', 'DIGITIZER',
      'ADMIN', 'EXECUTIVE',
    ],
    workflowStates: [
      { label: 'PENDING_ARTWORK', color: '#6366f1', description: 'Awaiting graphic design' },
      { label: 'DESIGNING', color: '#818cf8', description: 'Graphic working on artwork' },
      { label: 'WAITING_ARTWORK_QA', color: '#f59e0b', description: 'Pending QA approval' },
      { label: 'PENDING_STOCK_CHECK', color: '#3b82f6', description: 'Stock team verifying inventory' },
      { label: 'STOCK_ISSUE', color: '#ef4444', description: 'Stock problem reported' },
      { label: 'PENDING_EMBROIDERY', color: '#8b5cf6', description: 'Queued for production' },
      { label: 'IN_PRODUCTION', color: '#a855f7', description: 'Embroidery in progress' },
      { label: 'PENDING_SEWING', color: '#06b6d4', description: 'Awaiting sewing team' },
      { label: 'IN_SEWING', color: '#0ea5e9', description: 'Sewing in progress' },
      { label: 'SEWING_FINISHED', color: '#22c55e', description: 'Sewing complete' },
      { label: 'QC_PASSED', color: '#16a34a', description: 'Quality check passed' },
      { label: 'READY_TO_SHIP', color: '#84cc16', description: 'Awaiting delivery' },
      { label: 'COMPLETED', color: '#22c55e', description: 'Delivered to customer' },
    ],
    techStack: [
      {
        category: 'Frontend',
        items: ['React 19', 'Vite', 'TailwindCSS', 'React Router', 'Recharts', 'Socket.IO Client', 'Axios'],
      },
      {
        category: 'Backend',
        items: ['Node.js ESM', 'Express 4', 'Prisma ORM 5.22', 'PostgreSQL 16', 'Zod', 'JWT'],
      },
      {
        category: 'Infrastructure',
        items: ['Docker Compose', 'Nginx', 'PM2', 'AWS S3 SDK v3', 'Supabase'],
      },
      {
        category: 'Realtime & Notifications',
        items: ['Socket.IO 4.8', 'Web Push API', 'node-cron'],
      },
      {
        category: 'Production Services',
        items: ['Sentry Node 8', 'Puppeteer 24 (PDF)', 'Sharp (images)', 'ExcelJS', 'qrcode'],
      },
      {
        category: 'Testing',
        items: ['Jest 30', '17 test suite files', 'Unit + integration tests'],
      },
    ],
    highlights: [
      {
        title: 'Pure-Function RBAC Permission Engine',
        badge: '736 lines',
        description:
          'Every action on every order passes through canPerformAction(order, action, user) — returning structured { allowed, code } results, not exceptions. Shadow assignee detection allows admin override without explicit bypass code everywhere.',
        code: 'canPerformAction(order, "COMPLETE_ORDER", user)\n// → { allowed: false, code: "LINKED_MAIN_ORDER_REQUIRED" }',
      },
      {
        title: 'Atomic Linked Order Group Transactions',
        badge: 'prisma.$transaction()',
        description:
          'When completing a linked order group, all sub-orders are atomically updated to COMPLETED with the same tracking number in a single database transaction — guaranteeing group consistency.',
        code: 'await prisma.$transaction(async (tx) => {\n  for (const orderId of linkedOrderIds) {\n    await tx.order.update({ where: { id: orderId }, data: { status: "COMPLETED", trackingNo } })\n  }\n})',
      },
      {
        title: 'Downstream Rank Guard — Anti-Reversion Logic',
        badge: 'Security',
        description:
          'Order statuses are mapped to numeric ranks (1–16). If a requested transition would go to a lower rank without admin override, the system throws SUSPICIOUS_STATUS_REVERSION and logs the actor — preventing accidental backward transitions.',
        code: 'if (nextRank < currentRank && !isAdmin) {\n  throw new Error("SUSPICIOUS_STATUS_REVERSION")\n}',
      },
      {
        title: 'SLA Tracking with Stage-Aware Deadline Math',
        badge: '393 lines',
        description:
          'Per-order SLA snapshots compute targetDeadline = dueDate − downstreamReserveDays + slaBufferLevel(0–3 days). Each stage gets a proportional share of the remaining time. Stale orders (idle >24h) are flagged regardless of deadline.',
      },
      {
        title: 'Finance Reconciliation with Group Payment Aggregation',
        badge: '796 lines',
        description:
          'Finance overview aggregates realRevenue (sum of payment slips) vs virtualSales (sum of totalPrice), computing the outstanding gap across linked order groups. Payment slips are S3-signed with Promise.allSettled() so one failed signature never crashes the response.',
      },
      {
        title: '17 Jest Test Suites',
        badge: 'Jest 30',
        description:
          'Backend test coverage across: workflow, finance, linking, KPI, analytics, payments, embroidery, profile, documents, create, shared, reads, discovery, assets, system-config, and storage-url services.',
      },
    ],
    architecture: [
      { label: 'React 19 + Vite', description: 'Feature-folder frontend with role-specific dashboard views, Recharts analytics, realtime Socket.IO updates' },
      { label: 'Express 4 (ESM)', description: '15 route modules, async error handler middleware, helmet security headers, role guard middleware chain' },
      { label: 'Prisma ORM + PostgreSQL 16', description: '915-line schema, 30+ models, 8 composite indexes on Order model, transactional mutations throughout' },
      { label: 'AWS S3 + Presigned URLs', description: 'All order assets (artworks, embroidery files, mockups, payment slips) stored via S3 SDK v3 with time-limited access URLs' },
      { label: 'Socket.IO + Web Push', description: 'Realtime workflow notifications on desktop + mobile via push subscriptions; deferred from main mutation path' },
      { label: 'Docker Compose + PM2', description: 'PostgreSQL 16, nginx frontend container, backend with health checks; PM2 ecosystem config for VPS process management' },
      { label: 'Sentry + SystemLog', description: 'Error tracking via Sentry Node + internal SystemLog model for structured operational audit trail' },
    ],
  },
  {
    id: 'tpsf-eila',
    title: 'PSU TPSF EILA',
    subtitle: 'University Academic Assessment Workflow Platform',
    description:
      'A multi-role academic performance assessment system deployed at Prince of Songkla University. Digitizes the faculty assessment workflow: from initial application through evaluation, committee review, document management, and certification — replacing a previously manual, paper-based process.',
    role: 'Sole Developer — Architecture to Deployment',
    period: '2023 – Present',
    github: 'https://github.com/Jayxxx1/TPSF_EILA',
    isPrimary: false,
    metrics: [
      { label: 'User Roles', value: '9' },
      { label: 'Workflow States', value: '9' },
      { label: 'API Modules', value: '13' },
      { label: 'Auth Modes', value: '2' },
      { label: 'PDF Markers Scanned', value: '9' },
      { label: 'Deployment', value: 'PSU Docker' },
    ],
    roles: [
      'SUPER_ADMIN', 'EILA_ADMIN', 'EILA_EXECUTIVE',
      'FAC_OFFICER', 'APPLICANT', 'EXPERT', 'COMMITTEE', 'COMMITTEE_HEAD', 'QA',
    ],
    workflowStates: [
      { label: 'DRAFT', color: '#6b7280', description: 'Applicant drafting submission' },
      { label: 'SUBMITTED', color: '#6366f1', description: 'Submitted, awaiting EILA review' },
      { label: 'UNDERREVIEW_EILA', color: '#818cf8', description: 'EILA admin reviewing' },
      { label: 'ASSIGN_COMMIT', color: '#f59e0b', description: 'Assigning evaluators' },
      { label: 'EVALUATING', color: '#3b82f6', description: 'Evaluators reviewing' },
      { label: 'EVALUATED', color: '#8b5cf6', description: 'Evaluation complete' },
      { label: 'MOREDOC', color: '#ef4444', description: 'Additional documents requested' },
      { label: 'APPROVED', color: '#22c55e', description: 'Certified / Approved' },
      { label: 'REJECTED', color: '#ef4444', description: 'Application rejected' },
    ],
    techStack: [
      {
        category: 'Frontend',
        items: ['React 18', 'Vite', 'TailwindCSS', 'React Router v6', 'React.lazy() code splitting'],
      },
      {
        category: 'Backend',
        items: ['Node.js', 'Express 5', 'PostgreSQL', 'Joi validation', 'JWT + HttpOnly cookies'],
      },
      {
        category: 'Auth',
        items: ['Local JWT auth', 'PSU Passport (Authentik OAuth2/OIDC)', 'CSRF protection', 'Timing-safe comparison'],
      },
      {
        category: 'Storage',
        items: ['S3-compatible storage', 'Local filesystem fallback', 'PDF security scanning'],
      },
      {
        category: 'Infrastructure',
        items: ['Docker Compose', 'Nginx', 'PSU Private Registry', 'GitLab CI/CD'],
      },
    ],
    highlights: [
      {
        title: 'Hybrid Dual-Transport JWT with Security Anomaly Logging',
        badge: 'auth.middleware.js',
        description:
          'HttpOnly cookie takes precedence over Authorization: Bearer. When both tokens are present with different values, an [auth anomaly] event is logged with IP + user agent — a real security monitoring pattern.',
        code: 'if (cookieToken && bearerToken && cookieToken !== bearerToken) {\n  log("[auth anomaly]", { ip, userAgent })\n}',
      },
      {
        title: 'Data-Driven State Machine with Moredoc Routing',
        badge: 'status.service.js · 543 lines',
        description:
          'Every transition runs inside a PostgreSQL client transaction with row-level state guard (WHERE status = \'DRAFT\'). The moredoc return state is computed at runtime by querying the request_evaluators table — routing logic is data-driven, not hardcoded.',
        code: 'const returnStatus = await resolveMoredocReturnStatus(requestId)\n// Queries request_evaluators to determine correct state',
      },
      {
        title: 'Three-Layer Policy Enforcement',
        badge: 'request.policy.js',
        description:
          'canView() checks: (1) role → (2) evaluator assignment via request_evaluators join → (3) faculty scope normalization. FAC_OFFICER reads are campus+faculty scoped at the policy layer, not just UI.',
      },
      {
        title: 'PDF Binary Content Scanner',
        badge: 'upload.service.js',
        description:
          'Uploaded PDFs are scanned for 9 dangerous binary markers (/JavaScript, /OpenAction, /Launch, /EmbeddedFile, /AcroForm, etc.) before storage — not a file extension check, actual binary content analysis.',
        code: 'const DANGEROUS_MARKERS = [\n  "/JavaScript", "/OpenAction", "/Launch",\n  "/EmbeddedFile", "/AcroForm", ...\n]',
      },
      {
        title: '5-Level Finance Policy Fallback Chain',
        badge: 'finance-policy.service.js · 725 lines',
        description:
          'Determines which document form to show based on certification history. getDefaultNewForm() has 5 cascading fallbacks to ensure a form is always resolved, even for legacy or edge-case applicants.',
      },
    ],
    architecture: [
      { label: 'React 18 + Vite (40+ routes)', description: 'Full code-split SPA, two-layer auth guards (ProtectedRoute + RoleGuard), nested layouts per role group' },
      { label: 'Express 5 + 13 Route Modules', description: 'auth, requests, status, uploads, form, moredoc, experts, reports, evaluation, admin, notifications, users, central (PSU API proxy)' },
      { label: 'PostgreSQL + pg client', description: 'Direct pg client with explicit transaction management, row-level state guards, parameterized queries throughout' },
      { label: 'Dual Auth: Local + PSU Passport', description: 'Local JWT with HttpOnly cookies + Authentik OAuth2/OIDC integration for PSU SSO' },
      { label: 'Dual Storage: S3 + Local', description: 'Storage abstraction layer supporting both S3-compatible object storage and local filesystem — configurable per deployment' },
      { label: 'Docker + PSU Private Registry + GitLab CI', description: 'Multi-container deployment, CI/CD pipeline, institutional private container registry' },
    ],
  },
]
