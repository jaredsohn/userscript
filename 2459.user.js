// Google OnScreen - GM 0.6.4
// Version 0.0.5
//2005-12-29
// Copyright (c) 2005, Vincent Lassiter
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// Modified by Ketan Kothari on 12/28/2005 to make it compatible with Greaemonkey 0.6.4 and FireFox 1.5
// Modified by Ketan Kothari on 12/29/2005 to add Stock Symbols to open in OnScreen , Bookmarks and Gmail Messages to open in new window.
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Google OnScreen", and click Uninstall.
//
// Modified by Ketan Kothari on 12/28/2005 to make it compatible with Greaemonkey 0.6.4 and FireFox 1.5
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Google OnScreen - GM 0.6.4
// @namespace     http://labs.thebigbeat.com/
// @description   Updates the Google Personalized links to open in div elements
// @include       http://www.google.com/ig*
// 
// 0.0.3 -	Changed menubar color to Google default color
//			Added the Google (X) to the menubar to close the window
//0.0.4 - Made it compatible with Greasemonkey 0.6.4
//0.0.5 - 2005-12-29 Added capability to Open Bookmarks and Gmail Messages to open in a new window
//         - Added Stock ticker to open in On Screen
// ==/UserScript==

var appName = "Google OnScreen 0.0.5"
//var bg1 = "#efefef"

var bg1 = "#e5ecf9"

// the Google "X" to close the window
var ggX = document.createElement('img');
ggX.src = "data:image/gif;base64,R0lGODlhEAANALMAAMjN7Y2O1c/V8H5/z4aH0pye26Om3rK15Kqu4cDF6rm955SW2Nbc897k9nd3" +
		  "zOXs+SH5BAAAAAAALAAAAAAQAA0AQARE8MlJa3WyhTKOxBTWEIi0PeDkrGybfpZ6TcfgCHD4KAP+"+
		  "GIHGC+VyzRiASQMgnD0ADgCC0EA5HwLHQqb7BRM3azeGiQAAOw==";

		  
var tempStyle = " style='font-family:verdana;font-size:10px;background-color:"+bg1+";' "
var tempStyle2 = " style='font-family:verdana;font-size:10px;cursor:pointer;cursor:hand;'"
//var myMenu = "<table cellspacing=2 width=100% "+tempStyle+"><td>"+appName+"<td width='10' align=right"+tempStyle2+" onclick='window.hideInfo2();'><table cellspacing=1 cellpadding=0 border=1 "+tempStyle+" title='Close Window'><tr><td id='x1.1'>X</table></table>"
var myMenu = "<table cellspacing=2 width=100% "+tempStyle+"><td>"+appName+"<td width='10' align=right"+tempStyle2+" onclick='window.hideInfo2();'><img src='"+ggX.src+"' title='Close Window'></table>"
var	myDiv = document.createElement("div")

var allLinks, thisLink, allBookmarks;
//find all the divs with class='mc' and their anchors
//you can add more links here
// This makes all Boomarks and GMAIL Links to open in a new window
allBookmarksAndMail = document.evaluate("//div[@style='overflow: hidden;']//a[@href]|//a[contains(@href,'mail.google.com/mail?account_id')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,  null);
for (var j = 0; j < allBookmarksAndMail.snapshotLength; j++) {
   thisLink = allBookmarksAndMail.snapshotItem(j);
   thisLink.setAttribute("onclick","window.open(\""+thisLink.getAttribute('href')+"\");return false");
     }
allLinks = document.evaluate("//div[@class='mc']//a[@href]|//a[@class='ab']|//a[contains(@href,'/help/stock_disclaimer.html')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,  null);

for (var i = 0; i < allLinks.snapshotLength; i++) {
   thisLink = allLinks.snapshotItem(i);
   thisLink.setAttribute("onclick","window.showInfo2(\""+thisLink.getAttribute('href')+"\");return false");
     }

unsafeWindow.showInfo2 = function(inURL){
	
	document.body.appendChild(myDiv)

		
	myDiv.style.position="absolute"
//	myDiv.style.opacity=0.8
		
	var newTop
	var newLeft
	
//	myDiv.style.overflow="auto"  ;
	myDiv.style.left=newLeft;
	myDiv.style.borderColor = "black"
	myDiv.style.backgroundColor = "white"
	myDiv.style.border = "2px solid"
	myDiv.style.zIndex = "999"
	myDiv.style.width= window.innerWidth-(window.innerWidth/5)
	myDiv.style.height=window.innerHeight-(window.innerHeight/5)
	newLeft = 	window.innerWidth/2 - parseInt(myDiv.style.width)/2
	newTop =  	document.body.scrollTop + window.innerHeight/2 - parseInt(myDiv.style.height)/2

	myDiv.style.left=newLeft;
	myDiv.style.top=newTop  ;
	
	//document.body.style.backgroundColor = "silver"

	myDiv.style.visibility="visible"
	myDiv.innerHTML = "Loading..."
	
	myDiv.innerHTML=myMenu+"<iframe style='width:100%;height:94%;border:none'  src='"+inURL+"'></iframe>"

}

unsafeWindow.hideInfo2 = function(){
	myDiv.style.visibility="hidden"
	//document.body.style.backgroundColor = "white"
}


