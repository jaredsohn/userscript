// ==UserScript==

// @name           IgnoreDino

// @namespace      http://sayanythingblog.com/entry/*

// @include        http://sayanythingblog.com/entry/*

// @include	   http://sayanythingblog.com/readers/entry/*

// ==/UserScript==

// blocked_ids: this is the list of userids to ignore - edit to your own preferences

blocked_ids = new Array('http://sayanythingblog.com/profile/DINO','http://sayanythingblog.com/profile/skjelv');

// blocked_names: the corresponding names for the above profiles links, they must be in the same relative order
//                used for reporting ignored posts

blocked_names = new Array('Dino','Rugby Reader');

// IgnoredPostsVerbose: Determines whether posts are just removed altogether, or a "Post by Name Removed" inserted.
// Default: 1
// Set to 0 to remove reporting of posts removed.

IgnoredPostsVerbose = 1;

var allElements, thisElement;
allElements = document.getElementsByClassName('comment-wrapper');
for (var i=0; i < allElements.length; i++) {
	thisElement = allElements[i];
	for (var j=0; j<blocked_ids.length; j++) {
		thisBlockedId=blocked_ids[j];
		if (thisElement.innerHTML.match(thisBlockedId)) {
		    if (IgnoredPostsVerbose) {
			thisElement.innerHTML='<p>Post by <b>' + blocked_names[j] + '</b> removed</p>';
		    }
                else {
			thisElement.innerHTML='';
                    }
		}
	}
}

//