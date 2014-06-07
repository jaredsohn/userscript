// ==UserScript==
// @name          Dolan.'s Respawn alternative userbar.
// @namespace     dolans/respawnalt
// @description   Changes the Respawn userbar to the most voted alternative
// @include       *hackforums.net/*
// @version 	  1.1
// @grant         none
// ==/UserScript==

if(document.body.innerHTML.indexOf("respawn.gif") != -1) {
	document.body.innerHTML= document.body.innerHTML.replace(/http\:\/\/cdn2\.hackforums\.net\/images\/blackreign\/groupimages\/english\/respawn\.gif/g,"http://i.minus.com/iiS7XGo3Eej8v.png");
}