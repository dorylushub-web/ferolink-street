/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          900: '#0D2818',
          800: '#1A3A24',
          700: '#1E4A2A',
          600: '#2D6A3F',
        },
        gold: {
          400: '#F0C040',
          500: '#D4A017',
          600: '#B8860B',
        },
        anthracite: {
          900: '#1C1C1E',
          800: '#2C2C2E',
          700: '#3A3A3C',
          600: '#48484A',
        },
        cream: '#F5F0E8',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
