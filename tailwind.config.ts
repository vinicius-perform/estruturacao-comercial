import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        fa: {
          bg: '#080808',
          'bg-alt': '#0D0D10',
          card: '#121215',
          'card-hover': '#18181D',
          neon: '#FF6A00',
          'neon-sec': '#FF7A1A',
          'neon-glow': '#FFA048',
          orange: '#FF6A00',
          'orange-subtle': '#241408',
          text: '#F5F5F7',
          'text-muted': '#A1A1AA',
          'text-subtle': '#71717A',
          border: '#222225',
          'border-focus': 'rgba(255, 106, 0, 0.55)',
          'border-hover': 'rgba(255, 106, 0, 0.35)',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        degular: ['"Degular"', 'sans-serif'],
      },
      maxWidth: {
        container: '1200px',
      },
      boxShadow: {
        'glow-subtle': '0 0 25px -5px rgba(255, 106, 0, 0.15)',
        'glow-card': '0 12px 32px -10px rgba(0, 0, 0, 0.8), 0 0 20px -5px rgba(255, 106, 0, 0.1)',
        'glow-button': '0 0 24px -2px rgba(255, 106, 0, 0.45)',
        'glow-button-hover': '0 0 35px 2px rgba(255, 106, 0, 0.7)',
        'card-shadow': '0 16px 36px -12px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(34, 34, 37, 0.8)',
      },
      letterSpacing: {
        tighter: '-0.035em',
        tight: '-0.02em',
      },
    },
  },
  plugins: [],
};

export default config;
