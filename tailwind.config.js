/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'purple-bg': '#111827',
        'purple-dark': '#5B2C87',
        'purple-main': '#6F42C1',
        'purple-light': '#A855F7',
        'purple-soft': '#E9D5FF',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
}
