//=================TEMPLATE BELOW===================//

// ==UserScript==
// @name			speaktoebay
// @namespace		#earlyster
// @description		Adds the speech icon in Chrome only

// @include			http://*.ebay.com/*
// @include			http://shop.ebay.com/*
// @version			0.0.3
// ==/UserScript==

document.getElementById("_nkw").setAttribute("x-webkit-speech", null);
document.getElementById("_nkw_id").setAttribute("x-webkit-speech", null);
