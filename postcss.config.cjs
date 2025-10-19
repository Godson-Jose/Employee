module.exports = {
  plugins: [
    require('@tailwindcss/postcss')(), // Tailwind's new PostCSS plugin wrapper
    require('autoprefixer'),
  ],
};
