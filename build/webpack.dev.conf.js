const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')

const Dashboard = require('webpack-dashboard');
const dashboardPlugin = require('webpack-dashboard/plugin');
const dashboard = new Dashboard();
const minicssextractplugin = require('mini-css-extract-plugin')
const htmlwebpackplugin = require('html-webpack-plugin')

const base = require('./webpack.base.conf')
const utils = require('./utils')
const config = require('../config')

// const isProduction = process.env.BASE_ENV === 'production'
// enum env_config = { prod, qa, stage }
const env = require('../config/' + 'qa' + '.env')

module.exports = merge(base, {
  mode: 'development',
  module: {
    rules: utils.cssloaders({
      usePostcss: true,
      sourceMap: false
    })
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new dashboardPlugin(dashboard.setData),
    new minicssextractplugin({
      filename: utils.resolve('css/[name].css')
    }),
    new htmlwebpackplugin({
      title: 'webpack',
      template: path.resolve(__dirname, '../index.html'),
      filename: 'index.html'
    })
  ],
  devtool: 'source-map',
  devServer: {
    port: 9285,
    proxy: config.dev.proxyTable
  }
})
