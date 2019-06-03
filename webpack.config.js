const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SzPlugin = require('./lib/plugin');
const webpack = require('webpack');

const root = __dirname;
const src = path.resolve(root, 'src');
const dist = path.resolve(root, 'dist');

module.exports = {
    context: src,
    entry: {
        index: './pages/index.hbs',
        'inner/index': './pages/inner/index.hbs'
    },
    output: {
        path: dist,
        filename: 'assets/[name].[hash].js'
    },

    resolve: {
        alias: {
            '~': src,
            'assets': path.resolve(src, 'assets'),
            'components': path.resolve(src, 'components')
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
                            hmr: process.env.NODE_ENV === 'development',
                            reloadAll: true
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
            // moduleFilename: chunk => console.log(chunk) || `${chunk.name}.css`
            filename: 'assets/[name].[hash].css',
            chunkFilename: 'assets/[id].[hash].css',
        }),

        new webpack.HotModuleReplacementPlugin(),

        new SzPlugin()
    ],
    devServer: {
        // hot: true
    }
};
