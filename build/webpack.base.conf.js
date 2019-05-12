const path = require('path')

const vueLoaderPlugin = require('vue-loader/lib/plugin')

const isProduction = process.env.BASE_ENV === 'production'

const config = require('../config')
const utils = require('./utils')

module.exports = {
  entry: {
    app: './src/main',
    test: './src/test'
  },
  output: {
    // 打包目标地址
    path: config.build.targetPath,
    // 静态资源服务器地址
    publicPath: isProduction ? config.build.publicPath : config.dev.publicPath,
    filename: utils.resolve('js/[name]_[hash:8].js')
  },
  resolve: {
    extensions: ['.js', '.vue', '.ts', '.json'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      // in orderTo fix render: h => h(app)  .amount('#app)
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          'html-loader'
        ]
      },
      {
        test: /\.vue$/,
        use: [
          'vue-loader'
        ]
      },
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [path.resolve(__dirname, '../src/icons')],
        options: {
          symbolId: 'icon-[name]'
        }
      },
      {
        test: /\.(jpe?g|gif|png|svg)(\?.*)?$/,
        exclude: [path.resolve(__dirname, '../src/icons')],
        use: [
          {
            loader: 'url-loader',
            // 将url-loader编译的icons去除，避免svg-sprite-loader编译到的是url-loader便已过的文件
            options: {
              limit: 5000,
              name: utils.resolve('img/[name].[ext]')
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.resolve('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.resolve('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new vueLoaderPlugin()
  ]
}