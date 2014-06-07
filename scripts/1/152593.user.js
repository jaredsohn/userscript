// ==UserScript==
// @name        Remove Facebook Sponsored Wall Ads (Updated)
// @namespace   http://userscripts.org/users/supremum
// @description Remove sponsored stories from your news feed
// @include     http://www.facebook.com/
// @include     https://www.facebook.com/
// @version     1
// @author		dfeng
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
 
	// console.log(parent.nodeName)
	while(parent.nodeName != node || (parent.nodeName == node && parent.className.indexOf("uiUnifiedStory") == -1)) {
		parent = parent.parentNode;
		console.log(parent.nodeName)
	}

	// parent = parent.parentNode;

	// while(parent.nodeName != node) {
	// 	parent = parent.parentNode;
	// 	console.log(parent.nodeName)
	// }
	
	// GM_log("removed: " +Pointer.nodeName);   //debug the level we are killing
	console.log(parent.className)
	console.log(parent)
	parent.parentNode.removeChild(parent);
	//Pointer.style.visibility = 'hidden';
 }  

 /*
	Written by Jonathan Snook, http://www.snook.ca/jonathan
	Add-ons by Robert Nyman, http://www.robertnyman.com
*/
function getElementsByClassName(oElm, strTagName, strClassName){
	var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	strClassName = strClassName.replace(/\-/g, "\\-");
	var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
	var oElement;
	for(var i=0; i<arrElements.length; i++){
		oElement = arrElements[i];      
		if(oRegExp.test(oElement.className)){
			arrReturnElements.push(oElement);
		}   
	}
	return (arrReturnElements)
}
 
function Main() {
	__timeout = null;
	//GM_log('fbads main fired');
	
	//Find the sponsored element at the bottom of a wall ad & then kill a lot of its parents.
	//FB does not differentiate their paid "stories" very much so this is fairly fragile code
	//that could easily be broken by a FB update.
	var adboxes = getElementsByClassName(document, "span", "uiStreamAdditionalLogging"); //look for the sponsered link
	for (var i = 0; i < adboxes.length; i++) 
	{
		//GM_log('fbads main kill box: ' + i); 
		kill_Parent(adboxes[i], "LI");  //kill a few of its parents.
	}
}

function DomModified() {
	//GM_log('fbads DomModified fired');
	if (__timeout)
	{
		clearTimeout(__timeout);
	}
	__timeout = setTimeout(Main, 300);
}
