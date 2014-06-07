// ==UserScript==
// @name           No Format For Old Replies
// @namespace      http://userscripts.org/
// @description    Changes the formatting to light for certain LJ users.
// @include        http://*.livejournal.com/friends*
// ==/UserScript==

// I put "// Comment this out." on certain lines.  If you comment out all lines
// that has that at the end, you'll change it from "format=light for some users"
// to "format=light for all users".  Up to you.


// To add more usernames, add a new journals[_] line, then increment the
// number.

var journals = new Array();
journals[0] = "oh_chris";
journals[1] = "mousme";
journals[2] = "kadath";


var i, j, allLinks, thisLink, thisJournal;

allLinks = document.getElementsByTagName("a");

// The code!!
for (i = 0; i < allLinks.length; i++) {
	thisLink = allLinks[i];
	if (thisLink.href.search(/.mode.reply/) != -1) {
		for (j = 0; j < journals.length; j++) {  // Comment this out.
			thisJournal = journals[j];  // Comment this out.
			if (thisLink.href.indexOf(thisJournal) != -1) {  // Comment this out.
				allLinks[i].href += "&format=light";
			}  // Comment this out.
		}  // Comment this out.
	}
}
