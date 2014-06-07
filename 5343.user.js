// ==UserScript==
// @name          UD Profile Display
// @namespace     http://www.lucien.cx/ud/
// @description   Modifies the user's profile links to include profile ID.
// @include       http://*urbandead*/map.cgi*
// ==/UserScript==
// Copyright (C) D. Jolley, 2006.
// Released under the terms of the GNU GPL V2, which can be found at http://www.gnu.org/copyleft/gpl.html
var mungeTopNames = GM_getValue("doTop", 1);
var menuItemAdded = GM_getValue("menuAdded", 0);
var theTable, allLinks, thisElem, newElement, i, id, divElems, liElems, aElems;

if (menuItemAdded == 0)
{
	GM_registerMenuCommand("Toggle main name list profile numbers", setToggleState);
	GM_setValue("menuAdded", 1);
}

if (mungeTopNames == 1)
{
	theTable = document.evaluate('//div',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i=0;i<theTable.snapshotLength; i++) {
		thisElem = theTable.snapshotItem(i);
		if (thisElem.className == 'gt') {
			divElems = document.evaluate('a[@href]',thisElem,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
			for (var i=0;i<divElems.snapshotLength;i++) {
				aElems = divElems.snapshotItem(i);
				var theIDarray = aElems.search.split("=");
				var theID = theIDarray[1];
				aElems.nextSibling.nodeValue =  " [" + theID + "] " + aElems.nextSibling.nodeValue;
			}		
		}
	}
}

theTable = document.evaluate('//ul',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

for (var i=0;i<theTable.snapshotLength; i++)
{
	thisElem = theTable.snapshotItem(i);
	divElems = document.evaluate('li',thisElem,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

	for (var i=0;i<divElems.snapshotLength;i++)
	{
		liElems = divElems.snapshotItem(i);
		if (liElems.firstChild.nextSibling.nodeName == 'A')
		{
			aElems = liElems.firstChild.nextSibling;
			var theIDarray = aElems.search.split("=");
			var theID = theIDarray[1];
			aElems.nextSibling.nodeValue =  " [" + theID + "] " + aElems.nextSibling.nodeValue;
		}
	}
}

function setToggleState()
{
	if (mungeTopNames)
		mungeTopNames = 0;
	else
		mungeTopNames = 1;
	GM_setValue("doTop", mungeTopNames);
}