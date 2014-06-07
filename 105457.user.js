// ==UserScript==
// @name            SL Trib - Printer Friendly Redirect
// @namespace		http://userscripts.org/users/6623/scripts
// @version			1.0
// @description     Redirects to the printer-friendly version of SL Trib pages when one is detected.
//
// @include         http://sltrib.com/*
// @include         http://*.sltrib.com/*
// ==/UserScript==

var myRegexp = /(\d+)-(\d\d)/;
var match = myRegexp.exec(document.location.href);
if (match != null) {
	document.location.href ='http://www.sltrib.com/csp/cms/sites/sltrib/pages/printerfriendly.csp?id=' + match[1];
}