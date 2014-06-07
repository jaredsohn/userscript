// ==UserScript==
// @name        torrentkitty磁力链补丁
// @description 磁力链只保留hash部分
// @namespace		http://userscripts.org/scripts/show/177393
// @updateURL		https://userscripts.org/scripts/source/177393.meta.js
// @downloadURL		https://userscripts.org/scripts/source/177393.user.js
// @include     http://*.torrentkitty.com/*
// @version     2013.9.8
// ==/UserScript==

var all_elem = document.getElementsByTagName("a");//返回一个元素数组
	for(var i=0; i<all_elem.length; i++) { // 因为all_elem是一个数组,索引从0开始,所以遍历次数要比元素总数小1
	if(all_elem[i].href.indexOf("magnet:") == 0) {
		all_elem[i].href=all_elem[i].href.split("&dn=")[0]
	}
}