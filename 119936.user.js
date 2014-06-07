// ==UserScript==
// @name           G+ shared post sane
// @namespace      http://myfairland.net/
// @description    Google Plus shared post with a image now sucks. This script makes it sane. 现在 G+ 分享带图片的文章，显示效果很奇葩，这个脚本让它正常点。
// @include        https://plus.google.com/*
// ==/UserScript==

(function(){
	
	var head = document.getElementsByTagName('head')[0],
	    style = document.createElement('style'),
	    rules = document.createTextNode('#contentPane .s-r-Ge-ec {display:block}');
	
	style.type = 'text/css';
	if(style.styleSheet)
	    style.styleSheet.cssText = rules.nodeValue;
	else style.appendChild(rules);
	head.appendChild(style);
	
})();