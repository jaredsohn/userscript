// ==UserScript==
// @name           TeaSharkWall
// @namespace      http://userscripts.org/users/105016
// @description    绕过关键字，让你顺利下载 TeaSharkWall 浏览器 ！
// @include        http://www.teashark.com/*
// ==/UserScript==

var a = document.getElementsByTagName('a');

for(i in a){
	a[i].href = a[i].href.replace(/\.com\/+download/i,function(){
		a[i].style.border = '#f00 1px dashed';
		a[i].style.display = 'inline-block';
		return '.com//download';
	});
}
