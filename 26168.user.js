// ==UserScript==
// @name           Auto-Enter Chat
// @namespace      ChatEnter
// @description    Automatically enters chat when you log in.
// @include        http://127.0.0.1:6008*/main.html
// @include        http://127.0.0.1:6008*/main_c.html
// ==/UserScript==
var frames = document.getElementsByTagName('Frame');



for (var i = 0; i < frames.length; i++)
{
	
	if (frames[i].src.indexOf('chatlaunch.php') != -1) // We have found the correct page! Now, let's mess around with the URL.
	{
	var endOfDomain = frames[i].src.indexOf('chatlaunch.php');
	var DomainString = frames[i].src.substring(0,endOfDomain); // Trim the page name of the end. 
	frames[i].src = DomainString + 'lchat.php'; // Add the chat page onto the end of the address, then set that as the adress of the frame
	
	}
	
}
