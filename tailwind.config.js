module.exports = {
    purge: ["./pages/**/*.tsx", "./src/**/*.tsx"],
    darkMode: false, // or 'media' or 'class'
    mode: "jit",
    theme: {
        extend: {
            colors: {},
            fontFamily: { sans: ["Work Sans"] },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
