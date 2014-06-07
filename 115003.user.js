// ==UserScript==
// @name          Enogenmod(CHERRYSLUSH2)
// @description   Make any script work on Facebook
// @require       http://userscripts.org/scripts/source/84596.user.js?
// @include       http://*.facebook.com/*
// ==/UserScript==

function fbPageChanged() {
     if (GM_testUrl(['http://*www.facebook.com/home.php*'])) {
		// All your code goes here
     }
}