// ==UserScript==
// @name          Upvote/downvote widget for Reddit links
// @namespace     http://diveintogreasemonkey.org/download/
// @description   Adds an unobtrusive widget to any link followed from Reddit. This way, you don't
//					have to hit the back button to upvote/downvote.
// @include       *
// ==/UserScript==

createUpvoteWidget = function()
{
	// If we came from Reddit but are not *currently* on Reddit...
	if(document.referrer.search(/reddit/i) != -1 &&
		document.URL.search(/reddit/i) == -1 &&
		document.URL.search(/soundcloud/i) == -1)
		document.URL.search(/imgur/i) == -1)
	{
		// Adapted from the official upvote widget at
		// http://www.reddit.com/static/button/button1.js
		(function() {
			var prefix = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.reddit.com';

			var write_string="<iframe src=\"" + prefix + "/static/button/button1.html?width=120&url=";

			write_string += encodeURIComponent(window.location.href);
			  
			write_string += "\" height=\"22\" width=\"120\" scrolling='no' frameborder='0' style='position:fixed; right:2%; bottom:0; width:120px !important; height:20px !important; z-index:9999;'></iframe>";
			document.body.innerHTML += write_string;
		})()
	}
}

createUpvoteWidget();