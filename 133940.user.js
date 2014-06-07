// ==UserScript==
// @name          Sonye Facebook
// @description   Sonye Facebook
// @include       http://*.facebook.com/*
// ==/UserScript==

function fbPageChanged() {
     if (GM_testUrl(['http://*.facebook.com/home.php*'])) {
		// All your code goes here
     }
}