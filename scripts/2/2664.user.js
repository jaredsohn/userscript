// ==UserScript==
// @namespace     http://www.splintor.com/userscript
// @name          Hide SitePoint Sponsor
// @description   Hide SitePoint Sponsor
// @include       http://*.sitepoint.com/*
// ==/UserScript==

var o = document.getElementById("blogads");
if(o)
	o.parentNode.style.display = "none";
