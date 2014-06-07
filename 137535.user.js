// ==UserScript==
// @name        OSS，linux设备驱动第三版 重排版
// @namespace   oss
// @description 对oss 网站上面的 开源书籍 LINUX 设备驱动 第三版重新进行排版
// @include     http://oss.org.cn/kernel-book/ldd3/ch*.html
// @version     1
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js	
// ==/UserScript==
//

(function(){
	function addJquery(callback){
		var script = document.createElement('script');
		script.setAttribute('src','http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js');
		script.setAttribute('type','text/javascript');
		script.addEventListener('load',function(){
			var script = document.createElement('script');
			script.textContent = '('+callback.toString()+')()';
			document.body.appendChild(script);
		},false);
	}
	
	function main() {
		console.log('test');
		if($('.chapter').length){

			$('.chapter').width('70%')
				.css('marginLeft','auto')
				.css('marginRight','auto');
		}
		else {
			$('.sect1').width('70%')
				.css('marginLeft','auto')
				.css('marginRight','auto');
		}
	}

	typeof jQuery != 'undefined'? main() : addJquery(main);
})()


