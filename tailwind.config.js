
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#e7f0ff',
          100: '#c2d6ff',
          200: '#9cbbff',
          300: '#76a1ff',
          400: '#5087ff',
          500: '#2b6dff',   // azul escuro primário
          600: '#1f54cc',
          700: '#163c99',
          800: '#0f2966',
          900: '#081633'
        }
      }
    }
  },
  darkMode: 'class',
  plugins: []
}
