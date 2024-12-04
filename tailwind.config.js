/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,tsx,jsx,ts}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "header": "url('bg.jpg')"
      }
    },
  },
  plugins: [],
}

