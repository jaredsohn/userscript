// ==UserScript==
// @name        Ent Links on Reddit
// @namespace   
// @description Visited links turn gray, and new links are green.
// @creator     JPizzle
// @include     http://reddit.com
// @include     http://*.reddit.com
// @include     http://reddit.com/
// @include     http://*.reddit.com/
// @include     http://reddit.com/*
// @include     http://*.reddit.com/*
// ==/UserScript==

// The Default Colors
// The V stands for "Visited Link"
vcolor = "#777777";
// The L stand for "Link"
lcolor = "#2EB800";

(function() {
// Un-logged in User
GM_addStyle(".title:visited {color: " + vcolor + " !important}");
GM_addStyle(".title {color: " + lcolor + " !important}");

// Logged in User
GM_addStyle(".title.loggedin {color: " + lcolor + " !important}");
GM_addStyle(".title.loggedin:visited {color: " + vcolor + " !important}");
})();