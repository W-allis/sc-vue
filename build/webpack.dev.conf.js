const webpack = require('webpack')
const merge = require('webpack-merge')

const base = require('./webpack.base.conf')
const utils = require('./utils')
const config = require('../config')

const isProduction = process.env.BASE_ENV === 'production'
// enum env_config = { prod, qa, stage }
const env = require('../config/' + process.env.env_config + '.env')

module.exports = merge(base, {
  mode: 'development',
  module: {
    rules: utils.cssloaders({
      usePostcss: true
    })
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env
    })
  ],
  devtool: 'source-map',
  devServer: {
    port: 9285,
    proxy: config.dev.proxyTable
  }
})
