// ==UserScript==
// @name           PHPBB Unread Posts
// @description    Marks new items as read by opening each post in an iframe at the bottom of the page.
// @version        0.1
// @author         Brendan Hagan
// @include        http://*search.php?search_id=unreadposts*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

function rewrite() {
	GM_log('rewrite function called');
	var links = jQuery("a img[alt*='View the latest post']"); 
	for (var i=0; i < links.length; i++) { 
			var iframe = document.createElement('iframe');
			iframe.src = links[i].parentNode.getAttribute('href');
			document.body.appendChild(iframe);
			GM_log('checked: ' + iframe.src.toString());
	}
}

GM_registerMenuCommand("Read All Posts", rewrite);