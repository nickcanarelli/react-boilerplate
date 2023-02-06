module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          100: 'var(--color-brand-primary)',
        },
        // neutral: {
        //   100: 'var(--color-brand-neutral-100)',
        //   200: 'var(--color-brand-neutral-200)',
        //   300: 'var(--color-brand-neutral-300)',
        //   400: 'var(--color-brand-neutral-400)',
        //   500: 'var(--color-brand-neutral-500)',
        //   600: 'var(--color-brand-neutral-600)',
        //   700: 'var(--color-brand-neutral-700)',
        //   800: 'var(--color-brand-neutral-800)',
        // },
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
