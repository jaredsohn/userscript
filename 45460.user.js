// ==UserScript==
// @name           CC
// @namespace      bennyhill
// @include        http://www.gamefaqs.com*
// ==/UserScript==

// ==UserScript==
// @name           Mad User
// @namespace      Mad User
// @description    Mad World for a Mad User.
// @include        http://www.gamefaqs.com/boards*
// ==/UserScript==

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


// Get all of the links with the name class (username links, contains user ID).
aoDataCells = getElementsByClassName(document, "a", "name");

// Match a specific user ID.  Could store IDs in an array and loop/compare but whatever.
if ( aoDataCells[0].toString().indexOf("user=4973853") > 0 || aoDataCells[0].toString().indexOf("user=257780") > 0 )
{
	// There were security errors when trying to real a file from HDD.
	aoDataCells[0].innerHTML += "<object data=\"http://content.ytmnd.com/content/3/a/8/3a8328536e7a31b3d18d3ea171d76e78.mp3\" type=\"audio/mpeg\" height=\"0\" width=\"0\"><param name=\"autostart\" value=\"true\"><param name=\"loop\" value=\"true\"><param name=\"hidden\" value=\"true\"></object>";
}