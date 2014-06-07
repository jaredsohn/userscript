// ==UserScript==
// @name           Din Side - Hide ads
// @namespace      http://userscripts.org/users/110690
// @description    Hide QXL and "Ledige stillinger" ads on dinside.no
// @include        http://www.dinside.no/*/*
// ==/UserScript==
var allHTMLTags = new Array();
var allHTMLTags=document.getElementsByTagName("*");
for (i=0; i<allHTMLTags.length; i++) {
	if (allHTMLTags[i].className=='adSpace qxlSpace') {
		allHTMLTags[i].style.display='none';
	}
}