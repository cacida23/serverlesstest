/**
 * webpack 打包配置
 */

process.env.NODE_ENV = 'production'


const path = require('path')
const webpackMerge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const resolve = str => path.resolve(__dirname, str)
const assetsPath = _path => path.join('static', _path)

module.exports = webpackMerge(baseWebpackConfig, {
  // 指定构建环境
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      filename: resolve('../dist/index.html'), // html模版的生成目录
      template: 'index.html', // html模板
      inject: true, // true[默认值]，script标签插入到</body>前
      hash: true, // scirpt标签src后面会加上hash，[src="xxx.js?hash"]
      // html文件进行压缩
      minify: {
        removeComments: true, // 去掉注释
        collapseWhitespace: true, // 压缩空格
        removeAttributeQuotes: true, // 去掉属性引号 src="xxxx.js" => src=xxxx.js
      },
    }),
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin(),
  ],
  // 构建优化
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin({
        discardComments: { removeAll: true }, // 去掉注释
      }),
      new UglifyJsPlugin({
        parallel: true, // 开启多线程并行压缩，提高构建速度
        uglifyOptions: {
          warnings: false,
          compress: {
            unused: true,
            drop_debugger: true,
            drop_console: true,
          },
          output: {
            comments: false, // 去掉注释
          },
        },
      }),
    ],
    // webpack 代码切割
    splitChunks: {
      // async 表示只从异步加载得到模块（动态加载import()）里面进行拆分
      // initial 表示只从入口进行拆分
      // all 表示两者都包括
      chunks: 'all',
      maxSize: 30000, // 大于 30k 会被拆分
      minChunks: 1, // 被引用次数大于等于这个数进行拆分
      // import() 本身算一个文件
      // 只计算 js，不算 css
      // 如果同时有两个模块满足 cacheGroup 的规则要进行拆分，但是 maxInitialRequests 的值允许再拆分一个模块，那打包尺寸更大的模块会被拆分出来
      maxAsyncRequests: 5, // 最大的按需加载（异步）请求次数
      // 最大的初始化加载次数是为了限拆分数量，不至于拆出过多的模块
      // 入口算一个文件
      // 如果这个模块有异步加载的不算
      // 只算 js，不算 css
      // 通过 runtimChunk 拆分出来的 runtime 不算在内
      // 如果同时有两个模块满足 cacheGroup 的规则要进行拆分，但是 maxInitialRequests 只允许再拆分一个模块，那尺寸更大的会被拆分
      maxInitialRequests: 3,
      automaticNameDelimiter: '~', // 切割文件分隔符
      name: true,
      cacheGroups: {
        // 默认配置
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10, // 优先级
        },
        // 默认的配置，vendors规则不命中的话，就会命中这里
        default: {
          minChunks: 2, // 引用超过两次的模块 -> default
          priority: -20,
          reuseExistingChunk: true,
        },
        // ant design ui
        "ant-design": {
          priority: 2, // 优先级别
          test: /[\\/]node_modules[\\/](antd)[\\/]/, // (module) => (/antd/.test(module.context))
        },
        // react 全家桶
        "react-全家桶": {
          priority: 2, // 优先级别
          test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|mobx|mobx-react)[\\/]/,
        },
        // 其他库
        commons: {
          priority: 1, // 优先级别
          test: /[\\/]node_modules[\\/](moment|axios|lodash)[\\/]/,
        },
      },
    }
  },
})
