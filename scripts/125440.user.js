// ==UserScript==
// @name           golemClean
// @namespace      my.own
// @include        http://*.golem.de/*
// ==/UserScript==

var ar = document.getElementsByTagName("DIV");
var grand = document.getElementById('grandwrapper');
remove(ar);
grand.style.width = '960px';

function remove(objElem) {
for (var i = 0; i < objElem.length; i++) {
	if (objElem[i].id == "bannerTopWrapper") {
		var p = objElem[i].parentNode;
		p.removeChild(objElem[i]);
	}
}
}