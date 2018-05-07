const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {

  // entry: './src/index.js',

  //多文件入口，对象形式，不合并
  entry: {
    index: './src/index.js',
    admin: './src/main.js'
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    // publicPath: path.resolve('dist')
  },

  module:{
  	rules:[
  		{
  			test: /\.css$/,
  			// use: ['style-loader', 'css-loader']
  			use: ExtractTextWebpackPlugin.extract({
  				use: 'css-loader'
  			})
  		},
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              outputPath: 'images/' 
            }
          }
        ]
      },
      {
        test: require.resolve('jquery'),
        use: [
          {
            loader: 'expose-loader',
            options: 'jQuery'
          },{
            loader: 'expose-loader',
            options: '$'
          }
        ]
      }
  	]
  },

  devServer: {
  	contentBase: path.join(__dirname, "dist"),
  	compress: true,
  	port: 8080,
    hot: true,
    open: true,
	},

  plugins: [

  	new HtmlWebpackPlugin({
  		template: './src/index.html',
      filename: 'index.html',
      hash: true, 
      chunks: ['jq','index']
    }),

    new HtmlWebpackPlugin({
      template: './src/admin.html',
      filename: 'admin.html',
      hash: true, 
      chunks: ['jq','admin']
    }),

    new CleanWebpackPlugin('dist'),
    new ExtractTextWebpackPlugin('css/style.css'),
    new webpack.HotModuleReplacementPlugin()
  ],

  mode: 'development'
};