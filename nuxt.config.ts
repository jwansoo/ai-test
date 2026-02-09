// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["./assets/css/main.css"],
  modules: ["@nuxt/eslint", "@nuxt/ui", "@nuxtjs/mdc"],
  runtimeConfig: {
    openaiApiKey: "",
  },
  vite: {
    optimizeDeps: {
      include: ["debug"],
    },
  },
  mdc: {
    highlight: {
      theme: "material-theme-palenight",
      langs: ["html", "markdown", "vue", "typescript", "javascript"],
    },
  },
});
