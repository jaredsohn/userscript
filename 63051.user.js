// ==UserScript==
// @name          gmail-view-entire-message
// @description   Inserts a "View Entire Message" link at the top of email that are clipped in gmail
// @include https://mail.google.tld/mail/*
// @include http://mail.google.tld/mail/*
// @include https://mail.google.tld/a/*
// @include http://mail.google.tld/a/*
// @require       http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

// Executed onload
window.addEventListener('load', function() {

	// Load Greasemonkey Gmail API with our callback
	if (unsafeWindow.gmonkey) {
		unsafeWindow.gmonkey.load('1.0', init);
	}
}, true);


function addViewMessageLink() {

	var gmail = unsafeWindow.gmonkey.get("1.0");
	var viewType = gmail.getActiveViewType();

	// Return if we're not in a conversation view
	if ( viewType != "cv" ) return;

	// Find the link they add at the bottom of the page
	var root = gmail.getActiveViewElement();
	var node = jQuery("a:contains('View entire message')", root);	

	if ( ! node ) return;

	// Get the main div for the message and the link's href
	var parent_ = node.parent();
	var url = node.attr("href");

	if ( ! parent_ ) return;

	// Add our own text and link at the top of the message div
	parent_.prepend('This message has been clipped: <a href="' + url + '" target="_blank">View entire message</a>');
}

function init(gmail)
{
	// Setting time delay upon advice from:
	// http://eric.biven.us/2008/11/25/using-the-gmail-greasemonkey-api-and-succeeding-my-workaround/
	window.setTimeout(function() {

		// Add message for this page load
		// Appears necessary after testing
		addViewMessageLink();

		// Register our method as a callback for future events
		gmail.registerViewChangeCallback(addViewMessageLink);

	}, 500);
}


