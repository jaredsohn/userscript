// ==UserScript==
// @name          hi-pda签名档高度扩展
// @namespace     
// @grant		  none
// @description   扩展hi-pda的签名档高度
// @include       http://www.hi-pda.com/forum/*
// @version	1.0
// ==/UserScript==

var signatures = document.getElementsByClassName("signatures");
for (i in signatures) {
	signatures[i].style.maxHeight = "";
}
