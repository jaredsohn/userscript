// BitHUmen borító nézet
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
// select "BitHUmen borító nézet", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          BitHUmen borító nézet
// @namespace     http://*bithumen.*/browse.php*
// @description   BitHUmen borító nézet
// @include       http://*bithumen.*/browse.php*
// ==/UserScript==

(function() {
	var linkNodes = document.evaluate( "//body//a[starts-with(@onmouseover,'s(')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

	for (var i = 0; i < linkNodes.snapshotLength; ++i) {

		var node = linkNodes.snapshotItem(i); 
		var mouseCode = node.getAttribute("onmouseover");
		if ( mouseCode.match(/s\(\d+, "(.*)"\)/i) ) {
			node.childNodes[0].setAttribute("src", RegExp.$1);
node.childNodes[0].setAttribute("height", null);
node.childNodes[0].setAttribute("width", null);
//			node.setAttribute("onmouseover","");
//			node.setAttribute("onmouseout","");
		};
	};
})();