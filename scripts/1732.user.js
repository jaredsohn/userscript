/*	Secure-em-All - CalcMan [at] gmail [dot] c o m

	Decided to merge the Secure Connection switching code into a single script
	since there really isn't a reason to have a separate one for each site.

	Feel free to add other site to the @include list that should be automatically changed.

	-original code taken from Mark-
	
	This software is licensed under the CC-GNU LGPL <http://creativecommons.org/licenses/LGPL/2.1/>
*/

// ==UserScript==
// @name          Secure-em-All
// @namespace     http://userscripts.org
// @description   Secure the Connection on: Excite, Yahoo, Gmail, Microsoft Passport. (Add any site to the Included pages list for it to be automatically switch to secure mode as well)
// @include       http://registration.excite.com/*
// @include       http://login.yahoo.com/*
// @include       http://gmail.google.com*
// @include       http://mail.google.com*
// @include       http://login.passport.net/uilogin.srf*
// ==/UserScript==

// Working the magic:

window.location.replace(window.location.href.replace(/^http\:(.+)/, "https:$1"));
