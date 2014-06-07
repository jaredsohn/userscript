// BANNED!
// version 1.4
// Changes:
// Sigh... I accidentaly had != instead of == when its checking if an avatar is a Halo 3 Charactor model...
// c r e a t e d   b y   the eNeME
// 10-30-2008
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "BANNED!", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          BANNED!
// @namespace     http://www.bungie.net/Forums/posts.aspx?postID=27428424
// @description   Adds an extra bit of weight to the end of the banhammer.
// @include       http://*bungie.net/*
// ==/UserScript==

var spans = new Array();
spans = document.getElementsByTagName('span');

for (var i = 0; i < spans.length; i++)
	if (spans[i].id == "ctl00_mainContent_postRepeater1_ctl01_ctl00_postControl_skin_BlacklistedTextLabel")
		changeAvatar();

function changeAvatar() {
	for (var i = 2; i < document.images.length; i++)
		if (isAvatar(document.images[i])) {
			document.images[i].src="http://i189.photobucket.com/albums/z24/predator5791/BANNED.jpg";
			break;
		}
}

function isAvatar(A) {
	var loc = A.src;
	var parts = new Array();
	parts = loc.split('/');
	var screen = parts[5];
	if ((parts[6] == "avatars" || parts[3] == "Stats") || parts[4] == "Halo3")
		return true;
	return false;
}

//
// o hai
// wat r u doin in hear
// r u messin with mai script
//
