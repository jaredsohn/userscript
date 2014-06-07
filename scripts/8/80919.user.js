// ==UserScript==
// @name           Flickr new - Move comment form up
// @namespace      http://thegreensquirre1.wordpress.com/
// @include        http://www.flickr.com/photos/*
// @include        http://flickr.com/photos/*
// ==/UserScript==

/*
 Notes
 -----
 The idea and code is based off the original "Flickr - Move comment form up", 
 http://userscripts.org/scripts/show/7354, from Rafal Smyka.  I've modified
 the code to work with the new Flickr webpage interface.

 Installation
 ------------
 This is a Greasemonkey user script.

 To install, you need FireFox  http://www.mozilla.org/firefox and the firefox extension called Greasemonkey: http://greasemonkey.mozdev.org/
 Install the Greasemonkey extension then restart Firefox and revisit this script.
 Under Tools, there will be a new menu item to "Install User Script".
 Accept the default configuration and install.

 To uninstall, go to Tools/Manage User Scripts,
 select "Flickr new - Move comment form up" and click Uninstall.

 --------------------------------------------------------------------

 Usage Instructions
 ------------------

 Changelog:
 ----------
 v1.0	2010-07-06	Initial Release
*/

function moveCommentFormUp() {
 
    var commentsElement = document.getElementById("comments");
    if (commentsElement) {
	var commentsTable = document.evaluate("ol", commentsElement, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	if(commentsTable) {
	    commentsElement.removeChild(commentsTable);
	    commentsElement.appendChild(commentsTable);
	}
    }
}

moveCommentFormUp();
