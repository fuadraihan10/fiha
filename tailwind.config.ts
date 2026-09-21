import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        maroon: '#7A1F2B',
        'rose-red': '#C1273B',
        'blush-pink': '#FFD1DC',
        magenta: '#E4508F',
        cream: '#F5EBDD',
        'sage-green': '#6B8F5E',
        'warm-gold': '#E2B25A',
        charcoal: '#1E1B18',
        slate: '#2D3748',
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'serif'],
        body: ['"Inter"', '"Poppins"', 'sans-serif'],
        handwritten: ['"Caveat"', 'cursive'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'fade-up': 'fadeUp 0.8s ease-out',
        'soft-scale': 'softScale 0.8s ease-out',
        'float-petal': 'floatPetal 6s linear infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        softScale: {
          from: { opacity: '0', transform: 'scale(0.98)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        floatPetal: {
          '0%': { transform: 'translateY(-10px) translateX(0)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(100vh) translateX(30px)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
