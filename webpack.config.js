const path = require('path')
const _ = require('lodash')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const outputDirectory = 'dist'
const isProduction = process.argv.indexOf('-p') >= 0

let config = {
  mode: process.env.NODE_ENV || 'development',
  entry: ['babel-polyfill', './src/client/index.js'],
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: 'bundle.js'
  },
  module: {
    rules: []
  },
  devServer: {
    port: 80,
    open: true,
    proxy: {
      "/": "http://localhost:5000"
    }
  },
  plugins: [
    new CleanWebpackPlugin([outputDirectory]),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
      filename: 'index.html',
      inject: false
    })
  ]
};

if (isProduction) {
  config.module.rules = _.union(config.module.rules, [
    {
      test: /\.css$/,
      use: [
        'style-loader',
        { loader: 'css-loader', options: { importLoaders: 1 } },
        {
          loader: 'postcss-loader',
          options: {
            plugins: [
              require('precss'),
              require('postcss-import'),
              require('postcss-preset-env')({
                  stage: 1,
              }),
              require('postcss-nested'),
              require('autoprefixer')
            ],
            sourceMap: true,
          }
        }
      ]
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    },
    {
      test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      loader: 'url-loader?limit=100000'
    }
  ])

  config.plugins = _.union(config.plugins, [
    new ExtractTextPlugin('[name]_[hash].css'),
    new ManifestPlugin({
      basePath: '/bundle/'
    })
  ])
} else {
  config.devtool = 'source-map'

  config.module.rules = _.union(config.module.rules, [
    {
      test: /\.css$/,
      use: [
        'style-loader',
        { loader: 'css-loader', options: { importLoaders: 1 } },
        {
          loader: 'postcss-loader',
          options: {
            plugins: [
              require('precss'),
              require('postcss-import'),
              require('postcss-preset-env')({
                  stage: 1,
              }),
              require('postcss-nested'),
              require('autoprefixer')
            ],
            sourceMap: true,
          }
        }
      ]
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    },
    {
      test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      loader: 'url-loader?limit=100000'
    }
  ])

  config.plugins = _.union(config.plugins, [
    new webpack.WatchIgnorePlugin([path.join(__dirname, 'node_modules')])
  ])
}

module.exports = config

process.on('SIGINT', function () {
  console.log('got SIGINT, exiting')
  process.exit()
})
