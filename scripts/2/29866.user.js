// BitHUmen image thumbaniler
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
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          BitHUmen image thumbaniler
// @namespace     http://usite.dyndns.org/
// @description   puts the image instead of the image hower link
// @include       http://*bithumen.*/browse.php
// ==/UserScript==

(function() 

{

   var count = 0;



   linkNodes = document.evaluate( "//body//a[starts-with(@onmouseover,'s(')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 


for (var i = 0; i < linkNodes.snapshotLength; ++i) {

	node = linkNodes.snapshotItem(i); 
	mouseCode = node.getAttribute("onmouseover");
	if ( mouseCode.match(/s\(\d+, "(.*)"\)/i) ) {

		imageUrl = RegExp.$1;
	}

	img = node.childNodes[0];
	img.src = imageUrl;

	node.setAttribute("onmouseover","");

	node.setAttribute("onmouseout","");

   } // for

})();
