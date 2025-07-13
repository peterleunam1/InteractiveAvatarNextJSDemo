const { text } = require('stream/consumers');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      colors: {
        primary: '#7559FF',
        primaryHover: '#5e43d8',
        textColor: '#1F2937',
      },
    },
  },
  darkMode: "class",
}
