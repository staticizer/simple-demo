const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const root = __dirname;
const src = path.resolve(root, 'src');
const dist = path.resolve(root, 'dist');
const entry = './index.js';

module.exports = {
    context: src,
    entry,
    output: {
        path: dist,
        filename: '_.js'
    },

    resolve: {
        alias: {
            'helpers': path.resolve(src, 'helpers'),
            'staticizer': path.resolve(__dirname, 'lib')
        }
    },

    module: {
        rules: [
            {
                test: /\.hbs$/,
                use: [
                    {
                        loader: path.resolve(__dirname, 'lib', 'page-loader.js')
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),

        new HtmlWebpackPlugin({
            template: 'pages/index.hbs',
            filename: 'index.html',
            inject: false
        })
    ]
};
