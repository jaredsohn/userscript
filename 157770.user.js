// ==UserScript==
// @name        页面链接清除
// @namespace   页面链接清除
// @include     http://wiki-zh.bitcomet.com/*
// @version     1
// ==/UserScript==
clear();
function clear(){
	tags = document.getElementsByTagName("a");
	for(var i=0;i<tags.length;i++){
		var onclickvalue=tags[i].outerHTML;
		tags[i].outerHTML=tags[i].innerHTML;
	}
	tags = document.getElementsByTagName("a");
	if(tags.length>0){clear();}
}