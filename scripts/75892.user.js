// ==UserScript==
// @name	apptrackr shortcut
// @namespace	http://userscripts.org/users/126938
// @author	Angle
// @include	http://apptrackr.org/*
// @include	http://apptrackr.cd/*
// @version	2012-06-03
// ==/UserScript==

document.addEventListener('keyup', function(e) {
	// Home
	if(e.keyCode == '36') unsafeWindow.apptrackr.applistReset();
	// Up Arrow
//	if(e.keyCode == '38' && !unsafeWindow.apptrackr.applistShowing) unsafeWindow.apptrackr.showAppList();
	// Left Arrow
	if(e.keyCode == '37' && unsafeWindow.apptrackr.applist.currentPage != '1' && unsafeWindow.apptrackr.applistShowing) unsafeWindow.apptrackr.applistPrevPage();
	if(e.keyCode == '37' && !unsafeWindow.apptrackr.applistShowing) unsafeWindow.apptrackr.showAppList();
	// Right Arrow
	if(e.keyCode == '39' && unsafeWindow.apptrackr.applist.currentPage != unsafeWindow.apptrackr.applist.maxPages && unsafeWindow.apptrackr.applistShowing) unsafeWindow.apptrackr.applistNextPage();
}, false);