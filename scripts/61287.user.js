// ==UserScript==
// @name           PythonWall
// @namespace      http://userscripts.org/users/105016
// @description    绕过关键字，让你顺利下载 Python。
// @include        http://www.python.org/*
// ==/UserScript==

/*******************************************************\
* 
* 众所周知，http://www.python.org//download/ 【连接被重置】了。
* 但由于这只是精确的匹配，注定会被模糊的办法绕过。
* 于是便有了这个么一个脚本。
* 原理很傻，自己看代码。
* 
\*******************************************************/

var a = document.getElementsByTagName('a');

for(i in a){
	a[i].href = a[i].href.replace(/org\/download/i,function(){
		a[i].style.border = '#f00 1px dashed';
		a[i].style.display = 'inline-block';
		return 'org//download';
	});
}
