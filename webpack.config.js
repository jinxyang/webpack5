const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, './src'),
  entry: [
    'webpack-hot-middleware/client?timeout=10000&reload=true&quiet=true',
    path.resolve(__dirname, './src/index.js'),
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [require('react-refresh/babel')],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(__dirname, './src'), 'node_modules'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx'],
      formatter: 'pretty',
    }),
    new StylelintPlugin({
      files: '**/*.js?(x)',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
  ],
  infrastructureLogging: {
    level: 'none',
  },
}
