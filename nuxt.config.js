// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config"
export default defineNuxtConfig({
  meta: {
    meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
    script: [],
    link: [
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css",
      },
    ],
  },
  css: ["assets/styles/main.scss", "@fortawesome/fontawesome-svg-core/styles.css"],
  plugins: ["@/plugins/fontawesome.js"],
  modules: ["@nuxtjs/google-fonts"],
  googleFonts: {
    families: {
      // 'Jost': [400, 500, 600, 700], // just example
    },
  },
  // in case that you are coding on windows(IDE) with WSL2(launching this app)
  vite: {
    server: {
      watch: {
        usePolling: true,
      },
    },
  },
})
