const baseConfig = require('./webpack.base.conf');
const devServerConfig = require('./webpack.dev.server.conf');

console.log('===== Envirement ====== ', process.env.NODE_ENV)
// console.log('~~~~~~~~~~~~~\n', baseConfig)
const webpackDevConfig = {
  ...baseConfig,
  ...{
    optimization: {
      // 打包压缩配置
      minimize: false
    },
    devServer: devServerConfig
  }
}
module.exports = webpackDevConfig;
