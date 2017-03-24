'use strict';

const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractText = require('extract-text-webpack-plugin');

var plugins = [
  new ExtractText('bundle.css'),
  new webpack.LoaderOptionsPlugin({
    options: {
      postcss: [autoprefixer]
    }
  })
];

module.exports = {
  entry: `${__dirname}/app`,
  plugins: plugins,
  output: {
    path: `${__dirname}/build`,
    filename: 'bundle.js'
  },
  module:{
    rules:[
      {
        test: /\.scss$/,
        use: ExtractText.extract({fallback:'style-loader', use:
        ['css-loader', 'sass-loader']}),
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015']
            }
          }
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.(jpg|gif|png)$/,
        loader: 'file-loader?name=img/[hash].[ext]'
      },
      {
        test: /\.ico/,
        loader: 'static-loader'
      },
      {
        test: /\.svg/,
        loader:'url-loader?limit=10000&mimetype=image/svg+xml&name=fonts/[name].[ext]',
      },
      {
        test: /\.woff/,
        loader: 'file-loader?name=fonts/[name].[ext]',
      },
      {
        test: /\.[ot]tf/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream&name=fonts/[name].[ext]'
      },
      {
        test: /\.eot/,
        loader:'url-loader?limit=10000&mimetype=application/vnd.ms-fontobject&name=fonts/[name].[ext]'
      }
    ]
  }
};
