// ==UserScript==
// @name	Google Latitude Full Screen
// @description	Makes Google Latitude not waste 40% of the screen with crap.
// @include	http://google.tld/latitude*
// @include	http://www.google.tld/latitude*
// @include	https://google.tld/latitude*
// @include	https://www.google.tld/latitude*
// @include	http://latitude.google.tld/latitude*
// @include	http://www.latitude.google.tld/latitude*
// @include	https://latitude.google.tld/latitude*
// @include	https://www.latitude.google.tld/latitude*
// @license	Who gives a shit?  Do whatever the fuck you want.
// @copyright	Fuck off, lawyers.
// @version	1
// ==/UserScript==

document.getElementById("leftDiv").style.display = "none";
document.getElementById("header").style.display = "none";
document.getElementById("footer").style.display = "none";
document.getElementsByClassName("g-unit").item(1).style.margin = "0px";