// ==UserScript==
// @name           4chan Image Opener
// @namespace      http://userscripts.org/users/129044
// @description    Opens images
// @include        http*://boards.4chan.org/*/res/*
// ==/UserScript==
function openImg(){
var bla = document.getElementsByTagName("img");
for ( var i = 0; i < bla.length; i++) {
	if (bla[i].src.indexOf("thumbs.4chan.org") > 0) {
		bla[i].removeAttribute("style");
        	bla[i].removeAttribute("width");
        	bla[i].removeAttribute("height");
        	bla[i].src = bla[i].parentNode.href;
	}
}
}
GM_registerMenuCommand("4chan images opener", openImg);