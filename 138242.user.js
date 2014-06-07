// ==UserScript==
// @name           Jewtube
// @namespace     Adaptado para el chan temporal no.uphero.com
// @description   convierte direcciones de youtube en texto plano a objetos embebidos y así
// @include       *no.uphero.com*
// ==/UserScript==


var posts = document.getElementsByTagName("p");

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
				posts[i].innerHTML = newText + '<object width="480" height="385"><param name="movie" value="http://www.youtube.com/v/' + videoCode + '"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/' + videoCode + '&hl=en_US&fs=1&" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="480" height="385"></embed></object>';
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
				posts[i].innerHTML = newText + '<object width="480" height="385"><param name="movie" value="http://www.youtube.com/v/' + videoCode + '"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/' + videoCode + '&hl=en_US&fs=1&" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="480" height="385"></embed></object>' + oldText.substring(realEnd);

			}			
		}
}

