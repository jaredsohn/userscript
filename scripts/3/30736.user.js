// ==UserScript==
// @name           KSL Show Comments
// @namespace      http://userscripts.org/users/6623/scripts
// @description    Inserts comments into KSL stories
// @include        http://*ksl.com/*?nid=148&sid=*
// ==/UserScript==

/* Begin script*/
var thisLocation = String(window.location);
var commentURL = thisLocation + "&comments=true";
//var no_comments_search_string = '0 comments';
//var no_comments_match = document.body.innerHTML.indexOf(no_comments_search_string);
//if (no_comments_match == -1) {
	addCommentsDiv();
	replaceComments();
//}

/* End script*/

/* Functions */

function addCommentsDiv() {
	var allDivs, thisDiv;
	allDivs = document.evaluate(
		'//div[@id="bodyCol1"]',
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
	GM_xmlhttpRequest({
		method: 'GET',
		url: comment_url,
		onload: function(responseDetails) {
			var search_string_start = "<div class='comments'>";
			var search_string_end = '<div class="comment" style="background: #fff; border: 0px; margin-left: 0px; padding-left: 0px;">';
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