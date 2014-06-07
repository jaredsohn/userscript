// ==UserScript==
// @name        anti-namefag (reddit edition)
// @namespace   reddit
// @description Forum anonymizer for reddit
// @include     http://www.reddit.com/*
// @version     0.01
// @grant       none
// ==/UserScript==
var i,a;
a = document.getElementsByTagName('a');
for(i=0;i<a.length;i++) {
	if(a[i].className.indexOf('author')==0) {
		a[i].innerHTML = '';
	}
}
