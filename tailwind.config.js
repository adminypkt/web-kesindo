/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { 50:'#e8f0f5',100:'#c5d9e6',200:'#9fbfd4',300:'#78a5c2',400:'#5b92b5',500:'#3e7fa8',600:'#2d6a93',700:'#1d547a',800:'#0B3C5D',900:'#062a43' },
        accent: { 50:'#fff8e6',100:'#feefc0',200:'#fde596',300:'#fcdb6c',400:'#fbd24c',500:'#F2A900',600:'#d99700',700:'#b37d00',800:'#8c6200',900:'#664700' },
      },
      fontFamily: {
        sans: ['Inter','Poppins','system-ui','sans-serif'],
        heading: ['Poppins','Inter','system-ui','sans-serif'],
      },
    },
  },
  plugins: [],
};
