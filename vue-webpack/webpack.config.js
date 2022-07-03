const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve } = require("path");

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
  },
  // 不能解析loader的路径
  resolve: {
    modules: ['node_modules', resolve(__dirname, './modules')],
    extensions: ['.js', '.vue'],
  },
  // 与resolve 对象的属性集合相同， 但仅用于解析 webpack 的 loader 包
  resolveLoader: {
    modules: ['node_modules', resolve(__dirname, './modules')],
  },
  module: {
    rules: [
      {
        test: /\.vue$/i,
        loader: 'vue-loader',
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'public/index.html'),
    })
  ]
}