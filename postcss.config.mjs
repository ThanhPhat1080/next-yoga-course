/** @type {import('postcss-load-config').Config} */
const config = {
    plugins: {
        'tailwindcss/nesting': 'postcss-nesting',
        tailwindcss: {},
        autoprefixer: {},
        cssnano: {
            preset: 'default',
        },
    },
};

export default config;
