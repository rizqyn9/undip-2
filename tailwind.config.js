// tailwind.config.js
const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors:{
      transparent: "transparent",
      current : "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
      green : colors.green,
      green1 : "#b2d8d8",
      green2 : "#66b2b2",
      green3 : "#008080",
      green4 : "#006666",
      green5 : "#004c4c",
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
