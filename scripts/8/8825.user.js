// Userscripts Back to Top User Script
// 2007-06-22
// Copyright (c) 2007, Tom Kropf
// http://userscripts.org/people/23412
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Userscripts Back to Top", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Userscripts Back to Top
// @namespace     http://swanky.de/greasemonkey/
// @description   Adds a 'Back to Top' link on Userscripts.org
// @source        http://userscripts.org/scripts/show/8825
// @include       http://userscripts.org*
// @exclude       http://userscripts.org/login
// @exclude       http://userscripts.org/people/*
// @exclude       http://userscripts.org/scripts/review/*?format=txt
// @exclude       http://userscripts.org/scripts/source/*
// @version       0.0.2
// ==/UserScript==

// Squirrels are your friends!

var top = document.createElement("div");
top.innerHTML = '<a name="top"></a>';
document.body.insertBefore(top, document.body.firstChild);

var pitas = document.createElement("div");
pitas.innerHTML = '<div id="pitas" style="margin:1em 0; width:70%; background:white; padding-top:0px; padding-right:25px; padding-bottom:0px; padding-left:25px; min-width:425px; font-family: Lucida Grande, Trebuchet MS, Arial, Helvetica, sans-serif; font-weight:normal; font-size:0.75em;" align="right"><a href="#top">Back to Top</a></div>';
document.getElementById('content').parentNode.appendChild(pitas);

// 0.0.1	Initial release.
// 0.0.2	Tweaked to reflect the recent changes to Userscripts.org.