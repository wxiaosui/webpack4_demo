const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: /demo-1/
  },
  module:{
  	rules:[
  		{
  			test: /\.css$/,
  			use: ['style-loader', 'css-loader']
  			// use: ExtractTextWebpackPlugin.extract({
  			// 	use: 'css-loader'
  			// })
  		}
  	]
  },
  devServer: {
  	contentBase: path.join(__dirname, "dist"),
  	compress: true,
  	port: 8080
	}
  plugins: [
  	new HtmlWebpackPlugin({
  		template: './src/index.html',
    }),
    // new ExtractTextWebpackPlugin('css/style.css')
  ],
  mode: 'development'
};