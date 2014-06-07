// ==UserScript==
// @name           Enhance Google Cal
// @namespace      http://exstodot.blogspot.com
// @description    Cleans up Google Calendar. To be used with Enhance Google script
// @include        http://www.google.com/calendar/*
// @include        https://www.google.com/calendar/*
// ==/UserScript==


//-------------------------------------- USER OPTIONS ------------------------------------------//
// 1 means YES, 0 means NO

const HIDE_PRINT=1;
const REARRANGE_NAV_BAR=1;


//-------------------------------------- DONT CHANGE ANYTHING BELOW THIS LINE ------------------------------------------//

var divs=document.evaluate('/html/body/div', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i=0;i<divs.snapshotLength;i++)
{
	divs.snapshotItem(i).style.display='none';
}

if(REARRANGE_NAV_BAR)
{
	var cal=document.getElementById('mothertable').firstChild.firstChild;
	var nav=cal.firstChild.cloneNode(true);
	cal.removeChild(cal.firstChild);
	cal=cal.parentNode;
	var tr=document.createElement('tr');
	tr.appendChild(nav);
	cal.appendChild(tr);
}

if(HIDE_PRINT)
{
	document.getElementById('printlink').parentNode.removeChild(document.getElementById('printlink'));
}
