// ==UserScript==
// @name          l33t to Purple Magic
// @namespace     xerotic/roottofaggots
// @description   Changes the l33t userbar to Purple Magic.
// @include       *hackforums.net/*
// @version 	  1.0
// ==/UserScript==

if(document.body.innerHTML.indexOf("hf_l33t.png") != -1) {
	document.body.innerHTML= document.body.innerHTML.replace(/http\:\/\/cdn2\.hackforums\.net\/images\/blackreign\/groupimages\/english\/hf_l33t\.png/g,"http://i.imgur.com/Q8jtI.png");
}