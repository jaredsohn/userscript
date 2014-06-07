// ==UserScript==
// @name        Remove Facebook Sponsored Wall Ads
// @namespace   https://userscripts.org/users/3102
// @description Remove sponsored stories from your news feed
// @include     http://www.facebook.com/*
// @include     http://apps.facebook.com/*
// @include     https://www.facebook.com/*
// @version     1
// ==/UserScript==

// --------------------------------------------------------------------
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Remove Facebook Sponsored Wall Ads", and click Uninstall.
//
// --------------------------------------------------------------------
//

var __timeout;

grandparent = document.getElementById('globalContainer'); 
if (grandparent)
{
	grandparent.addEventListener("DOMSubtreeModified", DomModified, true);  //add listener to wall loads
}

DomModified();  //fire once to start

 // based on sub element kill all parent elements - recursive - kills top level elements
 function kill_Parent(Pointer,level) { 
   
	if (!Pointer) return;
	var parent = Pointer.parentNode;
	if (!parent) return;
 
	// keep moving up the parent node - but dont kill the body
	level--;
	if (level>0) {
		if (parent.parentNode && parent.nodeName != 'BODY') {
			//GM_log("recursed: " +Pointer.nodeName);  //debug recursion
			kill_Parent(parent,level);
			return;
		 } 
	} 
	
	//GM_log("removed: " +Pointer.nodeName);   //debug the level we are killing
	parent.removeChild(Pointer);
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
		kill_Parent(adboxes[i], 7);  //kill a few of its parents.
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
