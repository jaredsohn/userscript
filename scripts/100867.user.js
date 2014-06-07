// ==UserScript==
// @name           ClearPage4Sosg
// @namespace      tag:shinxjl@gmail.com,2001-03-08:Sosg
// @description    ClearPage4Sosg
// @include        http://www.sosg.net/*
// ==/UserScript==

// -------- remove image block---
var imgblock = document.getElementById("cate_thread");
if (imgblock) {
	imgblock.parentNode.removeChild(imgblock);
}
// ------- remove footer block
var bodyObj = document.getElementsByTagName('body')[0];
var arr = bodyObj.childNodes;
var j = 0;
for (var i = 0; i < arr.length; i++) {
	var tab = arr[i];
	if (tab.tagName) {
		if (tab.tagName == 'TABLE') {
			if (j > 0) {
				bodyObj.removeChild(tab);
			}
			j++;
		}
	}
}