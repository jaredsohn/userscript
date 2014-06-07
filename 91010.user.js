// ==UserScript==
// @name           E24 - Hide ads
// @namespace      http://userscripts.org/users/110690
// @description    Hide "Ledige stillinger" ads on e24.no 
// @include        http://e24.no
// @include        http://e24.no/*
// @include        http://e24.no/*/*
// @include        http://e24.no/*/*/*
// ==/UserScript==
var allHTMLTags = new Array();
var allHTMLTags=document.getElementsByTagName("*");
for (i=0; i<allHTMLTags.length; i++) {
	if (allHTMLTags[i].className=='sliderWide') {
		allHTMLTags[i].style.display='none';
	}
}