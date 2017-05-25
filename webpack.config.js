'use strict'
// let CopyWebpackPlugin = require('copy-webpack-plugin')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let path = require('path')

let config = {
  context: path.join(__dirname, 'client'),
  entry: './main.jsx',
  devtool: 'source-map',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'build')
  },

  // Resolve
  resolve: {
    modules: [
      path.resolve('./client/'),
      path.resolve('./node_modules')
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ],
  module: {
    loaders: [
      { test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.(scss|sass)$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      // fonts etc..
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=image/svg+xml'},
      {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=application/font-woff'},
      {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=application/font-woff'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=application/octet-stream'},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader'}
    ]
  }
}
module.exports = config
