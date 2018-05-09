(function () {
    var hot = document.getElementsByClassName('hot')[0];
    var text = document.createTextNode("hello,worlder````");
    hot.appendChild(text);

    if (module.hot) {
		console.log('11111')
	}
})()