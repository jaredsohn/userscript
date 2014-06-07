// ==UserScript==
// @name           delQDLimit
// @namespace      perzer@163.com
// @include        http://www.qidian.com/BookReader/*.aspx
// @include	   http://vipreader.qidian.com/BookReader/*.aspx
// @include	   http://vipreader.qidian.com/BookReader/Tips/*
// @include http://read.qidian.com/BookReader/*.aspx
// @version 1.1
// ==/UserScript==

//显示右键菜单
window.document.oncontextmenu = function(){ return true;}
//去除不能选中
if (document.all) {
	document.onselectstart = true;
} else {
	document.onselectstart = function() {return true};
}
window.onload = function() {
	if ($("bigcontbox")) {
			document.getElementById('bigcontbox').onmousedown = true;
	}
	if ($('form1')) {
		$('form1').oncontextmenu = function() { return true; };
		document.getElementById('form1').onmousedown = true;
	}
	//ff 屏蔽不能选中
	document.body.style.MozUserSelect = "text";
}