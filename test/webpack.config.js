const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve(dir) {
  return path.resolve(__dirname, dir)
}

module.exports = {
  // 指定构建模式
  mode: 'development',
  // 入口
  entry: {
    app: path.join(__dirname, 'src/app'),
  },
  // 出口
  output: {
    path: resolve('../dist'),
    filename: 'js/[name].[hash].js',
    publicPath: '/', // 打包后的资源的访问路径前缀
  },
  // 模块
  module: {

  },
  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      filename: resolve('../dist/index.html'), // html 模版生成目标目录
      template: 'index.html', // html 模板
      inject: true, // true [默认值]，script 标签插入 </body> 之前
      hash: true, // 加上 hash 命名
      // html 压缩
      minify: {
        removeComments: true, // 去掉注释
        collapseWhitspace: true, // 压缩空格
        removeAttributeQuotes: true, // 去除属性引用
      }
    })
  ],
  // 开发服务器配置
  devServer: {

  }
}
