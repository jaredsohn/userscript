// ==UserScript==
// @name        知乎使用体验优化(zhihu)
// @description 暂时有自动展开被未完全显示的评论内容（需要点击显示全部的条目）
// @namespace		知乎使用体验优化(zhihu)
// @include     http://*zhihu.com/*
// @updateURL		https://userscripts.org/scripts/source/186406.meta.js
// @downloadURL		https://userscripts.org/scripts/source/186406.user.js
// @version     2013.12.19
// ==/UserScript==

var all_elem = document.getElementsByTagName("div");//返回一个元素数组
	for(var i=0; i<all_elem.length; i++) { // 因为all_elem是一个数组,索引从0开始,所以遍历次数要比元素总数小1
	if(all_elem[i].className.indexOf("fixed-summary") != -1) {
		all_elem[i].className=all_elem[i].className.replace("fixed-summary","");
	}
}