// ==UserScript==
// @name           Facebook Auto-Login
// @namespace      Facebook
// @include        http://www.facebook.com/
// @include        http://www.facebook.com/index.php*
// ==/UserScript==

// This script redirects you to login directly to mafia wars
// Now install Facebook Auto-Login 2!

window.addEventListener("load",function() {
	window.location = 'http://apps.facebook.com/inthemafia/index.php'
},true)