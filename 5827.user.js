// TvGuide Plus
// (c) 2006
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// --------------------------------------------------------------------
// ==UserScript==
// @name          TvGuidePlus
// @namespace     http://www.stryksta.com/gm
// @description   Removes Annoyances on TvGuide
// @include       http://*.tvguide.*/*
// ==/UserScript==

//Changelog
//
//October 4, 2006 - Beta - Initial Release
//October 5, 2006 - 1.0 - Ads in grid are now removed, as well as articles.
//October 6, 2006 - 1.1 - Removed unneseccary code, fixed a minor errors.

function getElementsByClassName(clsName) 
{ 
	var arr = new Array(); 
	var elems = document.getElementsByTagName("*");
	for ( var cls, i = 0; ( elem = elems[i] ); i++ )
	{
		if ( elem.className == clsName )
		{
			arr[arr.length] = elem;
		}
	}
	return arr;
}

//**************************Start Removing Ads ******************************//
if (document.getElementById("ad_270")) {
    var oNodeToRemove = document.getElementById("ad_270");
    oNodeToRemove.parentNode.removeChild(oNodeToRemove);
}
if (document.getElementById("lw_ad_270")) {
    var oNodeToRemove = document.getElementById("lw_ad_270");
    oNodeToRemove.parentNode.removeChild(oNodeToRemove);
}

if (document.getElementById("adRotator")) {
    var oNodeToRemove = document.getElementById("adRotator");
    oNodeToRemove.parentNode.removeChild(oNodeToRemove);
}

if (getElementsByClassName("ccTopAdContainer")[0]) {
var oNodeToRemove = getElementsByClassName("ccTopAdContainer")[0];
    oNodeToRemove.parentNode.removeChild(oNodeToRemove);
}

(function() {
	var div = document.getElementsByTagName("div")
	for(var i = 0; i < div.length; i++)
	if(div[i].className == "live-pre-message") {
		var oNodeToRemove = div[i];
		oNodeToRemove.parentNode.removeChild(oNodeToRemove);
	}
}) ();

//Remove Ads in the Grid
window.setTimeout(function() { 

	var tr = document.getElementsByTagName("tr")
	for(var i = 0; i < tr.length; i++)
	if(tr[i].className == "gridAdRow") {
		var oNodeToRemove = tr[i];
		oNodeToRemove.parentNode.removeChild(oNodeToRemove);
	}

 }, 3500);
 
//**************************Stop Removing Ads ******************************//
