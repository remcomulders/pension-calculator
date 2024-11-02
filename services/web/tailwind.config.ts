import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{html,ts}'],
  corePlugins: {
    preflight: false,
  },
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        md: '1.5rem',
      },
    },
    extend: {
      colors: {
        'light-blue': '#e7f5fe',
        'dark-blue': '#2680c2',
        'hot-pink': '#df189c',
      },
      backgroundImage: ({ theme }) => ({
        'gradient-header': `linear-gradient(135deg, ${theme(
          'colors.dark-blue'
        )}, ${theme('colors.hot-pink')})`,
      }),
    },
  },
  plugins: [],
};

export default config;
