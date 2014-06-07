// ==UserScript==
// @name Background Change
// @namespace http://userscripts.org/scripts/show/408006
// @description Change the background colour of a page
// @include        htt*://addmefast.com/*
// @include        htt*://*.addmefast.com/*
// ==/UserScript== 


var elmDeleted = document.getElementById("header-top");
	elmDeleted.parentNode.removeChild(elmDeleted);