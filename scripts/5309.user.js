// Coolhomepages.com user script
// version 0.1 BETA!
// 2006-08-16
// Copyright (c) 2006, Neil Craig (neil.big.craig[at]gmail.com
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
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Coolhomepages.com ShowSite
// @description   This script will override the javascript function set to display a site in a new window
// @include       http://*.coolhomepages.com/*
// @include       http://coolhomepages.com/*
// ==/UserScript==

(function () {

	var allLinks, thisLink;
	allLinks = document.evaluate(
	    '//a[starts-with(@href, "javascript:showSite2")]',
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	
	for (var i = 0; i < allLinks.snapshotLength; i++) {
	    
	    thisLink = allLinks.snapshotItem(i);
	    
	    // do something with thisLink
	    
	    var coolsite = thisLink.href.substring(22, (thisLink.href.length - 2)).split("','");
	    	
	    thisLink.href = 'getClicks.php?id=' + coolsite[1] + '&url=' + coolsite[0];
	    
	    thisLink.setAttribute('target','_blank');
	}

})();