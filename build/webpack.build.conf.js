const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')

const minicssextractplugin = require('mini-css-extract-plugin')
const htmlwebpackplugin = require('html-webpack-plugin')
const cleanwebpackplugin = require('clean-webpack-plugin')
const terserwebpackplugin = require('terser-webpack-plugin')
const purifycssplugin = require('purifycss-webpack')
const glob = require('glob-all')
const compresswebpackplugin = require('optimize-css-assets-webpack-plugin')

const base = require('./webpack.base.conf')
// const config = require('../config')
const utils = require('./utils')

const isProduction = process.env.BASE_ENV === 'production'
// enum env_config = { prod, qa, stage }
const env = require('../config/' + process.env.env_config + '.env')

module.exports = merge(base, {
  mode: isProduction ? 'production' : 'development',
  module: {
    rules: utils.cssloaders({
      usePostcss: true,
      // 压缩css文件将css与sourcemap文件关联
      sourceMap: true
    })
  },
  optimization: {
    minimizer: [

      // 必须在mode为production时生效
      new terserwebpackplugin({
        test: /\.js(\?.*)?$/i,
        cache: true,
        // cache: 'path/to/cache',
        // 开启多线程，加快打包速度
        sourceMap: true,
        parallel: true,
        extractComments: true
      })
    ],
    splitChunks: {
      cacheGroups: {
        styles: {
          // name: 'style.css',
          test: /\.css(\?.*)?$/i,
          chunks: 'all',
          enforce: true
        },
        angular: {
          test: /angular/,
          chunks: 'initial',
          name: 'angular',
          priority: 10,
          enforce: true
        },
        vue: {
          test: /vue/,
          chunks: 'initial',
          name: 'vue',
          priority: 10,
          enforce: true
        },
        vendor: {
          test: /!vue|!angular/,
          chunks: 'initial',
          name: 'vue',
          priority: 10,
          enforce: true
        },
        // 如果是同一个入口则只会引入该模块一次
        commons: {
          chunks: 'initial',
          // 至少打包了两次
					minChunks: 2,
					maxInitialRequests: 5, // The default limit is too small to showcase the effect
          // 文件最小值
          minSize: 10000 // This is example is too small to create commons chunks
        },
        runtimeChunk: {
          name: "manifest"
        }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new minicssextractplugin({
      filename: utils.resolve('css/[name].css')
    }),
    // 压缩css
    new compresswebpackplugin({
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      }
    }),
    new htmlwebpackplugin({
      title: 'webpack',
      template: path.resolve(__dirname, '../index.html'),
      filename: 'index.html'
    }),
    // css树摇晃 purifycss-webpack purify-css glob-all
    /** 慎用，会将有用的css去掉
    new purifycssplugin({
      paths: glob.sync([
        path.resolve(__dirname, '../src/*.js'),
        path.resolve(__dirname, '../*.html'),
        path.resolve(__dirname, '../*.vue')
      ])
    }),
    */
    new cleanwebpackplugin({
      // clean dist folder before every build
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, '../dist'), path.resolve(__dirname, '../dist/*')],
    })
  ]
})
