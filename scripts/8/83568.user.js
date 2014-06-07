// ==UserScript==
// @name           Digg iframe remover
// @namespace      http://userscripts.org/scripts/show/83568
// @description    Removes the iframe on digg.com
// @version        0.02
// @include        http://*.digg.com/*
// @include        http://new.digg.com/*
// @include        http://www.digg.com/*
// @include        http://digg.com/*
// ==/UserScript==

var nav = document.getElementById("ad-uprrail1");
if (nav) {
	nav.parentNode.removeChild(nav);
}
