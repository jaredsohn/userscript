
// Hello World! example user script
// version 0.1 BETA!
// 2005-04-25
// Copyright (c) 2005, Mark Pilgrim
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
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Legend Arena Defensive Percentage
// @namespace     www.legendarena.com
// @description   Script to show the attle percentage next to names
// @include       *legendarena.com/advancedsearch.php*
// @include       *legendarena.com/battle.php?*
// @exclude  	  *legendarena.com/battle.php?action=online

// ==/UserScript==


var allLinks, thisLink, newElement,xmlhttp,profile, a ,b, pot;
	

function loadRating (url)
{
	xmlhttp=new XMLHttpRequest()
	xmlhttp.open("GET",url,false);
	xmlhttp.send(null);
	
	profile=xmlhttp.responseText;
	
	a=profile.lastIndexOf("Win Percent:");
	b=profile.lastIndexOf("Latest Win");
	
	pot=profile.match('Warning');
	
	return profile.substring(a+17,b-7);
}	
/*	
	t=profile.lastIndexOf("Latest Win");
	
	
	return profile.substring(t-13,t-7);
}*/


allLinks = document.evaluate(
    '//td[@width="200"]//a[@href]',
	document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

	
	for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);

	//alert(loadRating (thisLink.href));
	t="";
	if (pot) {t="MAGIC!!!";}
	
	thisLink.innerHTML=thisLink.innerHTML+' <font color="white">'+loadRating (thisLink.href)+t+'</font>';


}


