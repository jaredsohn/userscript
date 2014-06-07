// Snapfish: Change JS links to regular links
// 1.0: Tuesday, August 26, 2008
// Copyright (c) 2008, Bryan Martinez
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
// select "Snapfish: Change JS links to regular links", and click Uninstall.
//
// --------------------------------------------------------------------
//

// ==UserScript==
// @name           Snapfish: Change JS links to regular links
// @namespace      http://bcmartinez.com/
// @description    Disabling JS links for thumbnails
// @include        http://www.snapfish.com/*
// @include        http://www2.snapfish.com/*
// @include        http://snapfish.com/*
// ==/UserScript==

as=document.getElementsByTagName('a');
for (i=0;i<as.length;i++) {
	if (as[i].href.indexOf('gotoSlideShow') > -1) {
		as[i].href = as[i].href.replace("')", "");
		as[i].href = as[i].href.replace("javascript:gotoSlideShow('", "");
	}
}
