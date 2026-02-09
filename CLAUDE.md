# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Nuxt 4** application with TypeScript, using **@nuxt/ui** (Nuxt UI v4) for the component library and **@nuxt/eslint** for linting. The project follows Nuxt's file-based routing and auto-imports conventions.

## Development Commands

```bash
# Development
npm run dev          # Start dev server at http://localhost:3000

# Building
npm run build        # Build for production
npm run generate     # Generate static site
npm run preview      # Preview production build locally

# Setup
npm install          # Install dependencies
npm run postinstall  # Prepare Nuxt (runs automatically after install)
```

## Project Structure

```
app/
├── app.vue              # Root component (uses UApp wrapper with NuxtLayout/NuxtPage)
├── types.ts             # Shared TypeScript interfaces
├── pages/               # File-based routes (Nuxt auto-routing)
├── layouts/             # Layout components (default.vue, orange.vue)
├── composables/         # Auto-imported composables
│   ├── useChat.ts      # Chat state management composable
│   └── mockData.ts     # Mock data for development
└── assets/
    └── css/main.css    # Global CSS
```

## Architecture Notes

### Auto-imports
- Nuxt 4 auto-imports Vue APIs (ref, computed, etc.), composables, and components
- No need to manually import refs, computed, or composables from `~/composables/`
- Components in `components/` directory (when added) are auto-imported

### Layouts System
- Root `app.vue` uses `<UApp>` wrapper component from @nuxt/ui
- Nested routing: `<NuxtLayout>` → `<NuxtPage>`
- Layout transitions configured: `{ name: "layout", mode: "out-in" }`
- Create layouts in `app/layouts/` and reference with `layout` page metadata

### Composables Pattern
- Place reusable logic in `app/composables/`
- Use `export default function` pattern (e.g., `useChat.ts`)
- Composables are auto-imported throughout the app

### Type System
- Central type definitions in `app/types.ts`
- TypeScript config uses Nuxt-generated references (see `.nuxt/tsconfig.*.json`)
- Current types: `ChatMessage`, `Chat`

### Nuxt UI Integration
- Using @nuxt/ui v4.x for UI components
- Components prefixed with `U` (e.g., `<UApp>`)
- CSS variables for theming (e.g., `var(--ui-bg)`)

## Configuration

### nuxt.config.ts
- Modules: `@nuxt/eslint`, `@nuxt/ui`
- Vite optimizeDeps includes: `debug`
- Global CSS: `./assets/css/main.css`
- App-level transitions enabled

### ESLint
- Uses Nuxt's ESLint config (`.nuxt/eslint.config.mjs`)
- Extend config in `eslint.config.mjs`

## Known Type Issues

`app/types.ts:10` - `Chat.messages` is typed as `ChatMessage` but should be `ChatMessage[]` (array). This will cause type errors in components using the `useChat` composable.
