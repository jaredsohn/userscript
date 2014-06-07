// ==UserScript==
// @name          ABC 4/CW 30 All Comments
// @namespace     http://userscripts.org/users/6623/scripts
// @description	  Add all comments to ABC 4/CW30 story pages
// @include       http://www.abc4.com/*content_id=*
// @include       http://www.cw30.com/*content_id=*
// @exclude       http://www.abc4.com/*content_id=*&p=Comments*
// @exclude       http://www.cw30.com/*content_id=*&p=Comments*
// ==/UserScript==

/* Begin script*/
var currentLoc = trim(String(window.location));
var commentURL = currentLoc + "&p=Comments";

var no_comments_search_string = '(0) Comments';
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
		'//div[@class="StoryCommentLinks"]',
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
		allComments.innerHTML = '<P><div class="Box"><div class="BoxHeader"><div><span>Comments</span></div></div><div class="BoxBody"><div class="BoxContent NoFoot" id="addedCommentsBox">This is the gm_all_comments div!</div></div></div>';
	}
	thisDiv.parentNode.insertBefore(allComments, thisDiv.nextChild);
} // end function addCommentsDiv()
function replaceComments() {
	var comment_url = commentURL;
	GM_xmlhttpRequest({
			method: 'GET',
			url: comment_url,
			onload: function(responseDetails) {
				var search_string_start = '<div class="CommentList">';
				var search_string_end = '<br/><br/>';
				var match_start = responseDetails.responseText.lastIndexOf(search_string_start);
				var match_end = responseDetails.responseText.indexOf(search_string_end,match_start + search_string_start.length);
				var comments = responseDetails.responseText.substring(match_start,match_end-20);
				if (match_start != -1) {
					// found it
					var addedCommentsBox = document.getElementById('addedCommentsBox');
					addedCommentsBox.innerHTML = comments;
				}
			}
	});
} // end function replaceComments

function trim(stringToTrim) {
	noHTMLString = stringToTrim.replace(/(<([^>]+)>)/ig,""); 
	trimmedString = noHTMLString.replace(/^\s+|\s+$/g,"");
	return trimmedString;
} // end function trim