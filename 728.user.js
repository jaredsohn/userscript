// ==UserScript==
// @name          Tooltips for Netflix Stars
// @namespace     http://home.nyc.rr.com/minck/userscripts/
// @description   Provides tooltips for Netflix' stars, e.g., "Click to rate the movie Really Liked It."
// @include       http://www.netflix.com/*
// @include       http://netflix.com/*
// ==/UserScript==

/** This script fixes the Tooltips for Netflix' Stars. Netflix wants to have tooltips that 
 ** display useful messages like "Click to rate the movie Hated It," but the tooltips do not 
 ** appear in Firefox at all. This script is a minor variation of ALT Tooltips. See 
 ** http://www.arantius.com/article/arantius/alt+tooltips+for+firefox/
 ** 
 ** This is a greasemonkey script, intended for use with the Firefox extension Greasemonkey.
 ** More info: http://greasemonkey.mozdev.org/
 **/

(function() {
var i=document.getElementsByTagName('area');
for (var j=0; j<i.length; j++) {
	if (i[j].title=='') i[j].title = i[j].alt;
}
})();