/** @type {import('tailwindcss').Config} */
const sb = require('tailwind-scrollbar')
module.exports = {
  content: [
    "./public/**/*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        '3.5': "url('/assets/Background/3.5.webp')",
      }
    }
  },
  plugins: [
    sb({ noncompatible: true }),
  ]
}
