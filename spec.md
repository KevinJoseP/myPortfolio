# Portfolio Website — Detailed Specification

> **URL:** [josekevin.com](https://josekevin.com)
> **Repository:** github.com:KevinJoseP/myPortfolio
> **Branch/Deploy:** `master` → GitHub Pages
> **Stack:** Vanilla HTML / CSS / JavaScript — no framework, no build step, no package manager
> **Last updated:** 2026-03-22

---

## Table of Contents

1. [File Inventory](#1-file-inventory)
2. [Page Map & Navigation Architecture](#2-page-map--navigation-architecture)
3. [index.html — Homepage](#3-indexhtml--homepage)
4. [about.html — About Me](#4-abouthtml--about-me)
5. [Project Detail Pages](#5-project-detail-pages)
6. [Photography Pages](#6-photography-pages)
7. [Me/index.html — Easter Egg](#7-meindexhtml--easter-egg)
8. [cisco_experience.html — Stub](#8-cisco_experiencehtml--stub)
9. [CSS Architecture](#9-css-architecture)
10. [JavaScript Architecture](#10-javascript-architecture)
11. [Responsive Behavior](#11-responsive-behavior)
12. [Asset Inventory](#12-asset-inventory)
13. [External Dependencies](#13-external-dependencies)
14. [Accessibility Notes](#14-accessibility-notes)
15. [Performance Notes](#15-performance-notes)
16. [Known Quirks & Technical Debt](#16-known-quirks--technical-debt)

---

## 1. File Inventory

### HTML (14 files)

| File | Purpose |
|---|---|
| `index.html` | Homepage — hero, projects grid, journey timeline, contact |
| `about.html` | About Me — biography, sports, photography, travel, books, podcasts |
| `projects/healthcare.html` | Healthcare research case study |
| `projects/stockit.html` | StockIT UX design case study |
| `projects/quiclick.html` | QuiClick UX design case study |
| `projects/tjd.html` | TJ Distributors branding case study |
| `projects/eyefi.html` | Eye-Fi medical device project |
| `projects/aiml.html` | AI & ML projects showcase |
| `projects/hardware.html` | CNN hardware implementation project |
| `projects/art.html` | Creative endeavours gallery |
| `photography/photography.html` | Photo gallery (66 images) |
| `photography/smiles.html` | Wall of Smiles portrait gallery (68 images) |
| `Me/index.html` | Secret diary Easter egg page |
| `cisco_experience.html` | Incomplete stub page (placeholder content only) |

### CSS (5 files)

| File | Purpose |
|---|---|
| `normalize.css` | CSS reset (v8.0.1) |
| `portfoliostyle.css` | Main stylesheet (~58 KB) — variables, layout, components, modals, responsive |
| `about.css` | About page color overrides and content styling |
| `photography/photography.css` | Gallery page layout, split-panel design, controls |
| `projects/project-page.css` | Standalone project page overrides (fade-in animation, static positioning) |

### JavaScript (6 files)

| File | Purpose |
|---|---|
| `utils/scripts/util.js` | Mobile menu toggle (hamburger open/close), nav click handlers |
| `index.js` | Homepage: Intersection Observers for nav highlighting, back-to-top positioning |
| `article.js` | "Cut the BS" / "Elaborate" content toggle + floating panel visibility |
| `article/article.js` | Same toggle as article.js but also controls navbar visibility |
| `photography/photography.js` | Gallery: dynamic image population, shuffle, responsive observer setup |
| `photography/smiles.js` | Smiles gallery: same pattern as photography.js with 68 images |
| `projects/project-page.js` | Side-nav scroll highlighting, floating panel/side-nav visibility toggle |

### Other

| File | Purpose |
|---|---|
| `CNAME` | GitHub Pages custom domain: `josekevin.com` |
| `resources/kevin_cv.pdf` | Current resume (64 KB) |
| `resources/kevin_cv_old.pdf` | Archived resume (4.4 MB) |

---

## 2. Page Map & Navigation Architecture

### Navigation Model

Traditional HTML link navigation — **no SPA router**. Within `index.html`, sections use anchor links (`#projects`, `#journey`, `#contacts`).

```
index.html
├── #about-me (hero/welcome)
├── #projects (project grid)
│   ├── → projects/healthcare.html
│   ├── → projects/stockit.html
│   ├── → projects/quiclick.html
│   ├── → projects/tjd.html
│   ├── → projects/eyefi.html
│   ├── → projects/aiml.html
│   ├── → projects/hardware.html
│   ├── → projects/art.html
│   ├── → photography/photography.html
│   ├── → photography/smiles.html
│   └── → article/jee_crack.html (linked but HTML not in repo)
├── #journey (experience timeline)
├── #contacts
└── (hidden) → Me/index.html (secret link, id="secret-me-link")

about.html
├── Biography sections (no anchor-based nav)
├── #contacts
└── Resume download → resources/kevin_cv.pdf

photography/photography.html ↔ photography/smiles.html (cross-linked)
```

### Standard Header Pattern (all pages)

Every page has two navigation containers:

1. **Desktop nav** (`#nav-bar-container.desktop`): Fixed header bar with logo, nav links, close button (for mobile dismiss)
2. **Mobile header** (`.mobile-header`): Compact bar with logo and hamburger menu button

**Nav links** (consistent across pages, with slight path variations):
- ABOUT → `./about.html`
- PROJECTS → `#projects` or `./index.html#projects`
- JOURNEY → `#journey` or `./index.html#journey`
- CONTACT → `#contacts` or `./index.html#contacts`
- RESUME → external PDF link

### Standard Footer Pattern

- Copyright text
- Social media links inside `<address id="social-media-container">`:
  - LinkedIn: `https://www.linkedin.com/in/krsj1234/`
  - GitHub: `https://github.com/KevinJoseP`
- Bug report link → `https://github.com/KevinJoseP/myPortfolio/issues`

---

## 3. index.html — Homepage

### Head

- Title: "Kevin Jose's portfolio"
- Favicon: `./images/KJ_favicon.png`
- Stylesheets: `normalize.css`, `portfoliostyle.css`
- Scripts: `./utils/scripts/util.js`, `./index.js`

### Sections (in DOM order)

#### 3.1 Welcome/Hero (`#welcome-section`)

- Classes: `welcome-section sections`
- Contains: logo image, main hero title ("Hi, I'm Kevin Jose!"), subtitle, description, "MORE ABOUT ME" button (links to `./about.html`), down-arrow indicator
- The down-arrow (`#down-arrow`) is fixed at bottom, hidden when scrolled past hero (class `non-hero-page` added)
- Logo image observed by `mainLogoObserver` — toggles navbar background between hero style and default

#### 3.2 Projects (`#projects`)

- Classes: `section-common-def sections`
- Background: `#28312B` (dark green-gray)
- Title: "MY PROJECTS" with decorative lines (`.decor-line`)
- **Project Grid** (`.project-cont`): CSS Grid with `repeat(auto-fit, minmax(22rem, 25rem))`
- Each project card (`.project-inst`) wraps in an anchor (`.project-inst-anchor`) linking to its dedicated page
- Card structure:
  - Lazy-loaded thumbnail image (hidden on hover on desktop)
  - Desktop description (`.project-descr.desktop`) — shown on hover, replaces image
  - Project title (`.project-title`)
  - Project subtitle/date (`.project-sub-text`)
  - Mobile description (`.project-descr.mobile`) — always visible on mobile
- **"MY EXPLORATIONS" subsection**: Photography, Wall of Smiles, Art, and JEE article links

**Projects listed (in grid order):**
1. Healthcare → `./projects/healthcare.html`
2. StockIT → `./projects/stockit.html`
3. QuiClick → `./projects/quiclick.html`
4. TJ Distributors → `./projects/tjd.html`
5. Eye-Fi → `./projects/eyefi.html`
6. AI & ML → `./projects/aiml.html`
7. Hardware CNN → `./projects/hardware.html`

**Explorations listed:**
1. Photography Gallery → `./photography/photography.html`
2. Wall of Smiles → `./photography/smiles.html`
3. Creative Endeavours → `./projects/art.html`
4. JEE Article → `./article/jee_crack.html`

#### 3.3 Journey/Experience (`#experiences`)

- Classes: `section-common-def sections`
- Background: `#1a1d18`
- Title: "MY JOURNEY" with decorative lines
- **Timeline container** (`.experience-cont`): `flex-direction: column-reverse`, `gap: 6rem`
- Pseudo-element vertical line (`:before`) — 1px wide, color `#CBD5C0`, centered

**Experience items** (DOM order = bottom-to-top visual order due to `column-reverse`):

| # | Organization | Position | Dates | Layout |
|---|---|---|---|---|
| 1 | Palakkad, Kerala | Early Life | 1997–2008 | inverted |
| 2 | JNV Malampuzha | Grade VI–XII | 2008–2015 | normal |
| 3 | IIT Guwahati | B.Tech & Minor | 2016–2020 | inverted |
| 4 | IIT Hyderabad | Research Intern | May–July 2018 | normal |
| 5 | Samsung Electronics | Research Intern | May–July 2019 | inverted |
| 6 | TJ Distributors | Design Partner | 2021–Now | normal |
| 7 | Cisco Systems | Software Engineer II/III | 2020–2024 | inverted |
| 8 | Nutanix | Senior Software Engineer | 2024–Now | normal |

Each item has:
- Mobile logo (`.experience-logo-cont.mobile`) — 3rem circular
- Desktop logo (`.experience-logo-cont.desktop`) — 8rem circular, `#CBD5C0` outline
- Experience title (location), position, date range, description text
- `.inverted` class flips `flex-direction: row-reverse` and `text-align: right`

#### 3.4 Contact (`#contacts`)

- Background: `#778979`
- Title: "CONTACT ME" with decorative lines
- Email link: `mailto:krsj1234@gmail.com`

#### 3.5 Additional Elements

- **Back-to-top button** (`#back-to-top-btn`, `.back-to-top`): Fixed, circular, hidden on hero (`.top` class)
- **Secret link** (`#secret-me-link`): z-index 9999, links to `./Me.html`, opacity transition 0.2s

---

## 4. about.html — About Me

### Head

- Title: "About Me"
- Stylesheets: `normalize.css`, `portfoliostyle.css`, `about.css`
- Scripts: `./utils/scripts/util.js`, `./index.js`

### Color Theme Override

About page uses mauve/pink tone instead of green:
- Navbar background: `#C39F97`
- Accent color: `#C39F97` (replaces `#CBD5C0`)
- Hero image outline: 4px solid `#C39F97`
- Text accents: `#816a64`, `#563524`

### Content Sections

1. **Hero**: Circular profile photo (`./images/hero.jpg`), name, intro text
2. **Welcome**: Introduction paragraph mentioning Kerala, Cisco, healthcare design
3. **Academic Journey**: B.Tech details, graduation/campus photos
4. **Life Beyond Code**: Basketball (Cisco Corporate team, St. Raphael's), volleyball photos
5. **Capturing Moments**: Photography passion, photo galleries
6. **Bookworm and Podcast Aficionado**: Book collection, podcast links (Freakonomics, 99% Invisible, Ologies, Radiolab)
7. **Passionate Traveller**: Travel photo gallery
8. **Creative Pursuits**: Doodling, logo design samples
9. **Early Foundations**: NCC experience, photos
10. **Here's to the Journey**: Summary, resume download button
11. **Contact section** (id `contacts`, class `about-me`)
12. **Footer** (class `about-me`)

### Image Galleries

Each section uses `.about-img-cont` (flexbox wrap) containing lazy-loaded images with `.img-caption` divs. Images link to full-size versions in new tabs.

---

## 5. Project Detail Pages

All 8 project pages share a common structure and load the same resources.

### Common Resources

- CSS: `../normalize.css`, `../portfoliostyle.css`, `./project-page.css`
- JS: `../utils/scripts/util.js`, `./project-page.js`

### project-page.css

```css
body.project-page {
    animation: pageFadeIn 0.3s ease-in;  /* fade-in on load */
}

body.project-page .modal-cont {
    position: static;       /* not overlay — standalone page */
    min-height: 100vh;
    overflow: visible;
}

body.project-page .modal-cont .project-title {
    max-width: 60rem;       /* constrain hero width */
    margin: 0 auto;
}
```

### project-page.js

Three responsibilities:

1. **`activateSideBarNavOnSection(selector)`**: Attaches scroll listener; determines which `.side-bar-nav-section` is in view by comparing viewport midpoint to section bounds; highlights corresponding nav item by adding `.active` to element with id `{sectionId}-nav`

2. **`titleObserverGeneral`** (IntersectionObserver, threshold 0.5): Observes `.modal-cont .project-title`; uses `data-title-id` to find matching `.bottom-floating-panel.{id}` and `.side-nav-panel.{id}`; toggles `display-none` class — panels hidden when title visible, shown when scrolled past

3. **Side-nav click handler**: On DOMContentLoaded, attaches click listeners to `.side-nav-panel a` elements; removes `.active` from siblings, adds to clicked element

### Common Page Structure

```
<body class="project-page">
  <header>  <!-- standard nav -->
  <div class="modal-cont" id="{project-id}">
    <div class="project-title" data-title-id="{project-id}">
      <!-- Hero: background image/video, title, subtitle, team, duration -->
    </div>
    <div class="side-nav-panel {project-id}">
      <!-- Anchor links to sections, each with id="{sectionId}-nav" -->
    </div>
    <div class="project-body">
      <!-- Content sections, each with class="side-bar-nav-section" -->
    </div>
  </div>
  <div class="bottom-floating-panel {project-id}">
    <!-- Back to top + back to projects links -->
  </div>
  <footer>
</body>
```

### Per-Project Specifics

#### healthcare (id="healthcare")

- **Side nav sections**: Summary, Background, Special Thanks, Important Stats, Patients' Problems, Doctors' Problems, Thoughts, Future Work
- **Content**: Research narrative, 12+ doctors acknowledged, India/global health statistics images, detailed patient problem analysis (10 problems with individual anchors), doctor survey data
- **Images**: `../images/Projects/healthcare/*.png` (7 files)
- **Custom CSS**: `.modal-cont#healthcare` — white background, blue summary section (`rgb(55, 103, 134)` with 30px border-radius), cyan bullet colors

#### stockit (id="stockit")

- **Side nav sections**: Background, Empathize, Define, Ideate & Design, Test & Review, Final Design, Learnings
- **Content**: Google UX certification project, user personas, empathy maps, competitive audit, wireframes, usability studies
- **Embedded content**: 2 Figma prototypes (iframes with `allowfullscreen`), Google Sheets link, PDF competitive audit report
- **Images**: `../images/Projects/stockit/*.png` (27+ files)
- **Custom CSS**: `.modal-cont#stockit` — white background, dark text

#### quiclick (id="quiclick")

- **Content**: Photo management app concept, user personas (3), journey maps (3), pain points, wireframes, 7 hi-fi prototypes with descriptions
- **Video**: Autoplay/muted/loop background video (`lowq6mb.mp4`, 21 MB)
- **Images**: `../images/Projects/quiclick/*.png` (18 files)
- **Custom CSS**: `.modal-cont#quiclick` — white background, `.hifi-grouping.invert` for alternating prototype layouts

#### tjd (id="tjd")

- **Content**: Branding case study, logo design process, 2 animated videos, website screenshot, poster designs
- **Videos**: `tj_animation.mp4` (logo animation), `tj_logo_animated.mp4` (logo reveal) — both autoplay/muted/loop
- **External link**: Deployed TJ website (button with class `.final-website-btn`)
- **Images**: `../images/Projects/TJ_branding/*.jpg` and `../images/Projects/art/tj_logo.png`
- **Custom CSS**: `.modal-cont#tjd` — brown accent colors, flex-centered groupings

#### eyefi (id="eyefi")

- **Content**: Hackathon medical device project, Duane's Retraction Syndrome, research on eye measurement tools
- **Team**: 6 members listed (mentors, developers, optometrist)
- **External links**: SharePoint research paper link
- **Images**: `../images/Projects/eye-fi/*.png` (12+ files)
- **Custom CSS**: `.modal-cont#eyefi` — gray title text, `.duane img` at 30% width

#### aiml (id="aiml")

- **Content**: Two sub-projects — STGAN facial attribute editing and radar target recognition
- **External links**: STGAN research paper PDF
- **Images**: `../images/Projects/aiml/*.png` (5 files)
- **Custom CSS**: `.modal-cont#aiml` — background image with blend mode, separate bg colors for `.project1` (`rgb(162, 111, 111)`) and `.project2` (`rgb(103, 47, 47)`)

#### hardware (id="hardware")

- **Content**: CNN hardware implementation on breadboard + FPGA
- **External links**: Final project report PDF (`hardware.pdf`)
- **Images**: `../images/Projects/hardware/Photos-001/*.jpg` (5 files)
- **Custom CSS**: `.modal-cont#hardware` — background image, left-aligned text

#### art (id="art")

- **Sections**: Branding (logos), Pencil Sketch (5 sketches), Digital Experiments (3 works including a GIF)
- **No side nav** — simpler structure
- **Images**: `../images/Projects/art/*.jpg` and `../images/Projects/quiclick/quiclick_logo.png`

---

## 6. Photography Pages

### Common Structure

Both gallery pages use a **split-panel layout**:
- Left 40% fixed: Description panel with title, text, cross-link to other gallery
- Right 60% scrollable: Image gallery populated dynamically by JavaScript

### photography/photography.html

- Title: "MY GALLERY"
- Body class: `photography-gallery` (header), section classes: `photography intro`
- Gallery section ID: `#photography-gallery-section`
- Description panel background: `#85AF4E` (sage green)
- Images: 66 photos (`./gallery/gallery0.jpg` through `gallery65.jpg`)
- Cross-link: → `./smiles.html` (via floating panel button)

### photography/smiles.html

- Title: "THE WALL OF SMILES"
- Body class: `smiles-gallery` (header), section classes: `smiles intro`
- Gallery section ID: `#smiles-gallery-section`
- Description panel background: `#626460` (dark gray)
- Gallery background: black
- Images: 68 photos (`./smiles/smiles0.jpg` through `smiles67.jpg`)
- Cross-link: → `./photography.html#gallery-top` (via floating panel button)

### Gallery JavaScript Pattern (photography.js / smiles.js)

Both scripts follow identical architecture:

1. **`init()`** — Called immediately on script load
   - Calls `fillInPhotos()` → populates gallery with `<div class="photo-cont"><img class="gallery-photo" src="..."></div>` elements
   - Calls `handleShuffle()` → randomizes initial order

2. **`fillInPhotos()`** — Creates image elements in a loop (66 or 68), appends to gallery section, then sets up:
   - Bottom navbar (shuffle + back-to-top buttons)
   - Desktop: invisible "hack div" at top of gallery for Intersection Observer
   - Mobile: observer on description section title

3. **`handleShuffle()`** — Fisher-Yates-style randomization: converts children to array, randomly splices and re-appends

4. **Responsive behavior** — Uses `window.matchMedia('(max-width: 40em)')`:
   - Listens to `change` event
   - `isMobile` boolean tracks state; only acts on actual transitions
   - `triggerMediaChangeActions()` routes to mobile or desktop setup

5. **Back-to-top visibility**:
   - **Desktop**: Invisible "hack div" at gallery top observed by `back2TopObserver`; button shown when scrolled past hack div
   - **Mobile**: `back2TopObserverMobile` (threshold 0.5) observes description section; bottom control panel shown when section scrolls out

6. **Bottom control panel**: Dynamically created div with shuffle and back-to-top buttons; destroyed and recreated on shuffle/media change

---

## 7. Me/index.html — Easter Egg

- Minimal diary-style page
- No navigation header or footer
- Inline `<style>` block (not in external CSS)
- Styles: centered card (max-width 600px), entry-date formatting
- Content: Single diary entry dated "3 May 2025"
- Linked from `index.html` via hidden `#secret-me-link` (z-index 9999, opacity transition)

---

## 8. cisco_experience.html — Stub

- Incomplete page with placeholder content ("content")
- Loads only `portfoliostyle.css` and Cormorant Garamond font
- Single div: `.cisco-experience-body`
- No navigation, header, footer, or meaningful content

---

## 9. CSS Architecture

### Design Token System (`:root` variables in `portfoliostyle.css`)

#### Colors

| Variable | Value | Usage |
|---|---|---|
| `--color-text-main` | `#563524` | Primary brown text |
| `--color-text-dark-brown` | `#90553C` | Secondary brown, buttons |
| `--color-clay` | `#877863` | Clay accent |
| `--color-main-page-bg-color` | `rgb(255, 255, 255)` | Page background |

**Section backgrounds** (not in variables, hardcoded):
- Hero/welcome: white
- Projects: `#28312B`
- Journey: `#1a1d18`
- Contact: `#778979`
- About page nav: `#C39F97`
- Photography panel: `#85AF4E`
- Smiles panel: `#626460`

#### Typography

| Variable | Value | Usage |
|---|---|---|
| `--font-family-serif` | `'Cormorant Garamond', serif` | Body text |
| `--font-family-sans` | `'Fira Sans', sans-serif` | UI elements |
| `--font-family-sans-condensed` | `'Fira Sans Condensed', sans-serif` | Nav controls |
| `--font-nav-control-elements` | `var(--font-family-sans-condensed)` | Nav alias |
| `--font-family-sans-serif-grotesque` | `'Darker Grotesque', sans-serif` | Headings, project titles |
| `--font-family-sans-nunito` | `'Nunito Sans', sans-serif` | Decorative |
| `--font-family-cursive` | `'Sacramento', cursive` | Decorative |
| `--font-family-sans-serif-3` | `'Montserrat', sans-serif` | Section headings, about content |
| `--font-family-cursive-2` | `'Freehand', cursive` | Decorative |

**Font weights loaded**: 200–700 across families, with italic variants for Cormorant Garamond and Montserrat.

**Photography-only variables** (in `photography.css`):
- `--font-family-alt-main-title`: `'Big Shoulders Display', sans-serif`
- `--font-family-descr`: `'EB Garamond', serif`
- `--font-size-content-default`: `clamp(1rem, 1rem + 0.36vw, 2rem)`
- `--font-size-article-title`: `clamp(2.3rem, 8vw, 8rem)`

### Z-Index Hierarchy

| z-index | Element | File |
|---|---|---|
| 9999 | `#secret-me-link` | portfoliostyle.css |
| 2000 | `.modal-cont .project-body` | portfoliostyle.css |
| 1500 | `.photography .descr-section-title` | photography.css |
| 1300 | `.modal` | portfoliostyle.css |
| 1200 | `#nav-bar-container` | portfoliostyle.css |
| 1200 | `.mobile-header` (mobile) | portfoliostyle.css |
| 1000 | `.descr-section-title` (mobile) | photography.css |
| 0 | `.experience-cont` | portfoliostyle.css |
| -1 | `.experience-cont:before` (timeline line) | portfoliostyle.css |

### Layout Patterns

1. **Flexbox**: Navigation, hero, experience items, contact, footer, project descriptions, modals
2. **CSS Grid**: Project card grid — `grid-template-columns: repeat(auto-fit, minmax(22rem, 25rem))`
3. **Fixed positioning**: Navbar, mobile header, modals, down-arrow, back-to-top, photography description panel
4. **Pseudo-elements**: Timeline vertical line (`.experience-cont:before`)

### Transition/Animation Inventory

| Element | Property | Duration | Easing |
|---|---|---|---|
| Nav links | color, background-color, transform | 150ms, 150ms, 50ms | ease-in |
| Know-more button | background-color, transform | 150ms | ease-in |
| Down arrow | transform | 150ms | ease |
| Project images | opacity | 100ms | ease-in |
| Project descriptions | all | 300ms | ease-in |
| Modal | opacity | 300ms | linear |
| Side nav links | transform | 100ms | ease-in |
| Modal close button | background-color | 100ms | ease-in |
| Final code button | background-color / transform | 150ms / 50ms | ease / linear |
| Social media links | opacity | 100ms | ease-in |
| Secret me link | opacity | 0.2s | — |
| Back-to-top | opacity | 100ms | ease-in |
| Gallery floating panel | transform | 150ms | ease-in |
| Project page body | opacity (pageFadeIn) | 0.3s | ease-in |

### Key Hover Behaviors

- **Project cards** (desktop): Image disappears, description fades in at same size (20rem × 15rem)
- **Nav links**: White text, gray background (`rgb(97, 95, 93)`), 2px white outline
- **Active nav link**: Black background, white text
- **Back-to-top**: Background changes to `#563524`, image scales 1.2
- **Gallery floating panels**: Background/color invert, scale 1.1
- **Gallery shuffle/back-to-top buttons**: Scale 1.5

---

## 10. JavaScript Architecture

### File Dependency Graph

```
utils/scripts/util.js  ← loaded on ALL pages (mobile menu system)
├── index.html loads → index.js
├── about.html loads → index.js
├── projects/*.html loads → projects/project-page.js
├── photography/photography.html loads → photography/photography.js
├── photography/smiles.html loads → photography/smiles.js
└── article pages load → article.js or article/article.js
```

### util.js — Mobile Menu System

**Elements selected:**
- `.mobile-header .menu-btn` — hamburger button
- `.mobile-header` — mobile header bar
- `#nav-bar-container` — desktop nav (repurposed as full-screen mobile menu)
- `#nav-bar-container .close-btn` — close button inside nav
- `.nav-link` — all nav links
- `#nav-bar-container .image-link` — logo button in mobile nav
- `.option-logo` — gallery toggle images (photography pages)

**Functions:**
- `handleMenuButton(e)`: Adds `.mobile` class to desktop nav (makes it visible as overlay), hides mobile header, adds `.hide-if-needed` to gallery toggle images
- `handleCloseButton(e)`: Reverses the above
- `handleNavClick(e)`: Same as close — dismisses menu after clicking a nav link
- `processHideClassToZIndexMessUp(isAdd)`: Adds/removes `.hide-if-needed` on `.option-logo` elements to prevent z-index conflicts when mobile menu is open

**Event listeners**: Click on menu button, close button, each nav link, and logo button in mobile nav.

### index.js — Homepage Interactivity

**Intersection Observers (3):**

1. `mainLogoObserver` (threshold 0.5): Observes hero logo image → toggles `.hero-page` class on navbar (changes background from `#CBD5C0` to white)
2. `welcomeScreenObserver` (threshold 0.9): Observes welcome section → controls down-arrow visibility (`.non-hero-page`) and back-to-top button visibility (`.top`)
3. `sectionIntersectionObserver` (threshold 0.2): Defined but **currently not actively used** — section observation commented out on line 96

**Manual scroll tracking** (`activateSideBarNavOnSection`):
- Attached on `DOMContentLoaded`
- Listens to window scroll
- For each `.sections` element, checks two conditions:
  1. Viewport midpoint falls within section bounds
  2. Section is fully contained in viewport
- Highlights matching nav element by adding `.active` to `#{sectionId}-nav`

**`updateElementPosition()`**: Centers back-to-top button horizontally at `windowWidth / 2`. Called on load and `window.onresize`.

### article.js — Content Toggle

**Elements**: `.article .content`, `#cutTheBs`, `#elaborate`, `#detailed-content`, `#summarized-content`, `.bottom-floating-panel`, `.modal-cont .project-title`

**Toggle logic**:
- "Cut the BS" button → hides `#detailed-content`, shows `#summarized-content`, swaps button visibility
- "Elaborate" button → reverses the above

**Intersection Observer** (`titleObserver`, threshold 0.9): Toggles `display-none` on floating panel based on title visibility.

**`titleObserverGeneral`** (threshold 0.5): Observes all `.modal-cont .project-title` elements, toggles matching `.bottom-floating-panel.{titleId}` and `.side-nav-panel.{titleId}`.

### article/article.js — Article with Header Control

Same as `article.js` plus:
- Additionally toggles navbar visibility (`headerNavCont.classList.toggle('display-none', !entry.isIntersecting)`) — navbar hidden when title is visible, shown when scrolled past

### project-page.js — Project Page Navigation

**`activateSideBarNavOnSection(sectionSelector)`**: Identical scroll-based section tracking as index.js, but extracted as standalone function. Operates on `.side-bar-nav-section` elements, highlights `#{sectionId}-nav` elements.

**`handleSideNavBarClick(e)`**: Removes `.active` from all sibling nav links, adds to clicked one.

**`titleObserverGeneral`** (IntersectionObserver, threshold 0.5): Same pattern as article.js — toggles floating panel and side nav visibility using `data-title-id` to match elements.

**DOMContentLoaded init**:
- Attaches click handlers to all `.side-nav-panel a` elements
- Activates scroll tracking for `.side-bar-nav-section` if any exist

### photography.js / smiles.js — Gallery System

Identical architecture (see [Section 6](#6-photography-pages)). Key constants:

| | photography.js | smiles.js |
|---|---|---|
| Image count | 66 | 68 |
| Base URL | `./gallery/gallery` | `./smiles/smiles` |
| Gallery section | `#photography-gallery-section` | `#smiles-gallery-section` |
| Intro section | `#photography-intro` | `#smiles-intro` |
| Back-to-top anchor | `./photography.html#section-top` | `./smiles.html#section-top` |

---

## 11. Responsive Behavior

### Breakpoints

| Breakpoint | Files affected | Notes |
|---|---|---|
| `max-width: 40em` (640px) | `portfoliostyle.css`, `photography.css` | Primary mobile breakpoint |
| `max-width: 50em` (800px) | `portfoliostyle.css` | Hides side-nav panel only |

### Mobile Changes at 640px

**Navigation:**
- Desktop nav container becomes full-height column overlay when `.mobile` class added
- Mobile header (`.mobile-header`) becomes visible (fixed, z-index 1200)
- Side nav panels hidden (`display: none !important`)

**Homepage:**
- Project cards: Image shrinks to 16rem × 12rem
- `.project-descr.mobile` shown, `.project-descr.desktop` hidden (no hover effect on mobile)
- Desktop welcome image hidden; mobile variant shown at 60vw width
- Experience timeline: Items stack vertically (column), desktop logos hidden, mobile logos (3rem) shown
- Timeline line repositioned to `left: 1.6rem`

**Modals / Project Pages:**
- Text centered, content width 90vw
- All images scale to 90–100vw width
- Side nav panel removed
- Cisco project grouping stacks vertically
- QuiClick title group stacks vertically

**Photography:**
- Split panel layout → stacked (column direction)
- Description panel: full width, static position, auto height
- Gallery: full width, no left margin, minimal padding
- Gallery photos: `max-width: 80vw`, `max-height: 60vh`
- Footer hidden; `#photography-page-footer` shown instead
- Navigation links (`#image-sect-link`, `#image-link2`) hidden
- Bottom control panel recentered to `left: 50vw`
- `.option-logo.hide-if-needed` hidden

### JavaScript Responsive Handling

Photography/smiles scripts use `window.matchMedia('(max-width: 40em)')` with `change` event listener:
- Tracks actual state transitions (mobile ↔ desktop) to avoid redundant DOM manipulation
- Mobile: Uses `back2TopObserverMobile` on description section
- Desktop: Uses invisible "hack div" with `back2TopObserver`
- Both paths: Destroy and recreate bottom navbar

---

## 12. Asset Inventory

### Images by Category

| Category | Location | Count | Notes |
|---|---|---|---|
| Photography gallery | `photography/gallery/` | 66 | gallery0.jpg – gallery65.jpg |
| Smiles gallery | `photography/smiles/` | 68 | smiles0.jpg – smiles67.jpg |
| About-me photos | `images/about-me/` | 35 | Personal, sports, travel, NCC |
| Project thumbnails | `images/Projects/Thumbnails/` | 17 | Grid card images |
| Healthcare project | `images/Projects/healthcare/` | 7 | Survey/statistics images |
| StockIT project | `images/Projects/stockit/` | 27 | UX artifacts |
| QuiClick project | `images/Projects/quiclick/` | 18 | Personas, prototypes |
| TJ branding | `images/Projects/TJ_branding/` | 9 | Logo, posters, site |
| Eye-Fi project | `images/Projects/eye-fi/` | 12+ | Specs, research |
| AI/ML project | `images/Projects/aiml/` | 5 | Models, results |
| Hardware project | `images/Projects/hardware/` | 5 | Team photos |
| Art project | `images/Projects/art/` | 15 | Logos, sketches, digital |
| JEE article | `images/Projects/jee/` | 9 | Notes, hostel photos |
| JNV photos | `images/Projects/jnv/` | 11 | School memories |
| Backgrounds | `images/Projects/backgrounds/` | 6 | Decorative patterns |
| UI icons | `images/` | 6 | SVGs: back2Top, close, code, down-arrow, menu |
| Logos | `images/` | 10 | Company and personal logos |
| Photography utils | `photography/util/` | 3 | Gallery icon, shuffle SVG, smiles SVG |

### Videos (3 files)

| File | Size | Location | Used in |
|---|---|---|---|
| `lowq6mb.mp4` | 21 MB | `images/Projects/quiclick/` | quiclick.html background |
| `tj_animation.mp4` | 177 KB | `images/Projects/TJ_branding/` | tjd.html |
| `tj_logo_animated.mp4` | 73 KB | `images/Projects/TJ_branding/` | tjd.html |

### PDFs (7 files)

| File | Location | Used in |
|---|---|---|
| `kevin_cv.pdf` | `resources/` | Resume download link |
| `kevin_cv_old.pdf` | `resources/` | Archived, not linked |
| `hardware.pdf` | `images/Projects/hardware/` | hardware.html |
| `eyefi_poster.pdf` | `images/Projects/eye-fi/` | eyefi.html |
| `competitive_audit_report.pdf` | `images/Projects/stockit/` | stockit.html |
| `usability_study_report.pdf` | `images/Projects/stockit/` | stockit.html |
| `kevin_PAN.pdf` | `images/Projects/jnv/` | Not linked (personal document) |

---

## 13. External Dependencies

### Google Fonts (loaded via `<link>` in CSS `@import` or HTML `<link>`)

| Font | Weights | Used in |
|---|---|---|
| Cormorant Garamond | 300, 400, 500, 600, 700 + italics | Body text (all pages) |
| Fira Sans | 300, 400, 500, 600 | UI elements |
| Fira Sans Condensed | 300, 400, 500, 600 | Nav controls |
| Darker Grotesque | 300, 400, 500, 600 | Headings, project titles |
| Nunito Sans | 200, 300, 400, 500 | Decorative |
| Sacramento | 400 | Cursive decorative |
| Montserrat | 200, 300, 400, 500, 600 + italics | Section headings |
| Freehand | 400 | Cursive decorative |
| Big Shoulders Display | (various) | Photography gallery title |
| EB Garamond | (various) | Photography description |

### External Embeds

| Type | Page | Source |
|---|---|---|
| Figma prototype (iframe) | stockit.html | Figma embed URLs (2 instances) |
| Video (autoplay) | quiclick.html | Local MP4 |
| Video (autoplay) | tjd.html | Local MP4 (2 instances) |

### External Links

| Destination | Page |
|---|---|
| LinkedIn profile | All footers |
| GitHub profile | All footers |
| GitHub Issues | All footers |
| Gmail (mailto) | Contact sections |
| Resume PDF | Nav links, about page |
| TJ Distributors website | tjd.html |
| STGAN research paper | aiml.html |
| SharePoint (Eye-Fi paper) | eyefi.html |
| Google Sheets (audit) | stockit.html |
| Podcast websites (4) | about.html |

---

## 14. Accessibility Notes

### Current Practices
- All images use `loading="lazy"` attribute
- Most images have descriptive `alt` text
- Semantic HTML5 elements used (`<header>`, `<nav>`, `<section>`, `<footer>`, `<address>`)
- Proper heading hierarchy maintained
- External links use `target="_blank"`
- `mailto:` links for email contact

### Gaps
- No `aria-label` or `aria-*` attributes observed
- No `role` attributes
- No skip-navigation link
- No explicit focus management for mobile menu overlay
- Color contrast not formally audited (brown-on-white and white-on-dark themes)
- Videos lack `<track>` captions
- No `rel="noopener noreferrer"` on `target="_blank"` links (security consideration)
- Missing `alt` text on some decorative images (could use `alt=""`)

---

## 15. Performance Notes

### Current Optimizations
- `loading="lazy"` on all images
- No external JavaScript libraries or frameworks
- No build step overhead
- CSS variables for consistent theming (single source of truth)
- Gallery images populated dynamically (only loaded when scrolled into view via lazy loading)

### Potential Concerns
- `portfoliostyle.css` is ~58 KB (single monolithic file with all component + modal styles)
- 10 Google Font families loaded (multiple weights each) — significant render-blocking potential
- Gallery images (66 + 68 = 134 images) loaded in DOM at once even with lazy loading
- QuiClick background video is 21 MB
- No image optimization pipeline (no WebP/AVIF, no srcset/sizes)
- No CSS/JS minification
- Large project images (some over 1 MB)

---

## 16. Known Quirks & Technical Debt

1. **`article/jee_crack.html` linked but not in repo**: The JEE article link in `index.html` points to `./article/jee_crack.html` which does not exist in the repository.

2. **`cisco_experience.html` is a stub**: Contains only placeholder "content" text with no real structure.

3. **Duplicate article.js logic**: `article.js` and `article/article.js` share nearly identical code. The only difference is header navbar control.

4. **`photography/photos` empty file**: An empty file exists at `photography/photos` with no extension.

5. **Commented-out observer**: In `index.js`, the `sectionIntersectionObserver` loop (line ~96) is commented out; manual scroll tracking via `activateSideBarNavOnSection` is used instead.

6. **Unused variables**: `isCurrentScreenSmiles` declared but never used in both `photography.js` and `smiles.js`. `mainOpt` declared but unused in both `article.js` files.

7. **`console.log("ssss")` left in util.js**: Debug log in `handleCloseButton` (line 31).

8. **Gallery images in root**: `gallery-67.jpg` exists in the project root directory, outside the `photography/gallery/` folder.

9. **Modal system remnants**: `portfoliostyle.css` still contains extensive `.modal` and `.modal.active` CSS rules from the previous modal-based architecture, though projects now use standalone pages. The `.modal-cont` class is intentionally reused by project pages.

10. **Hardcoded image counts**: `MAX_GALLERY_PHOTO_COUNT = 66` and `MAX_SMILES_PHOTO_COUNT = 68` are hardcoded constants — adding/removing gallery images requires updating these values.

11. **No `rel="noopener"` on external links**: `target="_blank"` links lack `rel="noopener noreferrer"`.

12. **`data-modal-id` remnants**: Some elements may still carry `data-modal-id` attributes from the old modal system.

13. **CSS class reuse**: `project-page.css` reuses `.modal-cont` class on standalone pages, relying on `body.project-page` specificity to override modal-specific positioning.

14. **Mixed font loading**: Fonts are loaded via both CSS `@import` (in stylesheets) and HTML `<link>` tags depending on the page.

15. **Hardware page uses `.quiclick` class**: The hardware project's floating bottom panel uses class `quiclick` instead of `hardware`, borrowing QuiClick's styling.
