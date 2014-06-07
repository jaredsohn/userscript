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
// select "Thuisbezorgd.nl - tussenpagina uitschakelen", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name		Thuisbezorgd.nl - tussenpagina uitschakelen
// @namespace	http://2of4.net/mozilla/greasemonkey/userscripts/thuisbezorgd.nl/tussenpagina
// @description	Slaat de tussenpagina 'wil je ook iets drinken?' over bij het bestellen
// @include		http://thuisbezorgd.nl/wagen.php*
// @include		http://www.thuisbezorgd.nl/wagen.php*
// ==/UserScript==

(function() {
	var lstrXPath = "//a[@target='bedrijf']";
	var lxmlSnapshot = document.evaluate( lstrXPath
										, document
										, null
										, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE
										, null); 
	for (var lnumIndex = 0, lhtmlAnchor;
			lhtmlAnchor = lxmlSnapshot.snapshotItem(lnumIndex);
			lnumIndex++) {
		var lstrHRef = lhtmlAnchor.getAttribute('href');
		if(/(&amp;|&|\?)tussenpagina=$/.test(lstrHRef)) {
			lstrHRef += 'ja';
			lhtmlAnchor.setAttribute('href', lstrHRef);
		}
	}
})();
