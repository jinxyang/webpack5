const express = require('express')
const webpack = require('webpack')
const devMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')

const webpackConfig = require('./webpack.config')

const app = express()
const compiler = webpack(webpackConfig)

app.use(devMiddleware(compiler))
app.use(
  hotMiddleware(compiler, {
    log: false,
    heartbeat: 5000,
  }),
)
app.listen(9527)
