// ==UserScript==
// @name           DesNews All Comments
// @namespace      http://www.curtisgibby.com/greasemonkey
// @description    Inserts all comments into Deseret Morning News stories
// @include        http://*deseretnews.com/*.html*
// ==/UserScript==

/* Begin script*/

var thisLocation = String(window.location);

if (thisLocation.match("deseretnews.com/blogs"))
{
	var commentURLGrabberStart = document.body.innerHTML.indexOf("addComment") + 31;
	var commentURLGrabberEnd = document.body.innerHTML.indexOf(".html", commentURLGrabberStart) + 5;
	var commentURL = "http://deseretnews.com/user/" + document.body.innerHTML.substring(commentURLGrabberStart, commentURLGrabberEnd);
}
else {
	var commentURLGrabberStart = document.body.innerHTML.indexOf("commentBubble") + 32;
	var commentURLGrabberEnd = document.body.innerHTML.indexOf(".html", commentURLGrabberStart) + 5;
	var commentURL = "http://deseretnews.com/" + document.body.innerHTML.substring(commentURLGrabberStart, commentURLGrabberEnd);
}
var no_comments_search_string = '0 comments';
var no_comments_match = document.body.innerHTML.indexOf(no_comments_search_string);
if (no_comments_match == -1) {
	addCommentsDiv();
	replaceComments();
}

/* End script*/

/* Functions */

function addCommentsDiv() {
	var allDivs, thisDiv;
	allDivs = document.evaluate(
		'//div[@id="storyComments"]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < allDivs.snapshotLength; i++) {
		thisDiv = allDivs.snapshotItem(i);
		var allComments = document.createElement("div");
		allComments.setAttribute('id','gm_all_comments');
		var added_items = 0;
		var mod = 0;
		allComments.innerHTML = 'This is the gm_all_comments div!';
	}
	thisDiv.parentNode.insertBefore(allComments, thisDiv.nextChild);
} // end function addCommentsDiv()

function replaceComments() {
	var comment_url = commentURL;
	// first remove all of the half-comments DesNews already provides
	var allCommentsDivs, thisCommentsDiv;
	allCommentsDivs = document.evaluate(
		'//div[@id="storyComments"]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
		thisCommentsDiv = allCommentsDivs.snapshotItem(0);
		thisCommentsDiv.parentNode.removeChild(thisCommentsDiv);
		GM_xmlhttpRequest({
			method: 'GET',
			url: comment_url,
			onload: function(responseDetails) {
				var search_string_start = '<div id="commentList">';
				var search_string_end = '<div id="commentForm">';
				var match_start = responseDetails.responseText.lastIndexOf(search_string_start);
				var match_end = responseDetails.responseText.indexOf(search_string_end,match_start + search_string_start.length);
				var comments = responseDetails.responseText.substring(match_start,match_end-6);
				if (match_start != -1) {
					// found it
					var addedCommentsBox = document.getElementById('gm_all_comments');
					addedCommentsBox.innerHTML = comments;
				}
			}
	});
} // end replaceComments()