// ==UserScript==
// @name          Cheggit Extra Re-titler
// @namespace     http://nipsden.blogspot.com
// @description   Changes Cheggit's page titles to something more meaningful of whats in them
// @include       http://cheggit.net/forums.php
// @include       http://cheggit.net/browsetorrents.php
// @include       http://cheggit.net/tags.php
// @include       http://cheggit.net/myprofile.php
// @include       http://cheggit.net/browseusers.php
// @include       http://cheggit.net/users.php?*
// ==/UserScript==

var t;
if (window.location.href.match(/forums\.php/)) {
	t="Forums ";
}
else if (window.location.href.match(/browsetorrents\.php/)) {
	t="Torrent list ";
}
else if (window.location.href.match(/tags\.php/)) {
	t="Tag Cloud ";
}
else if (window.location.href.match(/myprofile\.php/)) {
	t="My Profile ";
}
else if (window.location.href.match(/browseusers\.php/)) {
	t="User list ";
}
else { // User profile
	// XXX: Likely to broke on redesign
	t=document.getElementsByTagName('P')[0].innerHTML+"'s profile ";
}

document.title = t + "on " + document.title;
