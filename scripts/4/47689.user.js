// ==UserScript==
// @name          LA Defensive Percentage
// @namespace     www.legendarena.com
// @description   Script to show the attle percentage next to names
// @include       *legendarena.com/advancedsearch.php?*
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
	t=loadRating (thisLink.href);
		if (pot) {t+="POTION";}
	
	thisLink.innerHTML=thisLink.innerHTML+' <font color="white">'+t+'</font>';


}