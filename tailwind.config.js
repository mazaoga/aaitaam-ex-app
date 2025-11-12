/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'aaitaam-gold': '#d4af37',
        'aaitaam-dark': 'rgba(10,10,10,0.7)',
      },
    },
  },
  plugins: [],
};

