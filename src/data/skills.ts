export interface SkillCategory {
  title: string
  icon: string
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend Engineering',
    icon: 'Monitor',
    skills: ['React 19', 'TypeScript', 'Vite', 'TailwindCSS', 'Framer Motion', 'React Router v6', 'Socket.IO Client', 'Recharts'],
  },
  {
    title: 'Backend Engineering',
    icon: 'Server',
    skills: ['Node.js', 'Express 4/5', 'REST API Design', 'Middleware Chains', 'Zod Validation', 'Joi', 'JWT', 'BCrypt'],
  },
  {
    title: 'Database & ORM',
    icon: 'Database',
    skills: ['PostgreSQL', 'Prisma ORM', 'Schema Design', 'Migrations', 'Composite Indexes', 'Transactional Mutations', 'pg client'],
  },
  {
    title: 'Auth & Security',
    icon: 'Shield',
    skills: ['JWT + HttpOnly Cookies', 'CSRF Protection', 'OAuth2 / OIDC', 'RBAC Policy Engines', 'Timing-Safe Comparison', 'Sentry Monitoring'],
  },
  {
    title: 'Systems Design',
    icon: 'GitBranch',
    skills: ['State Machine Design', 'Permission Engines', 'Workflow Modeling', 'Event-Driven Patterns', 'Audit Trail Design', 'SLA Tracking'],
  },
  {
    title: 'Realtime & Push',
    icon: 'Zap',
    skills: ['Socket.IO', 'Web Push API', 'node-cron', 'Deferred Side Effects', 'Push Subscriptions'],
  },
  {
    title: 'Storage & Files',
    icon: 'HardDrive',
    skills: ['AWS S3 SDK v3', 'Presigned URLs', 'Multer', 'Sharp (image processing)', 'Puppeteer (PDF)', 'ExcelJS', 'PDF Binary Scanning'],
  },
  {
    title: 'DevOps & Deployment',
    icon: 'Box',
    skills: ['Docker Compose', 'Nginx', 'PM2', 'GitLab CI/CD', 'VPS Deployment', 'Health Checks', 'Private Container Registry'],
  },
]
