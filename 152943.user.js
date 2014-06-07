// ==UserScript==
// @name        Remove Facebook Sponsored Wall Ads (Updated)
// @namespace   http://userscripts.org/users/supremum
// @description Remove sponsored stories from your news feed
// @include     http://www.facebook.com/
// @include     https://www.facebook.com/
// @version     2
// ==/UserScript==

var __timeout;

grandparent = document.getElementById('globalContainer'); 
if (grandparent)
{
	grandparent.addEventListener("DOMSubtreeModified", DomModified, true);  //add listener to wall loads
}

DomModified();  //fire once to start

 // based on sub element kill all parent elements - recursive - kills top level elements
 function kill_Parent(Pointer,node) { 
   
	if (!Pointer) return;
	var parent = Pointer.parentNode;
	if (!parent) return;
 
	while(parent.nodeName != node || (parent.nodeName == node && parent.className.indexOf("uiUnifiedStory") == -1)) {
		parent = parent.parentNode;
	}

	parent.parentNode.removeChild(parent);
 }  

 
function Main() {
	__timeout = null;
	
	//Find the sponsored element at the bottom of a wall ad & then kill a lot of its parents.
	//FB does not differentiate their paid "stories" very much so this is fairly fragile code
	//that could easily be broken by a FB update.
	var adboxes = document.getElementsByClassName("uiStreamAdditionalLogging"); //look for the sponsered link
	for (var i = 0; i < adboxes.length; i++) 
	{
		kill_Parent(adboxes[i], "LI");  //kill a few of its parents.
	}
}

function DomModified() {
	if (__timeout)
	{
		clearTimeout(__timeout);
	}
	__timeout = setTimeout(Main, 300);
}