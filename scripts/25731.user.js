// ==UserScript==
// @name			Block Twitter Spammers from GMail
// @namespace	http://www.scottru.com/
// @description		Adds a link to all Twitter invites to allow you to block them easily.
// @include		http://mail.google.com/*
// @include		https://mail.google.com/*
// ==/UserScript==

// This script uses the Gmail Greasemonkey 1.0 API, as documented at http://code.google.com/p/gmail-greasemonkey/wiki/GmailGreasemonkey10API.
// It follows the implementation model (using an anonymous function on window load) used in the examples.


window.addEventListener('load', function() {
	if (unsafeWindow.gmonkey) {
		unsafeWindow.gmonkey.load('1.0', function(gmail) {
   			function addTwitterLink () {
				GM_log(gmail.getActiveViewType());
				if (gmail.getActiveViewType() == 'cv') { // only works on a conversation
					var content = gmail.getActiveViewElement();
					var allLinks = content.getElementsByTagName('a');

					//regex to match twitter URLs which are likely to be username URLs
					//http://twitter.com/user, http://www.twitter.com/user, twitter.com/user, www.twitter.com/user

					var regex = /(http\:\/\/)?(www\.)?twitter\.com\/([^\/]+)\/?$/i; 						
					
					var i, twitterLink;
					for (i = 0; i < allLinks.length; i++) {
						twitterLink = allLinks[i];
						if (twitterLink.href.match(regex)) {
							var blockURL = twitterLink.href.replace(regex, "http://twitter.com/blocks/confirm/$3");
							newElement = document.createElement('a');
							newElement.innerHTML = '&nbsp;<a style="color: red" href="' + blockURL + '>Block!</a>'; 	
							twitterLink.parentNode.insertBefore(newElement, twitterLink.nextSibling);								} 
					}
				}	
     			}
	 	  	gmail.registerViewChangeCallback(addTwitterLink);
			addTwitterLink();
   		});
	}
}, true);
