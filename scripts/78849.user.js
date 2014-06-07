// ==UserScript==
// @name           We Live In Beijing
// @namespace      http://www.weliveinbeijing.com
// @description    Improve the WLIB user experience
// @include        http://weliveinbeijing.com/*
// @include        http://www.weliveinbeijing.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==

/**
 * Automatically changes the size of the forum reply box
 * as typing in.
 *
 **/
function adaptReplySize(event){
	if( $('#forum_reply').attr('scrollHeight') < 100 ){
		$('#forum_reply').height(100) ;
	}
	var newHeight = $('#forum_reply').attr('scrollHeight');
	$('#forum_reply').height( newHeight );
}


/**
 * Clears the default text in the search box on focus
 *
 **/
function clearSearchBox(event) {
	$('#inputsearchuser').val('');
}


/**
 * Directly scrolls next to the last viewed post in a thread
 *
 **/
function scrollToLastViewed(){
	var loc = new String(window.location);
	var pos = loc.search('discussion/thread.rails');
	
	if (pos >= 0) {
		// it's a forum page
		if( GM_getValue(loc) != null ){
      // This page already has been visited
      // Send the user to the last post in this thread
      $(document).scrollTop( GM_getValue(loc) );
		}
		
		// Set the new scroll position for this page to the document's height
		// Last reply index
		var replyIndex = $('#mainColumn li').length - 2;
		var lastReply = $('#mainColumn li')[replyIndex]
		GM_setValue(loc, lastReply.offsetTop);
	}
}


/*
 * Attach event listners and start functions
 */
$('#forum_reply').keypress(adaptReplySize);
$('#inputsearchuser').focus(clearSearchBox);
scrollToLastViewed();
