// LiveJournal OnScreen
// Version 0.0.1 
// 2005-10-06
// Copyright (c) 2005, Alan Berman (Special Thanks to Vincent Lassiter)
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
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
// select "LiveJournal OnScreen", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          LiveJournal OnScreen
// @description   Updates LiveJournal comment links to open in div elements
// @include       http://*.livejournal.com/*
//
// ==/UserScript==

var appName = "LiveJournal OnScreen 0.0.1"
var commentLink = "http://www.livejournal.com/users/"
var bg1 = "#e5ecf9"

// the LiveJournal "X" to close the window
var ggX = document.createElement('img');
ggX.src = "data:image/gif;base64,R0lGODlhEAANALMAAMjN7Y2O1c/V8H5/z4aH0pye26Om3rK15Kqu4cDF6rm955SW2Nbc897k9nd3" +
		  "zOXs+SH5BAAAAAAALAAAAAAQAA0AQARE8MlJa3WyhTKOxBTWEIi0PeDkrGybfpZ6TcfgCHD4KAP+"+
		  "GIHGC+VyzRiASQMgnD0ADgCC0EA5HwLHQqb7BRM3azeGiQAAOw==";
  
var tempStyle = " style='font-family:verdana;font-size:10px;background-color:"+bg1+";' "
var tempStyle2 = " style='font-family:verdana;font-size:10px;cursor:pointer;cursor:hand;'"
//var myMenu = "<table cellspacing=2 width=100% "+tempStyle+"><td>"+appName+"<td width='10' align=right"+tempStyle2+" onclick='window.hideInfo2();'><table cellspacing=1 cellpadding=0 border=1 "+tempStyle+" title='Close Window'><tr><td id='x1.1'>X</table></table>"
var myMenu = "<table cellspacing=2 width=100% "+tempStyle+"><td>"+appName+"<td width='10' align=right"+tempStyle2+" onclick='window.hideInfo2();'><img src='"+ggX.src+"' title='Close Window'></table>"
var	myDiv = document.createElement("div")


var allLinks, thisLink;
allLinks = document.evaluate("//a[contains(@href, 'livejournal.com/users') or contains(@href, 'livejournal.com/community')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);


//change all the links here..    
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    thisLink.setAttribute("onclick","window.showInfo2(this.getAttribute('href'));return false")
}

window.showInfo2 = function(inURL){
	document.body.appendChild(myDiv)
	myDiv.style.position="absolute"
	var newTop
	var newLeft
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
	myDiv.style.visibility="visible"
	myDiv.innerHTML = "Loading..."
	myDiv.innerHTML=myMenu+"<iframe style='width:100%;height:94%;border:none'  src='"+inURL+"'></iframe>"
}

window.hideInfo2 = function(){
	myDiv.style.visibility="hidden"
}



