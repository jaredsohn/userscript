// ==UserScript==
// @name        软院地址修正
// @namespace   maoanran@gmail.com
// @include     http://www.ruanyuan.net/*
// @version     1
// ==/UserScript==

var a = document.getElementsByTagName('a');
for(var i = 0; i < a.length; i++) {
	a[i].href = a[i].href.replace(/http:\/\/ruanyuan\.net/, 'http:\/\/www\.ruanyuan\.net');
}

var img = document.getElementsByTagName('img');
for(var i = 0; i < img.length; i++) {
	img[i].src = img[i].src.replace(/http:\/\/ruanyuan\.net/, 'http:\/\/www\.ruanyuan\.net');
}