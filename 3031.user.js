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
// select "ZTree Forum - autocheck e-mail notification", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name		ZTree Forum - autocheck e-mail notification
// @namespace	http://2of4.net/mozilla/greasemonkey/userscripts/ztw3.com/checkbox/
// @description	Checks all the checkboxes in the forum (currently there is only one: 'Notify me of responses by e-mail')
// @include		http://www.ztw3.com/forum/forum.cgi?read=*
// @include		http://www.ztw3.com/forum/forum.cgi?review=*
// ==/UserScript==

(function() {
	var lstrXPath = "/html/body/form//input[@type='checkbox']";
	var lxmlSnapshot = document.evaluate( lstrXPath
									  , document
									  , null
									  , XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE
									  , null); 
	for (var lnumIndex = 0, lhtmlCheckbox;
			lhtmlCheckbox = lxmlSnapshot.snapshotItem(lnumIndex);
			lnumIndex++) {
		lhtmlCheckbox.checked = true;
	}
})();
