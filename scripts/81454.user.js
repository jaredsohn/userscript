// ==UserScript==
// @name          Flickr - Move comment form up
// @description	  Moves comment form above all the existing comments (directly below photo)
// @author        Rafal Smyka
// @namespace     http://smyka.net/flickr
// @include       http://www.flickr.com/photos/*
// @include       http://flickr.com/photos/*
// @version       1.2 2009-02-15
// ==/UserScript==

/*
 Installation
 ------------
 This is a Greasemonkey user script.

 To install, you need FireFox  http://www.mozilla.org/firefox and the firefox extension called Greasemonkey: http://greasemonkey.mozdev.org/
 Install the Greasemonkey extension then restart Firefox and revisit this script.
 Under Tools, there will be a new menu item to "Install User Script".
 Accept the default configuration and install.

 To uninstall, go to Tools/Manage User Scripts,
 select "Flickr - Move comment form up" and click Uninstall.

 --------------------------------------------------------------------

 Usage Instructions
 ------------------

 Changelog:
 ----------
 v1.0	2007-02-01	Initial Release
 v1.1	2009-02-11	Flickr crew changed the composition of the page - this update gets adjusted to it
 v1.2	2009-02-15	Corrected behavior on photo pages where there are several pages of comments
*/

//GM_log("Script running?");

function moveCommentFormUp() {
	var commentsElement = document.getElementById("DiscussPhoto");
    var newLayout = false;
    if (!commentsElement) { // new layout ?
        commentsElement = document.getElementById("comments");
        newLayout = true;
    }
    if (!commentsElement) {
        return;
    }

	if (!newLayout) {
		var commentsTable = document.evaluate("div", commentsElement, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
		if (commentsTable) {
			// we have comments, move them down
			// first move header
			var commentsHeader = document.evaluate("h3", commentsElement, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
			commentsElement.removeChild(commentsHeader);
			commentsElement.appendChild(commentsHeader);

			if (commentsTable.className == "Pages") {
				// we have several pages of comments, we have two more elements (paging) down
				for (i = 0; i < 2; i++) {
					commentsElement.removeChild(commentsTable);
					commentsElement.appendChild(commentsTable);
					commentsTable = document.evaluate("div", commentsElement, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
				}
			}
			commentsElement.removeChild(commentsTable);
			commentsElement.appendChild(commentsTable);

			var isPreview = document.location.href.substring(document.location.href.length - 8) == "#preview";
			if (isPreview) {
				document.location.href = document.location.href;
			}
		}
	} else { // new layout
        var comments = document.getElementById("comments");
        var commentsHeader = document.evaluate("./h3", comments, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        var form = document.evaluate("./div[contains(@class,'add-comment-form')]", comments, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        comments.insertBefore(form, commentsHeader);
    }
}

moveCommentFormUp();
