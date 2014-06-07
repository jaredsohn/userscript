// ==UserScript==
// @name           Panorama killer
// @namespace      smesko.com
// @include        http://www.finance.si/*
// ==/UserScript==

var a = document.getElementById('siteHeader');
a.parentNode.removeChild(a);

var arr = document.getElementsByTagName("div");
for (i = 0; i < arr.length; i++) {
   if (arr[i].className == "siteContentPad glued") {
	a = arr[i];
	a.parentNode.removeChild(a);
	break;
   }
}