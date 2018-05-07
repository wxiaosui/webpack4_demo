# 简单配置
* 基本架构，所用配置项与功能，原理，一些知识点记录

## 安装  
>    npm
## 配置执行文件
    
*	package.json
```javascript
	"script":{
		"bnuild": "webpack",  //打包 
		"dev": "webpack-dev-server"  //开发环境下放到内存中
	}
```
## 多入口文件
	1、写成数组的方式就可以打出多入口文件，不过这里打包后的文件都合成了一个
	2、真正实现多入口和多出口需要写成对象的方式
```javascript
		entry:{
			index: '../../',
			main: '../../'
		}
```

*	output: 出口名会和文件名一一对应

## 配置Html模板
>	npm i html-webpack-plugin -D
```javascript
	new HtmlWebpackPlugin({
            template: './src/index.html',   //模板地址
            hash: true, // 会在打包好的bundle.js后面加上hash串
    })
```
## 多页面开发
*		必须指定chunks
```javascript
		new HtmlWebpackPlugin({
            template: './src/index.html',   
            filename: 'index.html',
            chunks: ['index']   // 对应关系,index.js对应的是index.html
        }),
        new HtmlWebpackPlugin({
            template: './src/login.html',
            filename: 'login.html',
            chunks: ['login']   // 对应关系,login.js对应的是login.html
        })
```
## 引用CSS文件
>	npm i style-loader css-loader -D 
	npm i less less-loader -D

*	index.js   //入口js引入css
```javascript
	import './css/style.css';
```
* webpack.config.js
```javascript
	module: {
        rules: [
            {
                test: /\.css$/,     // 解析css
                use: ['style-loader', 'css-loader'] // 从右向左解析
                /* 
                    也可以这样写，这种方式方便写一些配置参数
                    use: [
                        {loader: 'style-loader'},
                        {loader: 'css-loader'}
                    ]
                */
            }
        ]
    }
```
*    拆分CSS


>	npm i extract-text-webpack-plugin@next -D

*   @next表示可以支持webpack4版本的插件
```javascript
	let HtmlWebpackPlugin = require('html-webpack-plugin');
	// 拆分css样式的插件
	let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

	module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextWebpackPlugin.extract({
                    // 将css用link的方式引入就不再需要style-loader了
                    use: 'css-loader'       
                })
            }
        ]
    },

    **拆分后会把css文件放到dist目录下的css/style.css
    plugins: [
        new ExtractTextWebpackPlugin('css/style.css')  
    ]
```

>    mini-css-extract-plugin
    npm i mini-css-extract-plugin -D
```javascript
    let MiniCssExtractPlugin = require('mini-css-extract-plugin');

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },
    
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/a.css'
        })
    ]

    //区别 拆分成多个css //extract-text-webpack-plugin支持了拆分成多个css

    // 正常写入的less
	let styleLess = new ExtractTextWebpackPlugin('css/style.css');
	// reset
	let resetCss = new ExtractTextWebpackPlugin('css/reset.css');

	module.exports = {
	    module: {
	        rules: [
	            {
	                test: /\.css$/,
	                use: resetCss.extract({
	                    use: 'css-loader'
	                })
	            },
	            {
	                test: /\.less$/,
	                use: styleLess.extract({
	                    use: 'css-loader'
	                })
	            }
	        ]
	    },
	    plugins: [
	        styleLess,
	        resetCss
	    ]
	}
```

## 引入图片

>	npm i file-loader url-loader -D
```javascript
	module: {
        rules: [
            {
                test: /\.(jpe?g|png|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            //小于8k的图片自动转成base64格式，并且不会存在实体图片
                            limit: 8192, 
                            // 图片打包后存放的目录
                            outputPath: 'images/'
                        }
                    }
                ]
            }
        ]
    }
```
## 页面img引用图片

>    npm i html-withimg-loader -D
```javascript
    module: {
        rules: [
            {
                test: /\.(htm|html)$/,
                use: 'html-withimg-loader'
            }
        ]
    }

    ##引用字体图片和svg图片

    module: {
        rules: [
            {
                test: /\.(eot|ttf|woff|svg)$/,
                use: 'file-loader'
            }
        ]
    }
```
## 添加CSS3前缀

>    npm i postcss-loader autoprefixer -D

*    创建postcss.config.js文件，配置：
```javascript
    module.exports = {
	    plugins: [require('autoprefixer')]  // 引用该插件即可了
	}

	webpack.config.js下

	module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            }
        ]
    }
```
## 转义ES6

>    npm i babel-core babel-loader babel-preset-env babel-preset-stage-0 -D

*    创建 .babelrc文件，配置：
```javascript
    {
	    "presets": ["env", "stage-0"]   // 从右向左解析
	}

	webpack.config.js下

	module: {
        rules: [
            {
                test:/\.js$/,
                use: 'babel-loader',
                include: /src/,          // 只转化src目录下的js
                exclude: /node_modules/  // 排除掉node_modules，优化打包速度
            }
        ]
    }
```
## 打包前清空

>    npm i clean-webpack-plugin -D

*   webpack.config.js下
```javascript
    let CleanWebpackPlugin = require('clean-webpack-plugin');

    module.exports = {
	    plugins: [
	        // 打包前先清空
	        new CleanWebpackPlugin('dist')  
	    ]
	}
```
##  启动静态服务器，配置热更新

*	webpack.config.js下
```javascript
	let webpack = require('webpack');

	module.exports = {

		plugins: [	        
	        new webpack.HotModuleReplacementPlugin() // 热替换，热替换不是刷新
	    ],

	    devServer: {
	        contentBase: './dist',
	        host: 'localhost',      // 默认是localhost
	        port: 3000,             // 端口
	        open: true,             // 自动打开浏览器
	        hot: true               // 开启热更新
	    }

	}
```
*	index.js下
```javascript
	// 实现热更新
	if (module.hot) {
	    module.hot.accept();
	}
```
## resolve解析
```javascript
	module.exports = {
	    resolve: {
	        // 别名
	        alias: {
	            $: './src/jquery.js'
	        },
	        // 省略后缀
	        extensions: ['.js', '.json', '.css']
	    },
	}

	###提取公共代码

	optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {   // 抽离第三方插件
                    test: /node_modules/,   // 指定是node_modules下的第三方包
                    chunks: 'initial',
                    name: 'vendor',  // 打包后的文件名，任意命名    
                    // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                    priority: 10    
                },
                utils: { // 抽离自己写的公共代码，utils这个名字可以随意起
                    chunks: 'initial',
                    name: 'utils',  // 任意命名
                    minSize: 0    // 只要超出0字节就生成一个新包
                }
            }
        }
    }
```
## 指定webpack配置文件

*    package.json
```javascript
    "script":{
    	"vue": "webpack --config webpack.config.vue.js"
    }
```
