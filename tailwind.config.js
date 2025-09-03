// tailwind.config.js
module.exports = {
    // ...
    theme: {
        extend: {
            animation: {
                progress: 'progressBar linear forwards',
            },
            keyframes: {
                progressBar: {
                    '0%': { width: '0%' },
                    '100%': { width: '100%' },
                },
            },
        },
    },
};
