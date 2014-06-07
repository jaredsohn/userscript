// ==UserScript==
// @name		Konachan: Fix Pool Thumbnails
// @namespace	Zolxys
// @description	Fixes the slight cropping of thumbnails on the pool pages.
// @include	http://konachan.com/pool/show/*
// @include	http://konachan.net/pool/show/*
// @version	1.1
// ==/UserScript==
var a = document.getElementById('post-list-posts').getElementsByTagName('img');
for (var i = 0; i < a.length; i++) {
	var d = a[i].parentNode.parentNode;
	d.style.width='306px';
	var o = 19;
	if (a[i].className == 'preview') // In other words: Has no classes that add borders
		o = 13;
	d.style.height=Number(d.style.height.substring(0,d.style.height.length - 2)) + o + 'px';
}
