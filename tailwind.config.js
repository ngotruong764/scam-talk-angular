/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          0: '#000000',
          10: '#001d32',
          20: '#003352',
          25: '#003f63',
          30: '#004a75',
          35: '#005787',
          40: '#00639a',
          50: '#007dc0',
          60: '#2c97e0',
          70: '#51b2fd',
          80: '#95ccff',
          90: '#cde5ff',
          95: '#e8f2ff',
          98: '#f7f9ff',
          99: '#fcfcff',
          100: '#ffffff'
        }
      }
    },
  },
  plugins: [],
}

