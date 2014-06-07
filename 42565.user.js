// Desktop Nexus Auto Enlarge Wallpaper
// version 0.1
// 2009-02-16
// Copyright (c) 2009, Seungwon Jeong
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Desktop Nexus Auto Enlarge Wallpaper
// @namespace      http://jeongsw.textcube.com/
// @description    Convert all link to */wallpaper/* into link to */get/*
// @include        http://*.desktopnexus.com/*
// @exclude        http://*.desktopnexus.com/get/*
// ==/UserScript==

(function () {
	var i;
	var links;

	links = document.links;

	for (i = 0; i < links.length; ++i) {
		links[i].href =
			links[i].href.replace(
					/^(.*desktopnexus.com)\/wallpaper\/(\d+)\/$/i,
				'$1/get/$2/');
	}
})();
