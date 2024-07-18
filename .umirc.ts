import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/docs", component: "docs" },
  ],

  npmClient: "pnpm",
  dva: {},
  plugins: ["@umijs/plugins/dist/dva", "@umijs/plugins/dist/tailwindcss"],
  tailwindcss: {},
});
