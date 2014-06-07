// ==UserScript==
// @name           OperaMiniWall
// @namespace      http://userscripts.org/users/105016
// @author         darasion
// @include        http://www.opera.com/*
// ==/UserScript==

/*******************************************************\
* 
* 众所周知，http://www.opera.com//mini 【连接被重置】了。
* 但由于这只是精确的匹配，注定会被模糊的办法绕过。
* 于是便有了这个么一个脚本。
* 原理很傻，自己看代码。
* 
\*******************************************************/

var a = document.getElementsByTagName('a');

for(i in a){
	a[i].href = a[i].href.replace(/(china)?\.com\/mini/i,function(){
		a[i].style.border = '#f00 1px dashed';
		a[i].style.display = 'inline-block';
		return '.com//mini';
	});
}
