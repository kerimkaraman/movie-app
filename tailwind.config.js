/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        "custom-darkblue": "#212121",
        "custom-lightgrey": "#D9D9D9",
        "custom-green": "#0FC000",
        "custom-yellow": "#E4CB44",
      },
    },
  },
  plugins: [],
};
