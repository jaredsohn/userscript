// ==UserScript==
// @name           pixiv_flip
// @namespace      pixiv_flip
// @description    pixiv_flip
// @include        http://www.pixiv.net/*
// ==/UserScript==

(function(){
	document.addEventListener("DOMContentLoaded", function() {	
		GM_addStyle([
		  "div.works_display{-moz-transform: matrix(-1, 0, 0, 1, 0, 0);}",
		].join(''));
	}, false);
})()





