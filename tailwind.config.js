/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./features/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#0f172a',
        'bg-card': '#111827',
        'bg-hover': '#172033',
        'border-dark': '#1e293b',
        'text-primary': '#f8fafc',
        'text-secondary': '#cbd5e1',
        'text-muted': '#94a3b8',
        'accent-blue': '#2563eb',
        'accent-blue-hover': '#3b82f6',
        'success': '#86efac',
        'danger': '#fca5a5',
        'price': '#38bdf8',
      }
    },
  },
  plugins: [],
}
