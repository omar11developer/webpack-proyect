const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './src/index.js',
    // Entry nos permite decir el punto de entrada de nuestra aplicación
    output:{
            // path es donde estará la carpeta donde se guardará los archivos
            // Con path.resolve podemos decir dónde va estar la carpeta y la ubicación del mismo
        path: path.resolve(__dirname, 'dist'),
            // filename le pone el nombre al archivo final o de salida
        filename:'[name].[contenthash].js',
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    mode: 'development',
    watch: true,
    resolve: {
        // Aqui ponemos las extensiones que tendremos en nuestro proyecto para webpack los lea
        extensions: ['.js'],
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/')
        }
    },
    module: {
     rules:[
                {
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.css$/i,
                    use:[miniCssExtractPlugin.loader, 'css-loader'],
                },
                {
                    test: /\.png/,
                    type: 'asset/resource'
                },
                {
                    test: /\.(woff|woff2)$/,
                    use:{
                        loader: 'url-loader',
                        options:{
                            limit:10000,
                            MimeType: "application/font-woff",
                            name: "[name].[contenthash].[ext]",
                            outputPath: "./assets/fonts/",
                            publicPath: "../assets/fonts/",
                            esModule: false,
                        },
                    }
                }
            ]
    },   
    plugins: [
        new htmlWebpackPlugin({
            inject:true,
            template: './public/index.html',
            filename: './index.html'
        }),
        new miniCssExtractPlugin({
            filename: 'assets/[name].[contenthash].css'
        }),
        new CopyPlugin({
            patterns:[
                {
                    from: path.resolve(__dirname, "src", "assets/images"),
                    to: "assets/images"
                }
            ]
        }),
        new Dotenv(),
    ],
    
}