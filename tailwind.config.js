/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        sand: '#f6f1e9',
        ink: '#2f2a2d',
        ocean: '#174d59',
        sun: '#ffc857',
        teal: '#2a9d8f',
        coral: '#d1495b',
      },
      fontFamily: {
        heading: ['Merriweather', 'serif'],
        body: ['Nunito Sans', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 14px 30px -20px rgba(23, 77, 89, 0.45)',
      },
    },
  },
  plugins: [],
}

