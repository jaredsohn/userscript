// ==UserScript==
// @name          Ub3r to Purple Magic
// @namespace     xerotic/roottofaggots
// @description   Changes the ub3r userbar to Purple Magic.
// @include       *hackforums.net/*
// @version 	  1.0
// ==/UserScript==

if(document.body.innerHTML.indexOf("ub3r.png") != -1) {
	document.body.innerHTML= document.body.innerHTML.replace(/http\:\/\/cdn2\.hackforums\.net\/images\/blackreign\/groupimages\/english\/ub3r\.png/g,"http://i.imgur.com/Q8jtI.png");
}
