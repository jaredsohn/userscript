// ==UserScript==
// @name           Secure GMX
// @namespace      http://twoday.tuwien.ac.at/pub/
// @include        https://www.gmx.at/*
// @include        https://www.gmx.de/*
// @include        http://www.gmx.at/*
// @include        http://www.gmx.de/*
// @include        http://service.gmx.net/*
// @include        https://service.gmx.net/*
// ==/UserScript==

var unsafe = /^http:\/\/([\w\.]*\.)?gmx\.(at|de|net)\//;

for each (a in document.getElementsByTagName('a')) {
	var m = a.href.match(unsafe);
	if (m) {
		a.href = "https" + a.href.substring(4);
	}
}

for each (form in document.getElementsByTagName('form')) {
	var m = form.action.match(unsafe);

	if (m) {
		form.action.href = "https" + form.action.href.substring(4);
	}
}