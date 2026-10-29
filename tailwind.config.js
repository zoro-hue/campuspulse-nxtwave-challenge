/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ph-grass': '#9cae8a',
        'ph-grass-dark': '#8a9c78',
        'ph-surface': '#e1e6d4',
        'ph-surface-border': '#bcc9ad',
        'ph-card': '#f4f3e9',
        'ph-card-border': '#dcdecb',
        'ph-text-main': '#151b2b',
        'ph-text-muted': '#485466',
        'ph-orange': '#f5a623',
        'ph-orange-hover': '#e89c1f',
        'ph-orange-border': '#c87c0a',
        'ph-blue': '#3d82f6',
        'ph-green': '#85bb75',
        'ph-pink': '#f46b9b',
        'ph-nav-bg': '#cad6be',
      },
      fontFamily: {
        sans: ['RoundHog', 'Inter', 'system-ui', 'sans-serif'],
        roundhog: ['RoundHog', 'sans-serif'],
      },
      boxShadow: {
        'ph-card': '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)',
        'ph-panel': '0 8px 30px rgba(45, 55, 35, 0.12)',
        'ph-button': '0 2px 0 #b8750d',
        'ph-button-pressed': '0 0 0 #b8750d',
      }
    },
  },
  plugins: [],
}
