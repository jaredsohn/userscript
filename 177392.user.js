// ==UserScript==
// @name        清除东莞电信劫持
// @description 清除东莞电信HTTP框架劫持，无法确定是否支持其他地方。
// @namespace		http://userscripts.org/scripts/show/177392
// @updateURL		https://userscripts.org/scripts/source/177392.meta.js
// @downloadURL		https://userscripts.org/scripts/source/177392.user.js
// @include     http://*
// @version     2013.9.8
// ==/UserScript==

if ( typeof(old_url)!="undefined" && typeof(param)!="undefined" && typeof(content)!="undefined") {
	//alert('电信狗日的弹窗又来了')
	location.href = old_url.split("?")[0];
	//prompt("电信狗日的弹窗又来了",content) //弹出信息框告知弹窗网址便于复制
}