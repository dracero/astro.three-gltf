import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";
import serviceWorker from "astrojs-service-worker";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),
  integrations: [serviceWorker()],
});
