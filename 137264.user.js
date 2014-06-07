// ==UserScript==
// @name          Respawn to Noxx
// @namespace     xerotic/roottofaggots
// @description   Changes the Respawn userbar to Noxx.
// @include       *hackforums.net/*
// @version 	  1.0
// ==/UserScript==

if(document.body.innerHTML.indexOf("respawn.gif") != -1) {
	document.body.innerHTML= document.body.innerHTML.replace(/http\:\/\/cdn2\.hackforums\.net\/images\/blackreign\/groupimages\/english\/respawn\.gif/g,"http://i.imgur.com/siCET.gif");
}