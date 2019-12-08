const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const devServerConfig = require('./webpack.dev.server.config');
const mySimpleWebpackPlugin = require('../plugins/simplePlugin');

module.exports = {
  entry: './src/index.tsx',
}