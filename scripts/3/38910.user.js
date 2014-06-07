// ==UserScript==
// @name           IGN Interstitial Skip
// @namespace      http://www.bobnivek.com
// @description    Skips the IGN interstitial page
// @include        http://*.ign.com/*
// ==/UserScript==


if(unsafeWindow.goBackToReferer)
	document.location.reload(true);
