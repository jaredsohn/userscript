// ==UserScript==
// @name          xerotic's HF Root to Faggots
// @namespace     xerotic/roottofaggots
// @description   Changes the Root userbar, as per Castle Bravo's expectations.
// @include       *hackforums.net/*
// @version 	  1.0
// ==/UserScript==

if(document.body.innerHTML.indexOf("root.gif") != -1) {
	document.body.innerHTML= document.body.innerHTML.replace(/http\:\/\/cdn2\.hackforums\.net\/images\/blackreign\/groupimages\/english\/root\.gif/g,"http://cdn2.hackforums.net/images/blackreign/groupimages/english/admin.jpg");
}