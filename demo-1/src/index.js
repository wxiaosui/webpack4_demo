import './css/style.css'; 
require("expose-loader?$!jquery");

$(function () {
	console.log("123")
	$(".index").html("index")

	
})

if (module.hot) {
    // 实现热更新
    module.hot.accept();
}