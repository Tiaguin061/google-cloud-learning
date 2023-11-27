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
        'neutral': {
          100: '#F8F9FC',
          200: '#F1F3F9',
          300: '#E1E6EF',
          700: '#3F444D',
          800: '#23272F',
          900: '#1B1F27',
          1000: '#0A0D14'
        },

        slate: {
          1000: '#111212',
        },

        zinc: {
          50: '#e9e9e9',
          100: '#dedede',
          200: '#babcbb',
          300: '#222625',
          400: '#1f2221',
          500: '#1b1e1e',
          600: '#1a1d1c',
          700: '#141716',
          800: '#0f1111',
          900: '#0c0d0d',
        },
      }
    }
  },
  plugins: [],
}
export default config
