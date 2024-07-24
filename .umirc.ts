import { defineConfig } from "umi";

export default defineConfig({
  title: "Video Editor",
  routes: [
    { path: "/", redirect: "/editor" },
    { path: "/docs", component: "docs" },
    { path: "/editor", component: "@/pages/editor/index.tsx" },
  ],
  npmClient: "pnpm",
  dva: {},
  plugins: ["@umijs/plugins/dist/dva", "@umijs/plugins/dist/tailwindcss"],
  tailwindcss: {},
});
