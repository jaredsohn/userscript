// ==UserScript==
// @name           SLTrib All Comments
// @namespace      http://userscripts.org/users/6623/scripts
// @description    Inserts all comments into Salt Lake Tribune stories
// @include        http://*sltrib.com/*ci_*
// ==/UserScript==

/* Begin script*/
var storyIDGrabberStart = document.body.innerHTML.indexOf("s.eVar26=") + 10;
var storyIDGrabberEnd = document.body.innerHTML.indexOf('"', storyIDGrabberStart);
var storyID = parseInt(document.body.innerHTML.substring(storyIDGrabberStart, storyIDGrabberEnd));
var commentURL = "http://166.70.44.77/comments/read_comments.asp?ref=" + storyID;

addCommentsDiv();
replaceComments();

/* End script*/

/* Functions */

function addCommentsDiv() {
	var allLinks, thisLink;
	allLinks = document.evaluate(
		'//a[@name="commentBox"]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	thisLink = allLinks.snapshotItem(0);
	var allComments = document.createElement("div");
	allComments.setAttribute('id','gm_all_comments');
	allComments.innerHTML = 'This is the gm_all_comments div!';
	thisLink.parentNode.insertBefore(allComments, thisLink.nextChild);
} // end function addCommentsDiv()

function replaceComments() {
	// first remove all the half-comments the Trib provides
	var allIframes, thisIframe;
	allIframes = document.getElementsByTagName('iframe');
	thisIframe = allIframes[0];
	thisIframe.parentNode.removeChild(thisIframe);
	var comment_url = commentURL;

	// grab the comments from comment_url and insert them into the page
	GM_xmlhttpRequest({
		method: 'GET',
		url: comment_url,
		onload: function(responseDetails) {
			var search_string_start = '<div class="cmtContainer">';
			var search_string_end = '<div class="IndexLinks">';
			var match_start = responseDetails.responseText.indexOf(search_string_start);
			var match_end = responseDetails.responseText.indexOf(search_string_end,match_start + search_string_start.length);
			var comments = responseDetails.responseText.substring(match_start,match_end).replace(/<img.*?>/g,'').replace(/<a.*?>/g,'').replace(/Report Abuse/g,'<hr>').replace(/Hide/g,'');
			var addedCommentsBox = document.getElementById('gm_all_comments');
			if (match_start != -1) {
				// found it
				addedCommentsBox.innerHTML = "<b>User Comments</b><P>" + comments;
			}
			else {
				addedCommentsBox.innerHTML = "<b>No User Comments Yet</b>";
			}
		}
	});
} // end replaceComments()