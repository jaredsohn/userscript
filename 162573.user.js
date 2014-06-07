// ==UserScript==
// @name          Cryptic's HF Empire to Omni's Denied Empire UserBar
// @namespace     Cryptic
// @description   Changes the Empire UserBar to the Sexy one Omni denied
// @include       *hackforums.net/member.php*
// @include 	  *hackforums.net/showthread.php*
// @version 	  1.0
// ==/UserScript==

if(document.body.innerHTML.indexOf("empire.gif") != -1) {
	document.body.innerHTML= document.body.innerHTML.replace(/http\:\/\/cdn2\.hackforums\.net\/images\/blackreign\/groupimages\/english\/empire\.gif/g,"http://imageshack.us/a/img209/2493/vfroggy.gif");
}

