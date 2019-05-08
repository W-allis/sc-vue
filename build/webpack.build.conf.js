const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')

const minicssextractplugin = require('mini-css-extract-plugin')
const htmlwebpackplugin = require('html-webpack-plugin')
const cleanwebpackplugin = require('clean-webpack-plugin')

const base = require('./webpack.base.conf')
const config = require('../config')
const utils = require('./utils')

const isProduction = process.env.BASE_ENV === 'production'
// enum env_config = { prod, qa, stage }
const env = require('../config/' + process.env.env_config + '.env')

module.exports = merge(base, {
  mode: isProduction ? 'production' : 'development',
  module: {
    rules: utils.cssloaders({
      usePostcss: true
    })
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new minicssextractplugin({
      filename: '[name].css'
    }),
    new htmlwebpackplugin({
      title: 'webpack',
      template: path.resolve(__dirname, '../src/index.html'),
      filename: 'index.html'
    }),
    new cleanwebpackplugin({
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, '../dist'), path.resolve(__dirname, '../dist/*')],
    })
  ]
})
