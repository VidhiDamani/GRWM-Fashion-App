/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#e5d1cb',
          300: '#d4b0a4',
          400: '#e0a96d', // Rose Gold accent
          500: '#c4894b',
          600: '#a36835',
          700: '#7e4d27',
          800: '#53311a',
          900: '#2b170c',
        },
        fashion: {
          dark: '#0b0914',
          card: '#151128',
          cardHover: '#1c1736',
          border: '#2a2347',
          accent: '#e0a96d',
          maroon: '#881337',
          emerald: '#064e3b',
          gold: '#d97706',
          purple: '#4c1d95',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Outfit', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
