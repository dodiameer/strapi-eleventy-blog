module.exports = {
  content: ["./src/**/*.{html,njk,md}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Noto Sans", "sans-serif"],
        serif: ["Noto Serif", "serif"],
      },
    },
    container: {
      center: true,
      padding: "1.5rem",
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
