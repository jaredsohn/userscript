// ==UserScript==
// @name			Turbofilm invite count remover
// @namespace		http://userscripts.org/scripts/show/97769
// @description		Removes invite counter from page header. Homepage: http://userscripts.org/scripts/show/97769
// @include			https://turbik.tv/*
// @include			https://turbik.com/*
// @include			https://turbik.net/*
// @version			0.1.1
// ==/UserScript==

var spanList = document.getElementsByTagName("span");
//var done = false;
for (var i = 0; i < spanList.length; i++) {
	var elem = spanList.item(i);
	var cl = elem.getAttribute("class");
	
	if (cl == "invcount") {
		elem.setAttribute('style', 'display: none;');
		break;
	}
}