
// Yahoo OnScreen
// Version 0.0.3 
// 2005-09-02
// Copyright (c) 2005, Vincent Lassiter
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
// select "Yahoo OnScreen", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Yahoo OnScreen
// @namespace     http://labs.thebigbeat.com/
// @description   Updates the My Yahoo Space links to open in div elements
// @include       http://my.yahoo.com/p/*
// @include       http://my.yahoo.com/*
// 
// ==/UserScript==

var appName = "Yahoo OnScreen 0.0.3"
var bg1 = "#efefef"


// the Yahoo "X" to close the window
var ggX = document.createElement('img');
ggX.src = "data:image/gif;base64,R0lGODlhEQANAJECAIeHh9HR0f///wAAACH5BAEAAAIALAAAAAARAA0AAAIpjI95wu1vnnTRgXZp" +
			"sOD2zFTYB4bb80kiQ5bCmqbNKoAuPc1nDik+UgAAOw=="


		  
var tempStyle = " style='font-family:verdana;font-size:10px;background-color:"+bg1+";' "
var tempStyle2 = " style='font-family:verdana;font-size:10px;cursor:pointer;cursor:hand;'"
//var myMenu = "<table cellspacing=2 width=100% "+tempStyle+"><td>"+appName+"<td width='10' align=right"+tempStyle2+" onclick='window.hideInfo2();'><table cellspacing=1 cellpadding=0 border=1 "+tempStyle+" title='Close Window'><tr><td id='x1.1'>X</table></table>"
var myMenu = "<table cellspacing=2 width=100% "+tempStyle+"><td>"+appName+"<td width='10' align=right"+tempStyle2+" onclick='window.hideInfo2();'><img src='"+ggX.src+"' title='Close Window'></table>"
var	myDiv = document.createElement("div")


var allLinks, thisLink;
//find all the divs  and their anchors
allLinks = document.evaluate("//div[contains(@id,'m_')]//a[@href]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,  null);


//change all the links here..    
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    thisLink.setAttribute("onclick","window.showInfo2(this.getAttribute('href'));return false")
}

window.showInfo2 = function(inURL){
	
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

window.hideInfo2 = function(){
	myDiv.style.visibility="hidden"
	//document.body.style.backgroundColor = "white"
}


