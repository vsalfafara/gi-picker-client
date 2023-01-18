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
        'sumeru': "url('/assets/Background/3.4.webp')",
      }
    }
  },
  plugins: [
    sb({ noncompatible: true }),
  ]
}
