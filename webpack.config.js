const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const root = __dirname;
const src = path.resolve(root, 'src');
const dist = path.resolve(root, 'dist');
const entry = './pages/index.hbs';

module.exports = {
    context: src,
    entry,
    output: {
        path: path.resolve(dist),
        filename: 'assets/index.js'
    },

    resolve: {
        alias: {
            '~': src
        }
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.hbs$/,
                use: [
                    {
                        loader: path.resolve(__dirname, 'lib', 'page-loader.js')
                    }
                ]
            },
            {
                test: /\.styl$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development'
                        },
                    },
                    { loader: 'css-loader' },
                    { loader: 'stylus-loader' }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'assets/[name].css',
            chunkFilename: 'assets/[id].css',
        })
    ]
};
