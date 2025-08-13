const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: {
        main: './src/app.js',
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
        ],
        minimize: true,
    },
    plugins: [new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'index.html')
    }),
        new CopyPlugin({
            patterns: [
                { from: "templates", to: "templates" },
                { from: "src/css", to: "css" },
                { from: "src/assets", to: "assets" },
                { from: "src/scripts/lenis.min.js", to: "scripts/lenis.min.js" },
            ],
        }),],
    output: {
        clean: true,
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};