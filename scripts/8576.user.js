//
// DuggBack
// v1.1 by Torsten (ivc)
// Adds links next to every Digg news items. Based on Sam Kellett and Bryan Martinez work.
//
// Mirrored by DuggMirror
// version 1.1 2007-01-01 - Copyright (c) 2006, Sam Kellett
// Edited for digg.com v3.0 by Bryan Martinez
// Released under the GPL license - http://www.gnu.org/copyleft/gpl.html
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
// @name          DuggBack
// @description   Puts a link to DuggBack next to every Digg news item.
// @include       http://digg.com/*
// @include       http://www.digg.com/*
// ==/UserScript==
//

var diggs = document.getElementsByTagName('div');
for (i = 0; i < diggs.length; i++) {
	if (diggs[i].className == 'news-details') {
		url = diggs[i].getElementsByTagName('a')[0].href;
		urlArr = url.split("/");
		var a = document.createElement('div');
		if (url.indexOf("/users/") == -1) {
			a.innerHTML = "<span class=\"tool\" style=\"margin-left: 5px\"><a href=\"http://www.duggback.com/" + urlArr[3] + "/" + urlArr[4] + "/\" target=\"_blank\">DuggBack</a></span>";
		} else {
			a.innerHTML = "<div class=\"tool\" style=\"font-size: 1.0em; margin-left: 20px; background: none\"><dt>DuggBack:</dt> <dd><a href=\"" + location.href.replace("digg.com/", "duggback.com/") + "/\" target=\"_blank\">More</a></dd></div>";
		}
		a.target = "_blank";
		diggs[i].insertBefore(a, diggs[i].getElementsByTagName('div')[0].nextSibling);
	}
}
