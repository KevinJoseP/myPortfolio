# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **vanilla HTML/CSS/JavaScript portfolio website** — no framework, no build step, no package manager. It deploys to [josekevin.com](https://josekevin.com) via GitHub Pages.

## Running Locally

Open `index.html` directly in a browser. There is no dev server, build process, or npm install required.

## Deployment

Push to the `master` branch on `github.com:KevinJoseP/myPortfolio`. GitHub Pages auto-deploys to `josekevin.com` (configured via `CNAME`).

## Architecture

### Pages

| File | Purpose |
|---|---|
| `index.html` | Homepage — hero, projects grid, journey/experience timeline, contact |
| `about.html` | About Me — biography, sports, photography, travel, books, podcasts |
| `photography/photography.html` | Photo gallery |
| `photography/smiles.html` | Wall of Smiles (portrait gallery) |
| `Me/index.html` | Secret diary Easter egg page |

Navigation is traditional HTML links — no SPA router. Within `index.html`, sections use anchor links (`#projects`, `#journey`, `#contacts`).

### JavaScript

- **`index.js`** — All homepage interactivity: Intersection Observer for scroll-triggered nav highlighting, project modal open/close, back-to-top button positioning.
- **`article.js`** / **`article/article.js`** — "Cut the BS" vs "Elaborate" toggle for article views.
- **`photography/photography.js`** / **`photography/smiles.js`** — Gallery lightbox interactions.

### CSS

- **`portfoliostyle.css`** — Main stylesheet with CSS variables, layout (flexbox), all component styles, and responsive breakpoints.
- **`about.css`** — About page overrides.
- **`photography/photography.css`** — Gallery-specific styles.
- **`normalize.css`** — CSS reset.

### Key CSS Variables (defined in `portfoliostyle.css`)

```css
--color-text-main: #563524
--color-text-dark-brown: #90553C
--color-clay: #877863
```

**Fonts:** Cormorant Garamond (serif, main body), Fira Sans / Fira Sans Condensed (sans), Sacramento / Montserrat / Nunito Sans / Darker Grotesque (decorative).

### Modal System

Project cards use `data-modal-id` attributes to link to corresponding modal elements. `index.js` handles open/close and preserves scroll position when a modal is active.

### Scroll-Based Navigation

`index.js` uses the Intersection Observer API to highlight the active sidebar nav item as the user scrolls. No external state management — all state is toggled via `classList`.
