// ==UserScript==
// @name          Cryptic's UB3R to Infamous
// @namespace     Cryptic
// @description   Changes the UB3R UserBar to the Infamous
// @include       *hackforums.net/member.php*
// @include 	  *hackforums.net/showthread.php*
// @version 	  1.0
// ==/UserScript==

if(document.body.innerHTML.indexOf("ub3r.png") != -1) {
	document.body.innerHTML= document.body.innerHTML.replace(/http\:\/\/cdn2\.hackforums\.net\/images\/blackreign\/groupimages\/english\/ub3r\.png/g,"http://cdn2.hackforums.net/images/blackreign/groupimages/english/infamous.gif");
}

