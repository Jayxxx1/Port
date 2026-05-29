# Chinnakrit Portfolio Hub (`Port`)
### High-Density Editorial Case Study & Systems Developer Portfolio

This repository contains the codebase for my professional systems developer portfolio website. Designed as a high-density, minimal editorial publication, it showcases real production evidence, architecture diagrams, and interactive state-machine walkthroughs for my active production platforms: **Boonraksa-ERP** and **PSU TPSF EILA**.

🌐 **Live Website**: [jayxxx1.github.io/Port](https://jayxxx1.github.io/Port/) *(Coming soon / Active at custom domain)*

---

### ✨ Core Features & Implementations

#### 1. 🌍 Deep Bilingual Localization (i18n)
- **100% Translation Parity**: English and Thai locale structures (`en.json` and `th.json`) are completely synchronized, including complex nested structures for challenges, decisions, and scars.
- **Dynamic Context Rendering**: Built-in array and object translators utilizing React i18next for inline state-machine diagrams, tables, and system execution summaries.

#### 2. 📊 High-Density Interactive Architecture Showcases
- **Responsive SVG Diagrams**: Custom vector-based interactive flow charts mapped for order transitions and security access verification.
- **Production Evidence Cards**: High-fidelity operational screenshots showing authentic interfaces (ERP dashboards, billing consoles, verification grids) combined with architectural significance briefs.

#### 3. 📄 Print-Optimized Typography & Layout
- **Media Query Overrides**: Custom CSS overrides (`@media print`) on the `/resume` page that remove navigation, headers, and backgrounds—creating a perfectly styled, single-page, black-and-white CV when saving or printing as a PDF.

#### 4. 🔍 Production-Grade SEO & Web Quality
- **SEO Hook**: Dynamic header metadata updates per page (meta descriptions, OG tags, dynamic titles).
- **Security Check**: Built-in robots policies (`robots.txt`) and dynamic indexing maps (`sitemap.xml`).
- **Performance**: Code-split route compilation yielding high Lighthouse scoring and fast HMR performance under Vite.

---

### 🛠️ Technology Stack

- **Core**: React 19 (SPA Architecture) + TypeScript + Vite 8
- **Styling**: Tailwind CSS + Custom Vanilla CSS utility overrides (`index.css`)
- **Localization**: i18next + react-i18next
- **Routing**: React Router 7 (code-splitting layouts)
- **Motion**: Framer Motion (subtle micro-animations)

---

### ⚙️ Quick Start & Installation

To run this portfolio repository locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Jayxxx1/Port.git
   cd Port
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. **Compile production build**:
   ```bash
   npm run build
   ```
   *This runs `tsc -b` and `vite build` to guarantee zero compilation errors.*

---
*“Good software externalizes complexity into clear, auditable structure.”*
