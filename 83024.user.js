// ==UserScript==
// @name          Flickr - Move Group Invites Down
// @description	  Moves Group invites down, so you can see comments just below the photo
// @author        Philipp Klinger
// @namespace     http://www.klinger-photography.com/flickr
// @include       http://www.flickr.com/photos/*
// @include       http://flickr.com/photos/*
// @version       1.0 2010-08-05
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

*/

function moveGroupInvitesDown() {
	invites = document.getElementById('invites');
	if (invites) {
		comments = document.getElementById("comments");
		invites.parentNode.insertBefore(comments, invites);
	}
}

moveGroupInvitesDown();
