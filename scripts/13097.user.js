// ==UserScript==
// @name        Grey Reddit Links
// @namespace   http://programmingkungfuqi.blogspot.com/
// @description Turn the links on Reddit from blue to gray
// @creator     Jt Gleaon |jt<at>entropyfails<dot>com|
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
lcolor = "#111111";

(function() {
// Un-logged in User
GM_addStyle(".title:visited {color: " + vcolor + " !important}");
GM_addStyle(".title {color: " + lcolor + " !important}");

// Logged in User
GM_addStyle(".title.loggedin {color: " + lcolor + " !important}");
GM_addStyle(".title.loggedin:visited {color: " + vcolor + " !important}");
})();