import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green:  '#1a4d2e',   // vert profond
          gold:   '#c9a84c',   // or
          dark:   '#2b2b2b',   // anthracite
          cream:  '#f5f0e8',   // blanc cassé
          light:  '#e8f5e9',   // vert clair
        },
      },
      fontFamily: {
        display: ['Georgia', 'serif'],
        body:    ['system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
