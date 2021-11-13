/**
 * webpack 基本配置
 */

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const resolve = (...args) => path.resolve(__dirname, ...args)
const assetsPath = _path => path.posix.join('static', _path)
const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV === 'production'

// process.exit(0)

module.exports = {
  // 入口
  entry: {
    app: resolve('../src/app'),
  },
  // 出口
  output: {
    path: resolve('../dist'),
    filename: assetsPath('js/[name].[chunkhash:5].js'),
    chunkFilename: assetsPath('js/[name].[chunkhash:5].js'),
    publicPath: '/', // 打包后的资源访问路径前缀
  },
  // 模块
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // 匹配react文件
        exclude: /node_modules/, // 不处理node_modules中的模块
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader', // 创建 <style></style
          },
          {
            loader: 'css-loader', // 转换css文件
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev, // css 热更新，可能不起作用 ^_^
              reloadAll: true,
            },
          },
          // {
          //   loader: 'style-loader', // 创建 <style></style> 标签，与 MiniCssExtractPlugin 有冲突
          // },
          {
            loader: 'css-loader',
            options: {
              modules: true, // 开启 css 模块化
            },
          },
          'less-loader', // 编译 less
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000, // url-loader 包含 file-loader，这里不用 file-loader，小于 10000KB 的图片编译成 base64，大于 10000KB 文件标签引入
          name: 'static/images/[name].[hash:7].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/fonts/[name].[hash:7].[ext]',
        },
      },
    ],
  },
  // 引入文件配置
  resolve: {
    extensions: ['.js', '.json'], // 解析扩展。[引入文件时不用加扩展名]
    alias: {
      '@': resolve('..', 'src'),
      'assets': resolve('..', 'src/assets'),
      '_c': resolve('..', 'src/components'),
      '_l': resolve('..', 'src/layout'),
      '_p': resolve('..', 'src/pages'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('..', 'index.html'), // html 模板
    }),
    // 处理 static 下的静态文件
    new CopyWebpackPlugin([
      {
        from: resolve('..', 'static'), // 从哪个目录 Copy
        to: 'static', // Copy 到哪个目录
        ignore: ['.*'],
      }
    ]),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: assetsPath('css/[name].[hash].css'),
      chunkFilename: assetsPath('css/[name].[chunkhash].css'),
    }),
  ],
}
