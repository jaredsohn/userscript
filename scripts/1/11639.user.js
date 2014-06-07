//	Megaupload Cookie
//	(c) Wintermute 2007
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
// select "Megaupload Cookie Inject", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name Megaupload slot limit hack
// @namespace http://www.ms.mff.cuni.cz/~hosel4am
// @description allows you to bypass megaupload slot limit without installing their toolbar
// @include *megaupload*
// ==/UserScript==

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

createCookie('megauploadtoolbar_visibility', 'yes', 7);
createCookie('megauploadtoolbar_id', '197A9F07D8724E438DEBE1C11EBBE405', 7);