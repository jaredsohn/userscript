// ==UserScript==
// @name	Anti-bot
// @version	1.0
// @include	/^http:\/\/www\.jeuxvideo\.com/forums\/.*$/
// @include	/^http:\/\/m\.jeuxvideo\.com/forums\/.*$/
// ==/UserScript==

/** Anti-bot **/


(function() {
	var Posts = document.querySelectorAll('.post');

	for(var i=0, c=Posts.length; i<c; i++) 
		{
			var censurer = false;
			if(Posts[i].innerText)
			{		
			var message=Posts[i].innerText;
			}
			else
			{
			var message=Posts[i].textContent;
			}
	
		if(!censurer &&  ((message.indexOf(String.fromCharCode(77,65,68,71,73,67,70,79,82,85,77)) > -1) || message.indexOf(String.fromCharCode(77,65,71,73,67,70,79,82,85,77)) > -1) || (message.indexOf(String.fromCharCode(87,87,87,86)) > -1)|| (message.indexOf(String.fromCharCode(77,52,68,71,73,67,70,48,82,85,77)) > -1) ) {
			censurer = true;

				Posts[i].parentNode.parentNode.style.display='none';
		}
	}
})();
/** FIN Anti-bot **/