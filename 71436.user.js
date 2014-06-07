// ==UserScript==
// @name           Dailybooth Reply
// @description    Adds an action to quick insert @reply for dailybooth-comments
// @copyright      2010-2011, Dustin Steiner (http://www.alopix.net/)
// @license        Attribution-Noncommercial-No Derivative Works 3.0 Austria; http://creativecommons.org/licenses/by-nc-nd/3.0/at/
// @version        2.0
// @namespace      http://www.alopix.net/
// @include        http://dailybooth.com/*
// @exclude        http://dailybooth.com/dashboard*
// @exclude        http://dailybooth.com/snap*
// @exclude        http://dailybooth.com/upload*
// @exclude        http://dailybooth.com/settings*
// @exclude        http://dailybooth.com/messages*
// @exclude        http://dailybooth.com/live*
// @exclude        http://dailybooth.com/map*
// @exclude        http://dailybooth.com/notifications*
// @uso:script     71436
// ==/UserScript==

// set the caret in an object to a specific position
function setCaretTo(object, position) {
	if (object.createTextRange) {	// ie
		var range = object.createTextRange();
		range.move("character", position);
		range.select();
	} else if (object.selectionStart != null) {	// gecko
		object.focus();
		object.setSelectionRange(position, position);
	}
}

// set the caret in an object to the start
function setCaretToStart(object) {
	setCaretTo(object, 0);
}

// set the caret in an object to the end
function setCaretToEnd(object) {
	setCaretTo(object, object.value.length);
}

// check if we are on a picture detail view
if (document.getElementsByClassName('pictures_show').length == 1) {
	var commentList = document.getElementById('comments');
	if (commentList) {
		function replyify(curComment) {
			// extract the actions-p from the comment
			var commentActions = curComment.getElementsByClassName('actions');
			if (commentActions.length == 1) {
				// find the poster's username
				var username = curComment.getElementsByClassName('meta')[0].getElementsByClassName('action')[0].getElementsByTagName('a')[0].firstChild.nodeValue;
				
				// now insert the new action
				var replyLink = document.createElement('a');
				replyLink.href = '#';
				replyLink.setAttribute('alt', '@' + username);
				replyLink.setAttribute('title', 'reply to ' + username);
				replyLink.setAttribute('style', 'color:#005AAE; background-color:#EAF3FA;');
				var replyText = document.createTextNode('reply');
				replyLink.appendChild(replyText);
				commentActions[0].appendChild(replyLink);
				
				// register the click event
				replyLink.addEventListener('click', function(event) {
						event.preventDefault();
						var target = event.target;
						var commentboxes = document.getElementsByName('comment');
						if (commentboxes.length == 1) {
							var commentText = target.getAttribute('alt') + ' ';
							if (commentboxes[0].selectionStart != null) { // ff
								var startPos = commentboxes[0].selectionStart;
								var endPos = commentboxes[0].selectionEnd;
								var str = commentboxes[0].value.substring(startPos, endPos);
								if (startPos != 0 && !commentboxes[0].value.substring(startPos - 1, startPos).match(/\s/)) {
									commentText = ' ' + commentText;
								}
								commentboxes[0].value = commentboxes[0].value.substring(0, startPos) + commentText + commentboxes[0].value.substring(endPos, commentboxes[0].value.length);
								document.getElementsByName('comment_placeholder')[0].focus();
								commentboxes[0].focus();
								setCaretTo(commentboxes[0], endPos + commentText.length);
							}
						}
						return false;
					}, true);
			}
		}
		
		// check if comment is own
		function isOwnPost(comment, ownUsername) {
			return comment.getElementsByClassName('meta')[0].getElementsByClassName('action')[0].getElementsByTagName('a')[0].firstChild.nodeValue == ownUsername;
		}
		
		// get your own username
		var usernameLink = document.getElementById('navigation').getElementsByClassName('account')[0].getElementsByClassName('username');
		var ownUsername = '';
		if (usernameLink.length == 1) {
			ownUsername = usernameLink[0].firstChild.nodeValue;
		}
		
		// extract all comments
		var comments = commentList.getElementsByTagName('li');
		for (var i = 0; i < comments.length; ++i) {
			if (!isOwnPost(comments[i], ownUsername)) {
				replyify(comments[i]);
			}
		}
		
		function newComment(event) {
			if (event.target.nodeType == 1) {
				if (!isOwnPost(event.target, ownUsername)) {
					replyify(event.target);
				}
			}
		}
		
		// wait for a ajax-reload with new comments
		commentList.addEventListener("DOMNodeInserted", newComment, true);
	}
}