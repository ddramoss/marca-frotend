/** @type {import('tailwindcss').Config} */
module.exports = {
darkMode: 'class', // activa modo oscuro mediante la clase "dark"
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}", // si usas carpeta /app
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
