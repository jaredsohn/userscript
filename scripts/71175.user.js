// ==UserScript==
// @name           Ucoz AntiHide
// @namespace      http://userscripts.org/users/130822
// @description    Shows hide on sites uCoz
// @include        http://*
// ==/UserScript==

spans = document.getElementsByTagName("span");
for ( i = 0; i < spans.length; i++ ){
	if (spans[i].className == "UhideBlock")   spans[i].style.display = "inline"
	if (spans[i].className == "UhideBlockL")  spans[i].style.display = "none"
}