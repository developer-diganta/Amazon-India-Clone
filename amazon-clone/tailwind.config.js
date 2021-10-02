module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      '2xl': {'max': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '1023px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '972px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '639px'},
      // => @media (max-width: 639px) { ... }
      'lgsc':{'min':"1280px"}
    },
    backgroundColor: theme => ({
      ...theme('colors'),
      'search_1': '#f3f3f3',
     }),
    extend: {
      colors: {
        amazon_blue: {
          light: "#232F3E",
          DEFAULT: "#131921",
        },
        amazon_yellow:{
          DEFAULT: "#febd69"
        },
        cart_color:{
          DEFAULT:"#df8305"
        },
        card_color:{
          DEFAULT:"#aae0d0"
        },
        amazon_gray:{
          DEFAULT:"#eaeded"
        },
        amazon_footer:{
          light:"#37475A",
          dark:"#131a22",
          subtext:"#767c6c",
          DEFAULT:"#ffffff"
        },
        others:{
          search:"#c45516",
          sort:"#f0f2f2",
          search2:"#f4f4f4",
          searchSelect:"#e7f4f5",
          searchSelectText:"#1e8294",
          proceed:"#f1c34f",
          proceed2:"#f7dea1",
          DEFAULT:"#fff",
          // address:"#f2c75d"
        }
      },
    },
  },
  variants: {
    variants: ["active"],
    extend: {
      backgroundColor: ['active'],
    }
  },
  plugins: [],
}
