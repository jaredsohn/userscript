// ==UserScript==
// @name			A2img for GMail
// @namespace	http://blog.loland.net/208.et
// @description		change all pic-link show as images
// @include		http://mail.google.com/*
// @include		https://mail.google.com/*
// ==/UserScript==

// This script uses the Gmail Greasemonkey 1.0 API, as documented at http://code.google.com/p/gmail-greasemonkey/wiki/GmailGreasemonkey10API.
// It follows the implementation model (using an anonymous function on window load) used in the examples.


window.addEventListener('load', function() {
	if (unsafeWindow.gmonkey) {
		unsafeWindow.gmonkey.load('1.0', function(gmail) {
   			function addA2IMG () {
				GM_log(gmail.getActiveViewType());
				if (gmail.getActiveViewType() == 'cv') { // only works on a conversation
					var content = gmail.getActiveViewElement();
					var allLinks = content.getElementsByTagName('a');

					var regex = /(\.bmp)$|(\.gif)$|(\.jpg)$|(\.png)$/i; 						
					
					var i, IMGLink;
					for (i = 0; i < allLinks.length; i++) {
						IMGLink = allLinks[i];
						if (IMGLink.href.match(regex)) {
							newElement = document.createElement('div');
							newElement.innerHTML = '<br /><img src="' + IMGLink + '"/><br />'; 	
							IMGLink.parentNode.insertBefore(newElement, IMGLink.nextSibling);								} 
					}
				}	
     			}
	 	  	gmail.registerViewChangeCallback(addA2IMG);
			addA2IMG();
   		});
	}
}, true);
