// ==UserScript==
// @name           banniNation.com - Don't resize me bro!
// @namespace      notme
// @include        http://www.bannination.com/comments/*
// ==/UserScript==


var img = document.getElementsByTagName('img');

for (i = 0 ; i < img.length ; i++ ) {
	img[i].removeAttribute('height');
	img[i].removeAttribute('width');
}
