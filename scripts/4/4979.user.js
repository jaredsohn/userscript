
// Myspace Blog Edit
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
// select "Myspace Blog Edit, and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Myspace Blog Edit
// @namespace     http://annaghvarn.plus.com/greasemonkey/
// @description   Select simple blog editor instead of "advanced" one
// @include       http://blog.myspace.com/*
// ==/UserScript==

var links, a;
links = document.evaluate(
    "//a[@href]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

// might be smarter to test for    
// fuseaction=blog.create
//fuseaction=blog.edit

for (var i = 0; i < links.snapshotLength; i++) {
    a = links.snapshotItem(i);
    
    if (a.href.match(/editor\=/i)) {
        
        a.href = a.href.replace(/editor\=true/g, 'editor=false');
	
    }
}
