const Progress = require('progress')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const { root } = require('./utils')
const config = require('./config')

const bar = new Progress('Building :bar :percent', {
  clear: true,
  complete: '=',
  incomplete: ' ',
  total: 100,
  width: 20,
})
let isFinish = false

module.exports = {
  mode: 'development',
  context: root('src'),
  entry: [
    root('src/index.js'),
    'webpack-hot-middleware/client?timeout=10000&reload=true&quiet=true',
  ],
  output: {
    filename: '[name].js',
    path: root('dist'),
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
    modules: ['src', 'node_modules'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: root('src/index.html'),
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
    new webpack.ProgressPlugin((percent, message) => {
      if (isFinish) return
      bar.update(percent)
      if (percent === 1) {
        bar.terminate()
        isFinish = true
      }
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`You app is running here http://localhost:${config.port}`],
      },
    }),
  ],
  infrastructureLogging: {
    level: 'none',
  },
}
