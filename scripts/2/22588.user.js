// Bebo Cleaner
// Version 0.1.1
// Bobbocanfly < bobbocanfly at gmail dot com
// 2007-08-08
// A Small Greasemonkey Script That Cleans Excess Ads
// From Bebo Pages
//
// ==UserScript==
// @name           Bebo Cleaner
// @namespace      beboCleaner
// @description    Clears unneeded images/ads from Bebo
// @include        http://www.bebo.com/*
// @include        http://s.bebo.com/*
// @include        http://bebo.com/*
// ==/UserScript==
//
// ==RevisionHistory==
//
// Version 0.1.1:
// Released: 30/08/2007
// - Fixed bug that stopped the script from working
// - Fixed domains bug
// - Fixed formatting error
// - All hiding now uses the same function 
//
// Version 0.1.0:
// Released: 30/08/2007
//  - Initial release.
//
// ==/RevisionHistory==

var div1 = document.getElementsByTagName("div");
for (var n = 0; n < div1.length; n++)
{
	if (div1[n].getAttribute("class") == "advertisement BANNER YAHOO")
	{
		div1[n].style.visibility = "hidden";
		div1[n].innerHTML="";
	} 
}



document.getElementById("copyright").style.visibility = "hidden"; 
document.getElementById("homepageAdvertisement").style.visibility = "hidden";
document.getElementById("adSpot").style.visibility = "hidden";
document.getElementById("wrapper").style.visibility = "hidden";
document.getElementById("ad-spot-0").style.visibility = "hidden";

