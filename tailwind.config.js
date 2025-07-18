/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: ['bg-gray-300'],
  theme: {
    extend: {
      colors: {
        bodyColor: '#FFFFFF',
        buttonColor: '#2A586F',
        borderColor: '#C4C4C4',
        orangeButton: '#FAC167',
        qnsBgC: '#F4F4F4',
        attended: '#E7FFD9',
        notAttend: '#FAFAFA',
        selectBtn: '#F7FFEB',
        selectedBtn: '#A79E9E'
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif']
      },
      maxWidth: {
        formWidth: '28rem'
      },
    },
  },
  plugins: [],
}