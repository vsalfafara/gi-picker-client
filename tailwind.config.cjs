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
        'bg': "url('/assets/Background/bg.webp')",
      }
    }
  },
  plugins: [
    sb({ noncompatible: true }),
  ]
}
