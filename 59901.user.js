// ==UserScript==
// @name           Killfile with thread support for LJ (flicker-less version)
// @namespace      killfilelj
// @include        http://*.livejournal.com/*
// ==/UserScript==
//
// Greasemonkey "flicker" eliminating version
//
// WARNING: this version requires you to add the following hack to your userContent.css file:
//
// @-moz-document domain(livejournal.com) {
//	div#Comments {
//		display: none;
//	}
// }
//
// This file needs to be created, and it is located in the 'chrome' subfolder of your Firefox
// profile.

// put your shit list here :)
var banned_commenters = new Array("user1", "user2", "user3");

function RemoveComments()
{
	if (unsafeWindow.LJ_cmtinfo)
	{
		var LJ_cmtinfo = unsafeWindow.LJ_cmtinfo;
		var x,z;

		for (x in LJ_cmtinfo)
		{
			for(z in banned_commenters) {
				if(LJ_cmtinfo[x]["u"] == banned_commenters[z]) {
					RemoveComment(x);
				}
			}
		}
	}

}


function RemoveComment(x)
{
	var LJ_cmtinfo = unsafeWindow.LJ_cmtinfo;
	
	var Anchor = document.getElementsByName('t'+x);
	
	if (Anchor)
	{
		var a;
		for (a in Anchor)
		{
			var Comment = Anchor[a].nextSibling;
			if (Comment)
			{
				Comment.parentNode.removeChild(Comment);
				var y;
				for (y in LJ_cmtinfo[x]["rc"])
				{
					RemoveComment(LJ_cmtinfo[x]["rc"][y]);
				}
			}
		}
	}
}

function showComments() {
	var commentSection = document.getElementById("Comments");
	if(commentSection) { commentSection.style.display = "inline"; }
}

function editCommentNumber() {
	var commentNumberElements = document.getElementsByClassName("lesstop");

	if(commentNumberElements) {
		for(var e=0;e<commentNumberElements.length;e++) {
			var currentElement = commentNumberElements[e];
			if(currentElement.innerHTML.indexOf("Post a new comment") != -1) {
				currentElement.innerHTML = '<b>(<a href="?mode=reply">Leave a comment</a>)</b>';
			}
			else if(currentElement.innerHTML.indexOf("Read") != -1) {
				currentElement.innerHTML = '<b>(<a href="javascript:history.go(-1);">Read comments</a>)</b>';
			}
			else if(currentElement.innerHTML.indexOf("No comments") != -1) {
				currentElement.innerHTML = '<b>(<a href="javascript:history.go(-1);">Read comments</a>)</b>';
			}
			else {
				continue;
			}
		}
	}
}

editCommentNumber();
RemoveComments();
document.addEventListener("load",showComments(),false);

// ==/UserScript==
