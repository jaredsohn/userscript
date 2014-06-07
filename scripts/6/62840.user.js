// ==UserScript==
// @name           Bash Ads Remove
// @namespace      SyZer
// @description    Remove Ads from Bash.org.pl
// @include        *bash.org*
// @author         Lukas "SyZer" Gintowt (http://syzer.blogspot.com/)
// @version        1.2
// @licence        GNU licence
// ==/UserScript==

//this is a simple script - made for educational! purpouses
//log&participate in  *bash.org* - WebMasters deserve your support.
//Script is designed - so commercials would breiefly load -> so a WebMasters can get their income

var ads1 = document.getElementById("banner1");
var ads2 = document.getElementById("side_ads");
var ads3 = document.getElementById("banner3");


var removeAds = function() {
	if (ads3) {
		ads1.style.display = "none";
		ads2.style.display = "none";
		ads3.style.display = "none";
	}
}

ads3.addEventListener("DOMSubtreeModified", removeAds, true);
removeAds();

