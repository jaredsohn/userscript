// ==UserScript==
// @name          ZapYahooSponsoredLinks
// @include       http://*.yahoo.com/*
// ==/UserScript==
//

var	div

div	= document.getElementById ('ygrp-sponsored-links');

if (div) {
	div.style.display = "none";
}
