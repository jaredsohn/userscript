// HolyMoly!
// version 0.1 BETA
// 2008-10-14
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
// select "HolyMoly", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          HolyMoly
// @description   adds a 'naughty edit' link, allows you to edit anyones post, SpackoMcDribble 2008
// @include       http://www.holymoly.co.uk/*com_daboard*
// ==/UserScript==


var allLinks, thisLink;
allLinks = document.evaluate(
    "//a[@class='post']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
	stuff = thisLink.getAttribute('onclick');
	bits = stuff.split(",");
	var aa = document.createElement('span');
	aa.innerHTML = 	" <a href=\"#\"" +
	   			"onclick='xajax_gettheEditForm(\"edit" + bits[1] + "\"," + 
				bits[1] + 
				",999,document.getElementById(\"open\").value,document.getElementById(\"open2\").value);return false;' " +
				">naughty edit</a>";
	thisLink.parentNode.insertBefore(aa, thisLink.nextSibling);	
}

