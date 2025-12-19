# AI Coding Guidelines for Wedding Invitation Template

## Project Overview
This is a React TypeScript single-page wedding invitation website built with Vite. It features a mobile-first responsive design with sections for invitation details, gallery, location maps, guestbook, and sharing functionality.

## Architecture
- **Single-page app** with scroll-based navigation through wedding invitation sections
- **Component structure**: Each feature lives in `src/component/{name}/` with `index.tsx` (component) and `index.scss` (styles)
- **Lazy loading**: `LazyDiv` component uses IntersectionObserver to activate sections on scroll
- **State management**: React Context for modals (`src/component/modal/`) and external APIs (`src/component/store/`)

## Key Patterns
### Component Organization
- Export components as default from `index.tsx` in each component directory
- Styles in `index.scss` with BEM-like class naming (e.g., `.invitation .content`)
- Import SVGs as React components: `import Icon from '../../icons/icon.svg?react'`

### Configuration
- Wedding details in `src/const.ts` (names, dates, locations, coordinates)
- Environment variables in `src/env.ts` for API keys and server URLs
- Use `STATIC_ONLY` env var to disable interactive features like guestbook

### External Integrations
- **Kakao SDK**: For sharing and navigation (`public/kakao.min.js`)
- **Maps**: Naver and Kakao map integrations in `src/component/location/`
- **PWA**: Manifest injection in `vite.config.ts` for installable web app

### Build & Deployment
- **Vite build**: `npm run build` outputs to `build/` folder
- **HTML injection**: Dynamic titles and meta tags via `vite-plugin-html`
- **GitHub Pages**: Configured for deployment with base path from `package.json` homepage

### Development Workflow
- **Linting**: `npm run lint` with ESLint (React hooks, TypeScript)
- **Preview**: `npm run preview` after build
- **Icons**: Place SVG files in `src/icons/`, import with `?react` suffix
- **Images**: Static assets in `public/`, referenced as `/filename`

### Modal System
- Stack-based modals with focus trap and keyboard navigation
- Use `useModal()` hook for opening/closing
- Customizable with header, content, footer, and background close behavior

### Guestbook
- Offline mode uses `src/component/guestbook/offlineGuestBook.json`
- Server mode requires `VITE_SERVER_URL` env var

## Examples
- Add new section: Create `src/component/newsection/` with `index.tsx` and `index.scss`, import in `App.tsx` within `LazyDiv`
- Customize wedding info: Edit constants in `src/const.ts`, rebuild for HTML meta updates
- Add icon: Place SVG in `src/icons/`, import as `import MyIcon from '../icons/my-icon.svg?react'`

Focus on mobile responsiveness and performance with lazy loading when adding features.</content>
<parameter name="filePath">c:\Users\minhh\Downloads\wedding-invitation-main\wedding-invitation-main\.github\copilot-instructions.md