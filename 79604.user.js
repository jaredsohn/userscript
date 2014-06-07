// ==UserScript==
// @name           AIM Surplus - All Images One Page
// @namespace      http://jobson.us/
// @description    Shows all preview images instead of thumbnails.
// @include        http://www.aimsurplus.com/*
// ==/UserScript==

var d = document;
var mb = d.getElementById('mainBox2');

if (!mb) return;

var path = 'https://www.aimsurplus.com/EOS/images/product/';

var img = [];
var inp = mb.getElementsByTagName('input');

if (inp.length==0) return;

for (var k=0;k<inp.length;k++) {
	img.push(path + inp[k].getAttribute('src').match(/=(.+)/)[1]);
}

while (mb.childNodes.length>0) mb.removeChild(mb.childNodes[0]);

for (var i=0;i<img.length;i++) {
	var im = mb.appendChild(d.createElement('img'));
		im.setAttribute('src',img[i]);
}
