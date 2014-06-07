// ==UserScript==
// @name           Newegg Title
// @namespace      jnadeau.com
// @description    Fix Newegg's title order to make sense.
// @include        http://*.newegg.com/*
// @include        http://newegg.com/*
// ==/UserScript==

var rep = "Newegg.com - ";

if(document.title.substr(0, rep.length) == rep){
	document.title = document.title.substr(rep.length) + " - Newegg";
}