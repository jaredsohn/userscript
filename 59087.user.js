// ==UserScript==
// @name          LUElinks --> End of the Internet
// @description   Turns old LL links into ETI links
// @namespace	 By Kalphak
// @include http://*luelinks.net*
// @include https://*luelinks.net*
// ==/UserScript==
// Version 1

// Uh yeah...
var where = document.getElementsByTagName("a");
window.location=where[0];