// deviantART Tabs
// version 0.1 BETA!
// 2007-08-28
// Copyright (c) 2007, Ryan Zimmerman
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// 
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          deviantART Tabs
// @namespace     http://userscripts.org/scripts/show/11781
// @description   Adds button for opening deviantART messages in new tabs
// @include       http://my.deviantart.com/messages/
// ==/UserScript==

 (function() {
window.LoadMessageTabs = function(){
	var thisPageContent = document.getElementById("message-center").innerHTML;
	thisPageContent = thisPageContent.replace(/<a href="/g, "~");
	ContentArray = thisPageContent.split("~");
	for(Z=1;Z<=ContentArray.length-1;Z++){
		EndPos = ContentArray[Z].indexOf("\"");
		iURL = ContentArray[Z].substring(0,EndPos);
		GM_openInTab(iURL);
	}
}
	GM_addStyle("button {font-family: verdana; font-size: 12px;}");    
     button = document.createElement('button');
     button.addEventListener("click", window.LoadMessageTabs, false);
     button.appendChild(document.createTextNode('Open Messages In New Tab'));
     document.getElementById("subsection-head-h").appendChild(button);
})();
