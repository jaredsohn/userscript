// ==UserScript==
// @name           Joystiq Comment Killfilter
// @namespace      jzeitler
// @include        http://*.joystiq.com/*
// ==/UserScript==

//This is the list of IDs to be muted by the script. Hover over the 
// individual's name and look in the URL for the ID number; for 
// example, in this URL: http://www.joystiq.com/profile/1234567/ 
// the ID is 1234567.
// THIS IS USER EDITABLE.
var mutedIds = ['1234567','9876543'];

//This is what you want squelched comments to be replaced with. It's
// best to set it to something that you can easily identify as a 
// killed comment.
// THIS IS USER EDITABLE.
var replaceText = "Derp de derp derp derp de derpderp.";

//only search within the comments.
var commentsSection = document.getElementById("comments");

//search for the links to the profiles...
var individualComments = commentsSection.getElementsByTagName("a");

//now check each link
for ( var i = 0; i < individualComments.length; i++ ) {
	var potentialCrap = individualComments[i];
	var profileUrl = potentialCrap.getAttribute("href");
	//don't bother searching for a profile ID if there's a # in the
	// URL...
	var notAProfileUrl = profileUrl.indexOf("#");
	if( notAProfileUrl != -1 ) {
		continue;
	}
	var killMe = false;
	for( var j = 0; j < mutedIds.length; j++ ) {
		var killUser = mutedIds[j];
		var doesItExist = 0;
		doesItExist = profileUrl.indexOf(killUser);
		if( doesItExist != -1 ) {
			//we have a match!
			killMe = true;
			break;
		}
	}
	if( killMe == true ) {
		var h4Node = potentialCrap.parentNode;
		var commentDiv = h4Node.parentNode;
		var crapCommentParagraphs = commentDiv.getElementsByTagName("p");
		var crapParagraph = crapCommentParagraphs[0];
		crapParagraph.innerHTML = replaceText;
	}
}

