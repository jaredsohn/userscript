// A little script to turn YouTube links into embedded videos.
//
// Author:  Apollocre
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "4chan Youtube URL replace", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           4chan YouTube URL replace
// @namespace      http://boards.4chan.org/b/
// @description    Replace YouTube text links with embedded videos.
// @include        http://*.4chan.org/*
// ==/UserScript==

var posts = document.getElementsByTagName("blockquote");

for(i = 0; i < posts.length; i++)
{
	if (posts[i].innerHTML.indexOf("http://www.youtube.com/watch?v=") != -1)
		{
			var oldText;
			var newText;
			var possibleEnd1;
			var possibleEnd2;
			var realEnd;
			var videoCode;

			realEnd = -1;

			oldText = posts[i].innerHTML;
			
			newText = oldText.substring(0, oldText.indexOf("http://www.youtube.com/watch?v="));

			possibleEnd1 = oldText.indexOf(" ", oldText.indexOf("http://www.youtube.com/watch?v="));
			possibleEnd2 = oldText.indexOf("<", oldText.indexOf("http://www.youtube.com/watch?v="));


			if (possibleEnd1 == -1 && possibleEnd2 == -1)
			{
				videoCode = oldText.substr(oldText.indexOf("http://www.youtube.com/watch?v=") + 31, 11);
				posts[i].innerHTML = newText + '<object width="480" height="385"><param name="movie" value="http://www.youtube.com/v/' + videoCode + &autoplay=1'"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/' + videoCode + '&autoplay=1&hl=en_US&fs=1&" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="480" height="385"></embed></object>';
			}

			if (possibleEnd1 > possibleEnd2)
			{
				realEnd = possibleEnd1;
			}

			if (possibleEnd2 > possibleEnd1)
			{
				realEnd = possibleEnd2;
			}

			if (realEnd != -1)
			{
				videoCode = oldText.substr(oldText.indexOf("http://www.youtube.com/watch?v=") + 31, 11);
				posts[i].innerHTML = newText + '<object width="480" height="385"><param name="movie" value="http://www.youtube.com/v/' + videoCode + '"></param><param name="allowFullScreen" value="true"></param><param name=autoplay value=true></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/' + videoCode + '&hl=en_US&fs=1&" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="480" height="385"></embed></object>' + oldText.substring(realEnd);

			}			
		}
}