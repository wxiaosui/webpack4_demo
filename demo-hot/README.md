* npm init -y
* npm install --save-dev webpack
* npm install --save-dev webpack-cli -D
* npm install --save-dev html-webpack-plugin
* npm install --save-dev claen-webpack-plugin
* npm install webpack-dev-server --save-dev
```javascript
devServer: {
    contentBase: './dist',
    hot: true
},
plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
        template: './index.html',
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
]
// main.js
if (module.hot) {
    module.hot.accept('./main.js', function() {
        console.log('Accepting the updated printMe module!');
        printMe();
    })
}
```

