// Spiked Humor trimmer
// version 0.1 BETA!
// 20/07/2007
// Copyright (c) 2007, Benjamin "balupton" Lupton
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
// ==UserScript==
// @name           Spiked Humor Trimmer
// @namespace      spikedhumor
// @description    fixes up spikedhumor, removes ads, trims down layout
// @include        http://www.spikedhumor.com/*
// ==/UserScript==

// use this with adblockplus

document.body.style.background = 'black !IMPORTANT';

document.getElementById('sub').style.display = 'none';

var headObj = document.getElementById('head');
var bodyObj = document.getElementById('body');
headObj.style.marginLeft = '-17%';
bodyObj.style.marginLeft = '-17%';

// remove spikedhumor logo
for ( var i = 0, n = headObj.childNodes.length; i < n; ++i )
{
	childNode = headObj.childNodes[i];
	if ( typeof(childNode.tagName) !== 'undefined' )
	{
		if ( childNode.tagName.toUpperCase() === 'H1' )
		{	// spiked logo
			childNode.style.display = 'none';
		} else if ( childNode.tagName.toUpperCase() === 'UL' )
		{	// videos piectures games
			childNode.style.marginLeft = '260px !IMPORTANT';
		} else if ( childNode.tagName.toUpperCase() === 'P' )
		{	// rss button
			childNode.style.marginRight = '180px !IMPORTANT';
			childNode.style.marginTop = '25px !IMPORTANT';
			break;
		}
	}
}


// blah
var mainObj = document.getElementById('main');
mainObj.style.marginLeft = '290px';
mainObj.style.marginTop = '-83px';


// blah
var searchObj = document.getElementById('search');
searchObj.parentNode.removeChild(searchObj);
	
var sectionTabsObj = document.getElementById('sectionTabs');
if ( sectionTabsObj === null )
{	// We are not on main page
	/* someone needs to bother to add the searchbox
	searchObj.style.position = 'relative';
	searchObj.style.top = searchObj.style.left = 'auto';
	searchObj.style.marginTop = '10px';
	searchObj.style.marginLeft = '300px';
	searchObj.style.height = '30px';

	mainObj.appendChild(searchObj);
	*/
}
else
{	// we are on main page
	searchObj.style.position = 'relative';
	searchObj.style.top = searchObj.style.left = 'auto';
	searchObj.style.marginTop = '0px';
	searchObj.style.marginLeft = '40px';

	sectionTabsObj.appendChild(searchObj);
}

// remove all ads
var allDivs, thisDiv;
allDivs = document.evaluate(
    "//p[@class='ad']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    // do something with thisDiv
	thisDiv.style.display = 'none';
}