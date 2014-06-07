// ==UserScript==
// @name           Reddit - Replace headlines with comments
// @namespace      gcalpo
// @description    Replaces headlines with the first/best/top/newest comment for that link.
// @include        http://reddit.com/*
// @include        http://www.reddit.com/*
// @exclude        http://reddit.com/*/comments/*
// @exclude        http://www.reddit.com/*/comments/*
// ==/UserScript==

var MAX_HEADLINE_LENGTH = 750 // feel free to change
var MIN_COMMENTS = 1 

ReplaceHeadlinesWithComments(); 

/********************************************************************************************/
function ReplaceHeadlinesWithComments() {
	// get all anchors of class "title"
	var anchors= document.getElementsByTagName('a');
	var nrAnchors = anchors.length;
	for (var i = 0; i < nrAnchors; i++) {
	
		var a = anchors[i];
		if (a.className.match(/title.*/)) { 
			ProcessHeadline(a);
		}
	}
}
/********************************************************************************************/
function ProcessHeadline(a) {
	// in the same headline, find the anchor of class "comments"
	var entryDiv = a.parentNode.parentNode;
	var anchors = entryDiv.getElementsByTagName('a');
	var nrAnchors = anchors.length;
	for (var i = 0; i < nrAnchors; i++) {
	
		var commentsAnchor = anchors[i];
		if (commentsAnchor.className.match(/comments/)) { 
			// get the # of comments
			var linkText = commentsAnchor.innerHTML;
			var linkTextParts = linkText.split(' ');
			var nrComments = (linkTextParts[0] - 0);
			
			if (nrComments >= MIN_COMMENTS) {
				ReplaceWithComment(commentsAnchor.href, a);
			}
		}
	}
	
}
/********************************************************************************************/
function ReplaceWithComment(commentsLink, targetAnchor) {

	//		fetch comments anchor's contents via AJAX
	
	var targetURL = commentsLink;
	var oldInnerHTML = targetAnchor.innerHTML // remember the old headline
	targetAnchor.innerHTML = '<i>Loading...</i> ' + oldInnerHTML // so we know which one's which

	
	GM_xmlhttpRequest({
		
	method: 'GET',
	url: targetURL,
	headers: {
	  'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	 'Accept': 'text/html',
	},
	
	onload: function(responseDetails) {

		var HTML = responseDetails.responseText;
		
		// in the contents find the first instance of: <div class="usertext-body"><div class="md">
		// and grab all the contents of this div 
		
		if (!HTML.match(/there doesn't seem to be anything here/)) {
			HTML = cropHTML(HTML);
			
			HTML = stripHTML(HTML); // strip HTML and reduce comment length as necessary
			
			HTML = HTML.substr(0,MAX_HEADLINE_LENGTH); // trim if necessary
			
			
			targetAnchor.innerHTML = HTML; // replace innerHTML of the first anchor  (of class "title") with the new content
			
			// show original headline in the tooltip		
			targetAnchor.setAttribute("title", oldInnerHTML);
		}
		else {
			// no comments found.  use original headline.
			targetAnchor.innerHTML = oldInnerHTML; 
		}
	}
	}); // END GM_xmlhttpRequest	
	
}
/********************************************************************************************/
function cropHTML(HTML) {
	var oldHTML = HTML;
	var newHTML = HTML;

	var fwStart  = '<div class="md">';
	var fwEnd 	= '</div>';

	var sStart, sEnd;
	var pos1, pos2;

	pos1 = newHTML.indexOf('class="expand"',0);
	pos1 = newHTML.indexOf(fwStart,pos1 + 1); // take the SECOND instance.  (the first is the subreddit description)
	
	pos2 = newHTML.indexOf(fwEnd, pos1);

	newHTML = newHTML.substring(pos1 + fwStart.length, pos2);
		
	return newHTML;
}
/********************************************************************************************/
function stripHTML(HTML) {

	var newHTML = HTML;

	// 1. remove tags.  thanks http://zamov.online.fr/EXHTML/DHTML/DHTML_983246.html
	newHTML = newHTML.replace(/(<([^>]+)>)/ig," "); 
	
	// 2. remove extra spaces
	newHTML = stripExtraSpaces(newHTML);
	
	return newHTML;
}
/********************************************************************************************/
function stripExtraSpaces(s) {
	var newStr = s;
	newStr = newStr.replace('&nbsp;',' ');
	newStr = newStr.replace('&quot;',' ');
	newStr = newStr.replace('   ',' ');
	newStr = newStr.replace('  ',' ');
	return newStr;
}
/********************************************************************************************/
	
