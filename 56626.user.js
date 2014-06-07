// ==UserScript==
// @name           Hide reddit usernames
// @namespace      http://userscripts.org/users/66015
// @description    Remove reddit usernames
// @include        http://*.reddit.com/*
// @include        http://reddit.com/*
// @exclude        http://*.reddit.com/user/*
// @exclude        http://reddit.com/user/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

var usernameToggle = function() {
   $("a.author").toggle();
}

// Hide usernames
$("a.author").hide();

// Add Greasemonkey menu item to allow users to turn usernames back on
GM_registerMenuCommand("Toggle usernames", usernameToggle);
