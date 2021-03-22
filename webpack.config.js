const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WriteFilePlugin = require("write-file-webpack-plugin");

const config = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    popup: path.join(__dirname, 'src', 'js', 'popup.js'),
    options: path.join(__dirname, 'src', 'js', 'options.js'),
    background: path.join(__dirname, 'src', 'js', 'background.js')
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: function (pathData) {
      return pathData.chunk.name === 'background' ? '[name].js' : '[name].bundle.js';
    },
    assetModuleFilename: '[name][ext]',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.(ico|svg|jpe?g|png|webp)$/,
        type: 'asset/resource',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new CopyPlugin({
      patterns: [{
        from: 'src/manifest.json',
        transform: function (content, path) {
          return Buffer.from(JSON.stringify({
            description: process.env.npm_package_description,
            version: process.env.npm_package_version,
            ...JSON.parse(content.toString())
          }));
        }
      }]
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'popup.html'),
      filename: 'popup.html',
      chunks: ['popup']
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'options.html'),
      filename: 'options.html',
      chunks: ['options']
    }),
    new WriteFilePlugin()
  ]
};

if (process.env.NODE_ENV === 'development') {
  // TODO: Can not load source map
  // config.devtool = 'eval-cheap-module-source-map';
  config.devtool = 'source-map';
}

module.exports = config;
