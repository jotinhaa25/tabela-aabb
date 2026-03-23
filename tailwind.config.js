/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1e3a5f",
        secondary: "#2d5a87",
        accent: "#f59e0b",
        background: "#0f172a",
        surface: "#1e293b",
        'text-primary': "#f8fafc",
        'text-secondary': "#94a3b8",
        success: "#22c55e",
        warning: "#eab308",
        error: "#ef4444",
      },
      fontFamily: {
        bebas: ["'Bebas Neue'", "sans-serif"],
        barlow: ["'Barlow'", "sans-serif"],
      },
    },
  },
  plugins: [],
}
