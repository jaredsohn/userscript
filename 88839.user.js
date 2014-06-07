// ==UserScript==
// @name           Gmail Chat Notifier
// @description    Provides notification of incoming Gmail chat messages
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// ==/UserScript==

// NOTE: This script relies on the Gmail DOM structure as of 2010-09-23
// I don't think Gmail has an API for accessing its chat messages, so
// if they decide to change their DOM structure then this script can break.

var unread_count = 0;		// keep track of how many total unread e-mails we have
var label = '';
var badge_status = '';		// what type of info the dock badge is current displaying
							// ('' for nothing, 'unread' for unread count, 'chat' for chat name)

// Called by event listener for 'DOMNodeInserted'
// Checks the inserted node to see if it's chat-related
// Calls growlChatMessage for chat-related node-insertions
function onNodeInserted(event) {
	// If we have a new incoming message cluster
	// (i.e., one that would have the 'Alan:' prefix)
	if (event.target.getAttribute('role') == 'chatMessage' &&
		event.target.getAttribute('chat-dir') == 't') {

		// Growl using text in the last child node (it's really the only node)
		growlChatMessage(event.target.lastChild);
		
	// If we have a new incoming message within an existing cluster
	// (i.e., just the message, 'Alan:' already showed up previously)
	} else if (event.target.parentNode.getAttribute('role') == 'chatMessage' &&
			   event.target.parentNode.getAttribute('chat-dir') == 't') {
		
		// Growl using text in the current node (message node)
		growlChatMessage(event.target);

	// If a new chat window is created by this incoming message
	} else if (event.target.getAttribute('role') == 'log' &&
			   event.target.firstChild.lastChild.getAttribute('chat-dir') == 't') {

		// Growl using text in the latest message node
		growlChatMessage(event.target.firstChild.lastChild.lastChild);
	}
}

// Generates a Growl notification about a chat message
// Takes a message DOM node as its input
function growlChatMessage(node) {
	var title_txt = '';
	var msg_txt = '';
	
	// Class 'kk' is for the first message in a cluster
	// (i.e., it has 'Alan:' prefixed to it), which has a different DOM structure.
	// Any other node is a normal message node
	if (node.getAttribute('class') == 'kk') {
		title_txt = node.childNodes[1].firstChild.nodeValue;	// User name
		msg_node = node.childNodes[3];		// Node containing message text
	} else {
		title_txt = node.parentNode.firstChild.childNodes[1].firstChild.nodeValue; // User name
		msg_node = node;					// Node containing message text
	};
	
	// Get the text of the message in the message text node
	// Strip HTML tags from message text
	msg_txt = msg_node.innerHTML.replace(/(<([^>]+)>)/ig,'');

	title_txt = title_txt.substring(0,title_txt.length-2) + ' says...';
	
	// Growl the message
	window.fluid.showGrowlNotification({
		title: title_txt,
		description: msg_txt
	});
}

// Sets up an event listener on the node for the Inbox link in the navigation panel
// Also sets the initial unread count (upon loading)
function setInboxListener() {
	// 'canvas_frame' is the id of the main HTML component of Gmail
	var canvas_frame = document.getElementById('canvas_frame').contentDocument;
	// Get all link nodes; search for the one with title = 'Inbox' or 'Inbox (1)' or 'Inbox (2)', etc.
	var a_elems = canvas_frame.links;
	for (i=0; i<a_elems.length; i++) {
		var a_title = a_elems[i].getAttribute('title');
		if (a_title && a_title.substr(0,5) == 'Inbox') {
			label = a_elems[i].innerHTML;
			// Notify of any unread mail
			notifyUnread();
			// Add a node insertion event listener to the Inbox node 
			a_elems[i].addEventListener('DOMNodeInserted', onInboxNodeInserted, false);
			return;
		}
	}
	// Try this again in 1000 ms if we didn't find the Inbox node
	window.setTimeout(function() {setInboxListener();}, 1000);
}

// Called by node insertion event listener on the Inbox node
// Extracts the text of the node and passes it to notifyUnread
function onInboxNodeInserted(event) {
	if (event.target.nodeType == 3) {
		label = event.target.data;
		if (label.substr(0,5) == 'Inbox') {
		 	notifyUnread(label);
		}
	}
}

// Takes in label (e.g., 'Inbox (3)') and does two things:
// - Sets the unread_count
// - Growls new mail notification if we have a positive change
function notifyUnread() {
	if (label == 'Inbox') {
		unread_count = 0;
	} else {
		var search_results = label.match(/\((\d*)\)/);
		if (search_results) {
			var new_unread_count = search_results[1];
			if (new_unread_count > unread_count) {
				window.fluid.showGrowlNotification({
					title: "New mail!",
					description: new_unread_count + " total unread",
					id: 'new_mail'
				});
			}
			unread_count = new_unread_count;
		}
	}
	setUnreadBadge();
}

// Set the dock badge unread count based on unread_count
// Leave it untouched if the current dock badge status is 'chat'
function setUnreadBadge() {
	if (badge_status != 'chat') {
		if (unread_count > 0) {
			window.fluid.dockBadge = unread_count;
			badge_status = 'unread';
		} else {
			window.fluid.dockBadge = '';
			badge_status = 'none';
		}	
	}
}

// Called by the event listener on the page title node
// Used to blink the badge between an incoming chatter's name and the unread count
function onTitleModified(event) {
	var new_title = event.newValue;
	var search_results = new_title.match(/(.*)[ ]says.*/);
	if (search_results) {
		window.fluid.dockBadge = search_results[1];
		badge_status = 'chat';
	} else {
		badge_status = '';
		setUnreadBadge();
	}
}

// Listen for DOM node insertions and call onNodeInserted if there are any
document.addEventListener('DOMNodeInserted', onNodeInserted, false);

var results = document.getElementsByTagName('title');
var title_node = results[0];
// Listen for text modification of the page title
title_node.addEventListener('DOMCharacterDataModified', onTitleModified, false);

// Listen for insertions into the navigation bar's Inbox link node
setInboxListener();

// Forcibly set the badge occasionally in case something got it off track
window.setInterval(function() {notifyUnread();}, 2000);