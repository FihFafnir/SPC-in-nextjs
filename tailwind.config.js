/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        colors: {
            primary: "#15172b",
            white: "white",
        },
        extend: {},
    },
    plugins: [require("tailwindcss-inner-border")],
};
