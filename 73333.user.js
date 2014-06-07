// ==UserScript==
// @name           Dailybooth Avatar-Link
// @description    Enable clicking on every comment-avatar to visit user's 
// @copyright      2010+, Dustin Steiner (http://www.alopix.net/)
// @license        Attribution-Noncommercial-No Derivative Works 3.0 Austria; http://creativecommons.org/licenses/by-nc-nd/3.0/at/
// @version        1.0
// @namespace      http://www.alopix.net/
// @include        http://dailybooth.com/*
// @exclude        http://dailybooth.com/dashboard*
// @exclude        http://dailybooth.com/snap*
// @exclude        http://dailybooth.com/upload*
// @exclude        http://dailybooth.com/settings*
// @exclude        http://dailybooth.com/share*
// @exclude        http://dailybooth.com/live*
// @exclude        http://dailybooth.com/map*
// @exclude        http://dailybooth.com/people*
// @uso:script     73333
// ==/UserScript==

// check if we are on a picture detail view
if (document.getElementById('picture_view')) {
	var feed = document.getElementById('feed');
	if (feed) {
		
		function linkify(comment) {
			// now get the picture-div
			var commentDivs = comment.getElementsByTagName('div');
			for (var i = 0; i < commentDivs.length; i++) {
				if (commentDivs[i].getAttribute('class') == 'picture') {
					var avatarImg = commentDivs[i].getElementsByTagName('img')[0];
					var username = avatarImg.getAttribute('alt');
					var imageLink = document.createElement('a');
					imageLink.setAttribute('href', 'http://dailybooth.com/' + username);
					avatarImg.parentNode.replaceChild(imageLink, avatarImg);
					imageLink.appendChild(avatarImg);
					break;
				}
			}
		}
		
		// get all comments
		var comments = feed.getElementsByTagName('li');
		for (var i = 0; i < comments.length; i++) {
			linkify(comments[i]);
		}
		
		function newComment(event) {
			linkify(event.target);
		}
		
		// wait for a ajax-reload with new comments
		feed.addEventListener("DOMNodeInserted", newComment, true);
	}
}