import './css/style.css';
require("expose-loader?$!jquery");

$(function (argument) {
	$(".admin").html("admin")
})

if (module.hot) {
    // 实现热更新
    module.hot.accept();
}