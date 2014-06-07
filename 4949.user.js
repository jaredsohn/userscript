// ==UserScript==// @name           Haokets (http://www.haokets.org) Fix Width of Article Column// @namespace      http://www.haokets.org/fix// @description    Fixes the width of the column where articles are displayed, when it (sometimes) gets too wide. For Haokets's main page (http://www.haokets.org).// @include        http://www.haokets.org/*// ==/UserScript==
var thisElement = document.getElementById("ArticlesList");
if (thisElement) {
	thisElement.style.width = "586px";
}
