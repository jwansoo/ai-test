# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Nuxt 4** application with TypeScript, using **@nuxt/ui** (Nuxt UI v4) for the component library, **@nuxt/eslint** for linting, and the **Vercel AI SDK** for AI chat functionality. The project follows Nuxt's file-based routing and auto-imports conventions.

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
├── app.config.ts        # App-level configuration (title, UI colors)
├── types.ts             # Shared TypeScript interfaces (ChatMessage, Chat)
├── pages/               # File-based routes (index.vue, chat.vue, about.vue)
├── layouts/             # Layout components (default.vue, orange.vue)
├── composables/         # Auto-imported composables
│   ├── useChat.ts      # Chat state management composable
│   ├── useChatScroll.ts # Auto-scroll behavior for chat
│   └── mockData.ts     # Mock data for development
├── components/          # Auto-imported Vue components
└── assets/
    └── css/main.css    # Global CSS

server/
├── api/
│   └── ai.ts           # API endpoint for AI chat (POST /api/ai)
└── services/
    └── ai-service.ts   # AI model factory and chat generation logic
```

## Architecture Notes

### Auto-imports
- Nuxt 4 auto-imports Vue APIs (ref, computed, etc.), composables, and components
- No need to manually import refs, computed, or composables from `~/composables/`
- Components in `app/components/` directory are auto-imported

### Layouts System
- Root `app.vue` uses `<UApp>` wrapper component from @nuxt/ui
- Nested routing: `<NuxtLayout>` → `<NuxtPage>`
- Create layouts in `app/layouts/` and reference with `definePageMeta({ layout: 'layoutName' })`

### Composables Pattern
- Place reusable logic in `app/composables/`
- Use `export default function` pattern (e.g., `useChat.ts`)
- Composables are auto-imported throughout the app

### Server API Pattern
- API routes in `server/api/` become endpoints automatically (e.g., `server/api/ai.ts` → `/api/ai`)
- Use `defineEventHandler()` for request handlers
- Shared logic extracted to `server/services/`
- Access runtime config with `useRuntimeConfig()` (e.g., API keys)

### AI Integration
- Uses Vercel AI SDK (`ai` package) with `@ai-sdk/openai` and `ollama-ai-provider`
- Current configuration: OpenAI GPT-4o-mini (Ollama support commented out)
- AI service factory pattern in `server/services/ai-service.ts`:
  - `createOpenAIModel(apiKey)` - Creates OpenAI model instance
  - `createOllamaModel()` - Creates Ollama model instance (commented)
  - `generateChatResponse(model, messages)` - Generates chat responses
- Chat flow: Client → POST `/api/ai` → `ai-service.ts` → OpenAI API → Response

### Type System
- Central type definitions in `app/types.ts`
- TypeScript config uses Nuxt-generated references (see `.nuxt/tsconfig.*.json`)
- Current types: `ChatMessage`, `Chat`
- AI SDK types imported from `ai` package: `Message`, `LanguageModelV1`

### Nuxt UI Integration
- Using @nuxt/ui v4.x for UI components
- Components prefixed with `U` (e.g., `<UApp>`)
- CSS variables for theming (e.g., `var(--ui-bg)`)
- Primary color configured in `app.config.ts` (currently: blue)

### MDC (Markdown Components)
- @nuxtjs/mdc module enabled for rendering markdown
- Syntax highlighting configured with Material Theme Palenight
- Supported languages: html, markdown, vue, typescript, javascript

## Configuration

### nuxt.config.ts
- Modules: `@nuxt/eslint`, `@nuxt/ui`, `@nuxtjs/mdc`
- Runtime config: `openaiApiKey` (loaded from `NUXT_OPENAI_API_KEY` env var)
- Vite optimizeDeps includes: `debug`
- Global CSS: `./assets/css/main.css`
- MDC syntax highlighting theme: material-theme-palenight

### Environment Variables
- `NUXT_OPENAI_API_KEY` - OpenAI API key (required for AI chat functionality)

### ESLint
- Uses Nuxt's ESLint config (`.nuxt/eslint.config.mjs`)
- Extend config in `eslint.config.mjs`
