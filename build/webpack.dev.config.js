/**
 * webpack 开发配置
 */

process.env.NODE_ENV = 'development'


const path = require('path')
const webpackMerge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {GenerateSW} = require('workbox-webpack-plugin')

const resolve = (...args) => path.resolve(__dirname, ...args)

module.exports = webpackMerge(baseWebpackConfig, {
  // 指定构建环境
  mode: 'development',
  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      filename: resolve('../dist/index.html'), // html模板生成目录
      template: 'index.html', // html模板
      inject: true, // true[默认值]，script便签插入</body>前
    }),
    new GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      maximumFileSizeToCacheInBytes: 50 * 1000 * 1000
    })
  ],
  // 开发服务器配置
  devServer: {
    historyApiFallback: true, // 当找不到路径时候，默认加载index.html文件
    contentBase: false, // 指定静态资源服务器目录，需要静态时候开启
    port: 8080, // 指定服务器端口
    publicPath: '/', // 访问资源加前缀
    proxy: {
      // 接口请求代理
      '/api': {
        secure: false,
        target: 'http://127.0.0.1:4000', // mock server
      },
    },
  },
})
