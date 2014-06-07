
// --------------------------------------------------------------------

//


// This is a Greasemonkey user script.  To install it, you need


// Greasemonkey 0.3 or later: http:
//greasemonkey.mozdev.org/


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


// @name          Google AllInOne

// @namespace     frieder.steinmetz@gmail.com
// @description   Prevents the Googlebar from opening every component in a new window

// @include       https://*.google.com/*



// ==/UserScript==

window.setTimeout( function() { 
	var allLinks, thisLinks;
	allLinks = document.evaluate(
    		"//li[@class='gbt']",
    		document,
    		null,
    		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    		null);
	for (var i = 0; i < allLinks.snapshotLength; i++) {
    		thisLink = allLinks.snapshotItem(i);
    		thisLink.getElementsByTagName("a")[0].setAttribute("target","_top");
	}
}, 50);