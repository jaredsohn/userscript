// ==UserScript==
// @name            Livestream Account Not Required
// @description     Removes the need to login to livestream to watch specific videos
// @version         0.1
// @author          little-vince
// @namespace       http://little-vince.tumblr.com/
// @source          http://userscripts.org/scripts/show/161535
// @identifier      http://userscripts.org/scripts/source/161535.user.js
// @include         *livestream.com/*
// ==/UserScript==

// Last edited 10 March 2013

/*

This copyright section and all credits in the script must be included in modifications or redistributions of this script.

Livestream Account Not Required is Copyright (c) 2013, little-vince
Livestream Account Not Required is licensed under a Creative Commons Attribution-Share Alike 3.0 Unported License
License information is available here: http://creativecommons.org/licenses/by-sa/3.0/

Livestream is a registered trademark of Livestream LLC.
Livestream Account Not Required is not related to or endorsed by Livestream LLC in any way.

*/

/*

Changelog:
0.1 (2013-03-10)
	[+] Initial release

*/

function addstyle() {
	var a=document.getElementsByTagName("head")[0].appendChild(document.createElement("style"));
	a.type="text/css";
	a.innerHTML="#fancybox-overlay,#fancybox-content{display:none !important}"
}
addstyle();