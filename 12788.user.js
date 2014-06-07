// ==UserScript==
// @name           changeBlogspotWidth
// @namespace      http://ktronline.com
// @include        http://*.blogspot.com/
// ==/UserScript==

function adjustWidths(){
	var outer=document.getElementById('outer-wrapper');
	var main=document.getElementById('main-wrapper');

	outer.style.width='950px';
	main.style.width='900px';
}

adjustWidths();