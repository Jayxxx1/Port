import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'Sarabun', 'Georgia', 'serif'],
        sans: ['Sarabun', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      colors: {
        bg: {
          DEFAULT: '#0d0d0b',
          surface: '#141412',
          elevated: '#1a1a17',
        },
        ink: {
          DEFAULT: '#f0efe9',
          secondary: '#9a9991',
          muted: '#52524e',
          faint: '#2a2a27',
        },
        rule: '#252522',
        accent: {
          DEFAULT: '#c4a882',
          dim: '#8a7460',
        },
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
        display: ['clamp(3.5rem, 8vw, 7rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'display-sm': ['clamp(2.5rem, 5vw, 4.5rem)', { lineHeight: '1.0', letterSpacing: '-0.02em' }],
      },
      spacing: {
        section: '7rem',
        'section-sm': '4rem',
      },
      maxWidth: {
        reading: '68ch',
        site: '1200px',
      },
      letterSpacing: {
        label: '0.12em',
      },
      borderColor: {
        DEFAULT: '#252522',
      },
    },
  },
  plugins: [],
}

export default config
