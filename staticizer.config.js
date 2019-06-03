module.exports = {
    output: {
        assetsPrefix: 'assets',
        staticPrefix: false,
        minify: {
            html: false,
            js: false,
            css: false
        }
    },

    layout: {
        default: 'default'
    },

    data: {
        common: {
            meta: {
                title: '---'
            }
        },
        pages: {
            'index': {},
            'inner/index': {}
        }
    }
};
