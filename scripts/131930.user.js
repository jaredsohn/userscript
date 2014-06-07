// ==UserScript==
// @name          Facebook Script
// @description   Make any script work on Facebook
// @require       http://userscripts.org/scripts/source/84596.user.js?
// @include       http://*.facebook.com/*
// ==/UserScript==

function fbPageChanged() {
     if (GM_testUrl(['http://*.facebook.com/home.php*'])) {
		// All your code goes here
     }
}