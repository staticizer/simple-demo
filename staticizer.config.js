module.exports = {
    mode: 'development',
    output: {
        assetsPrefix: 'assets',
        staticPrefix: false,
        minify: true
    },

    devServer: {
        port: 3000,
        open: true
    },

    pipelines: {
        css: [
            {
                test: /\.styl$/,
                use: [{ loader: 'stylus-loader' }]
            }
        ],
        js: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['babel-loader'],
        }]
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
