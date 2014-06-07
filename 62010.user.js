// GoodreadsRememberCommentOptions
// version 1.0.1
// 2009-11-18
// Copyright (c) 2009, AJB
//
// Changes:
// v1.0.0 Initial release. [11/14/09]
// v1.0.1 Fixed bug where posting a comment would reset the checkboxes. [11/14/09]
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "GoodreadsRememberCommentOptions", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          GoodreadsRememberCommentOptions
// @namespace     http://userscripts.org/users/AJB
// @description   Remember the state of "Update" and "E-mail" checkboxes on review and group comments.
// @include       http://www.goodreads.com/topic/show/*
// @include       http://www.goodreads.com/review/show/*
// ==/UserScript==

// Find what type of page we are on.
var updateLabel, digestLabel;
if ( window.location.href.match(/topic\/show/) ) {
    updateLabel = "updateStateTopic";
    digestLabel = "digestStateTopic";
} else {
    updateLabel = "updateStateReview";
    digestLabel = "digestStateReview";
}

// Get the stored state of the check boxes.
var updateState = -1, digestState = -1;
updateState = GM_getValue(updateLabel, updateState);
digestState = GM_getValue(digestLabel, digestState);

// Find the check boxes and post button.
var updateBox  = document.getElementsByName("update_feed");
var digestBox  = document.getElementsByName("digest"     );
var postButton = document.getElementsByName("commit"     );

// Set the state of the boxes.
setBoxes();

// Add event handlers to watch for clicks on these and post button.
if ( updateBox[0] ) {updateBox[0].addEventListener('click',updateClicked,true)};
if ( digestBox[0] ) {digestBox[0].addEventListener('click',digestClicked,true)};
postButton[0].addEventListener('click',doTimer,true);

// Add an interval timeout to reset the boxes.
//setInterval(setBoxes,1000);

// Functions to catch clicks on check boxes.
function doTimer(e) {
    setTimeout(setBoxes,1000);
}
function updateClicked(e) {
    if ( e.target.checked ) {
	updateState = 1;
    } else {
	updateState = 0;
    }
    GM_setValue(updateLabel, updateState);
}
function digestClicked(e) {
    if ( e.target.checked ) {
	digestState = 1;
    } else {
	digestState = 0;
    }
    GM_setValue(digestLabel, digestState);
}
function setBoxes() {
    // In no previous values stored, get the current states and store them,
    // otherwise set to their last stored state.
    if ( updateBox[0] ) {
	if ( updateState == -1 ) {
	    if ( updateBox[0].checked ) {
		updateState = 1;
	    } else {
		updateState = 0;
	    }
	    GM_setValue(updateLabel, updateState);
	} else if ( updateState == 0 ) {
	    updateBox[0].checked = false;
	} else {
	    updateBox[0].checked = true;
	}
    }
    if ( digestBox[0] ) {
	if ( digestState == -1 ) {
	    if ( digestBox[0].checked ) {
		digestState = 1;
	    } else {
		digestState = 0;
	    }
	    GM_setValue(digestLabel, digestState);
	} else if ( digestState == 0 ) {
	    digestBox[0].checked = false;
	} else {
	    digestBox[0].checked = true;
	}
    }
}
