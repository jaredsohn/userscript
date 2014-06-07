// title: Bad Gateway
// version: 1.0
// created: 2006-01-09
// license: [url=GPL license]http://www.gnu.org/copyleft/gpl.html[/url]
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
//
// To easily customize, replace the following line to match your page title

var titlesearch="502 Bad Gateway"

//
// --------------------------------------------------------------------
//
//
//
// ==UserScript==
// @name          Bad Gateway
// @namespace     http://www.bobpaul.org/userScripts/
// @description   Some corporate firewalls return errors that Firefox doesn't understand. This script replaces the "502 Bad Gateway" error my company returns with a google "I'm feeling lucky" search like one would expect from Firefox.
// @include       *
// @exclude       
// ==/UserScript==




(
   function () {
	var thetitle=document.title;
	document.write(thetitle)
	
   )();