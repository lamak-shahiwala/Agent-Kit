import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'media', 
  theme: {
    extend: {
      colors: {
        "app-bg": "var(--bg-color)",
        "app-surface": "var(--surface-color)",
        "app-primary": "var(--primary-color)",
        "app-border": "var(--border-color)",
        "text-main": "var(--text-primary)",
        "text-sec": "var(--text-secondary)",
        "text-ph": "var(--text-placeholder)",
        "thinking": "var(--thinking-color)",
      },
    },
  },
  plugins: [],
};

export default config;