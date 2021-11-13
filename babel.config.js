module.exports = {
  "presets": [
    ["@babel/preset-env", {
      "modules": false,
      "targets": {
        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
      }
    }],
    "@babel/preset-react"
  ],
  "plugins": [
    ["@babel/plugin-transform-runtime", {
      "corejs": 2, // polyfill 需要使用@babel/runtime-corejs2
      "useBuildIns":"usage", // 按需引入,即使用什么新特性打包什么新特性, 可以减小打包的体积
    }],

    // 开启装饰器语法【必须放在class-properties前面】
    ["@babel/plugin-proposal-decorators", { "legacy": true }],

    // es7 类属性
    ["@babel/plugin-proposal-class-properties", { "loose": true }],

    // antd 组件按需引入
    ["import", {
      "libraryName": "antd",
      "libraryDirectory": "es",
      "style": "css" // `style: true` 会加载 less 文件
    }],

    // jsx 属性转换 [class => className]
    "react-html-attrs",
  ]
}
