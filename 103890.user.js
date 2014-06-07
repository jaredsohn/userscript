// ==UserScript==
// @name           Last.fm Remove Adverts and Buy Links
// @namespace      http://userscripts.org/users/340270
// @description    Removes adverts and buy links from Last.fm
// @include        http://*.last.fm/*
// @include        https://*.last.fm/*
// ==/UserScript==
//
// HEAVILY borrowed from http://userscripts.org/scripts/show/74283
//
// Released under the GPL license
//
function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) {return}
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style)
}
addGlobalStyle('ul.lfmBuyDropDownBody, #footer_ads, #footerStuff {display: none !important}')