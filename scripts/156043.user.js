// ==UserScript==
// @name        Youtube URL replacer (BRCHAN)
// @namespace   Youtube URL replacer (BRCHAN)
// @description Youtube URL replacer for brchan
// @include     http://*.brchan.org/*
// @version     1.0
// @grant       none
// ==/UserScript==

var posts = document.getElementsByTagName("blockquote");

for(j = 0; j < 3; j++)
{

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

			// TODO O TEXTO
			oldText = posts[i].innerHTML;

			// CÓDIGO DO VIDEO
			videoCode = oldText.substr(oldText.indexOf("http://www.youtube.com/watch?v=") + 31, 11);
			
			// TEXTO ANTES DA URL
			newText = oldText.substring(0, oldText.indexOf("http://www.youtube.com/watch?v="));

			// POSIçÂO DO FINAL DA URL
			realEnd = oldText.indexOf("</a>", oldText.indexOf("http://www.youtube.com/watch?v="))+4;
			
			posts[i].innerHTML = newText + '<br><object width="640" height="390"><param name="movie" value="http://www.youtube.com/v/' + videoCode + '"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/' + videoCode + '&hl=en_US&fs=1&" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="640" height="390"></embed></object><br><br></a>' + oldText.substring(realEnd);
		
		}
}
i = 0;
}