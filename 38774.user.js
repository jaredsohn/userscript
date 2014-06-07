// ==UserScript==
// @name no-name
// @namespace     http://userstyles.org
// @include       http://*.diary.ru/*
// ==/UserScript==

var css = ".authorName strong {visibility: hidden;} .authorName {background: url('http://static.diary.ru/userdir/9/3/1/2/93120/35744924.gif') 27px 3px no-repeat;}"+
 ".avatar img {visibility: hidden; width: 100px; height: 100px;} "+
 ".avatar {background: url('http://static.diary.ru/userdir/9/3/1/2/93120/30099031.gif') 10px 0px no-repeat;}";

if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
;

