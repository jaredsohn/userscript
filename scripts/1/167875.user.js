// ==UserScript==
// @name		Konachan/yande.re: Profile Page Show Duplicate Thumbnails
// @namespace	Zolxys
// @description	Disables the hiding of duplicate thumbnails on the user pages.
// @include	http://konachan.com/user/show/*
// @include	http://konachan.net/user/show/*
// @include	https://yande.re/user/show/*
// @version	1.1
// ==/UserScript==
var l = [];
var a = document.getElementsByTagName("li");
for (var i = 0; i < a.length; ++i)
  if (/^p\d+$/.test(a[i].id)) {
	var n = parseInt(a[i].id.substr(1));
	if (l.indexOf(n) == -1) {
		if (!/\bjavascript-hide\b/.test(a[i].className))
			l.push(n);
	}
	else
		a[i].className = a[i].className.replace(/\bjavascript-hide\b/g, '');
}
