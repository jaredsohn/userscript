/*	Secure Gmail GreaseMonkey Script
	Copyright 2005 Mark Wubben
	See also: <http://novemberborn.net/greasemonkey/secure-gmail>
	
	This software is licensed under the CC-GNU LGPL <http://creativecommons.org/licenses/LGPL/2.1/>
*/

// ==UserScript==
// @name          Secure Gmail
// @namespace     http://novemberborn.net/greasemonkey
// @description	  Makes sure Gmail uses a secure connection.
// @include       http://gmail.google.com*
// @include       http://mail.google.com*
// ==/UserScript==

// Working the magic:
window.location.replace(window.location.href.replace(/^http\:(.+)/, "https:$1"));