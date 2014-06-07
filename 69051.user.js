// ==UserScript==
// @name          Facebook Script
// @description   Make any script work on Facebook
// @require       http://gmconfig.googlecode.com/svn/trunk/fb_gm_frame.js
// @include       http://*.facebook.com/*
// ==/UserScript==

function fbPageChanged() {
     if (GM_testUrl(['http://*.facebook.com/home.php*'])) {
		// All your code goes here
     }
}