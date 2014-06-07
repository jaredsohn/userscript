// Mirrored by DuggMirror
// version 1.0
// 2006-05-28
// Copyright (c) 2006, Sam Kellett
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
// select "mirrored by DuggMirror", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          mirrored by DuggMirror
// @namespace     http://cannedlaughter.net/2006/05/28/duggmirror-greasemonkey-script/
// @description   Adds a link to DuggMirror on every digg news item.
// @include       http://digg.com/*
// @include       http://www.digg.com/*
// ==/UserScript==

var diggs = document.getElementsByTagName('div');
for (i = 0; i < diggs.length; i++) {
	if (diggs[i].className == 'news-details') {
		url = diggs[i].getElementsByTagName('a')[0].href;
		url = url.split("/");
		var a = document.createElement('a');
		a.href = "http://duggmirror.com/" + url[3] + "/" + url[4];
		a.innerHTML = "DuggMirror";
		a.className = "tool";
		a.target = "_blank";
		diggs[i].insertBefore(a, diggs[i].getElementsByTagName('span')[0].nextSibling);
	}
}
