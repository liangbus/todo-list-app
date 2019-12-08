const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

console.log('in webpack base config')

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  module: {
    // 创建模块时，匹配请求的规则数组。
    // 这些规则能够修改模块的创建方式。这些规则能够对模块(module)应用 loader，或者修改解析器(parser)。
    rules: [
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(tsx|ts)?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.svg/,
        use: 'file-loader',
        exclude: /node_modules/
      }
    ]
  },
  // 设置模块如何被解析
  resolve: {
    // 自动解析确定的扩展。
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  plugins: [
    // 热更新模块
    new webpack.HotModuleReplacementPlugin(),
    // 模板插件
    new HtmlWebpackPlugin({
      // 指定入口模板
      template: './src/index.html',
      hash: true,
      minify: {
        removeComments: false, // 改为false
        collapseWhitespace: false, // 改为false
        removeAttributeQuotes: false // 改为false
      }
    }),
    // 每次都会清除之前留下的打包文件，避免文件过多
    // 最新版本不需要传目标目录，自动读取 output 下的 path
    new CleanWebpackPlugin()
  ]
}