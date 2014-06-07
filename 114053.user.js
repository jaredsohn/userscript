// ==UserScript==
// @name           Reddit Mod Mail User Flair Settings Links
// @namespace      http://stepheneisenhauer.com/
// @description    On Reddit community inbox pages, a link to the message author's Edit Flair page is added after their username.
// @include        *://*.reddit.com/message/moderator
// @include        *://*.reddit.com/message/moderator/*
// @include        *://*.reddit.com/r/*/about/message/inbox/*
// ==/UserScript==

var modMailFlairSettingsLinks = {
	version : 1.0,
	makeFlairLinks: function () {
		var entries = document.getElementsByClassName("entry");
		for (var i = 0; i < entries.length; i++) {
			// Get entry header span
			var head = entries[i].getElementsByClassName("head")[0];
			
			// Get author username
			var author = head.getElementsByClassName("author")[0];
			if (author)
				var authorName = author.innerHTML;
			else
				continue;
			
			// Get subreddit name
			var subredditHref = '';
			var anchors = head.getElementsByTagName("a");
			for (var j=0; j<anchors.length; j++) {
				if (anchors[j].href.search('/r/') > -1) {
					subredditHref = anchors[j].href;
					break;
				}
			}
			
			if (subredditHref && authorName) {
				// Create new button
				var button = document.createElement('a');
				button.href = subredditHref + 'about/flair/?name=' + authorName;
				button.setAttribute('target', '_blank');
				button.setAttribute('title', "Edit the author's flair (opens in new tab)");
				button.innerHTML = 'edit flair';
			
				var item = document.createElement('li');
				item.appendChild(button);
			
				// Insert new button
				var buttons = entries[i].getElementsByClassName("buttons")[0];
				buttons.appendChild(item);
			}
		}
	},
	init: function() {
		this.makeFlairLinks();
	}
};
document.addEventListener('load',modMailFlairSettingsLinks.init(),true);