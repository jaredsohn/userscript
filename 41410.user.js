// ==UserScript==
// @name           LROC Image Resizer
// @namespace      http://www.lroc.be
// @include        http://www.lroc.be/lrf/
// ==/UserScript==

var images = document.getElementsByTagName('img');
var width = window.innerWidth * 0.85;

for(var i = 0; i != images.length; i++)
	if(images[i].width > width)
		images[i].width = width;
