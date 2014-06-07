// ==UserScript==
// @name          Logic to Vitality
// @namespace     Glass/logictovitality
// @description   Changes the Logic userbar to Vitality.
// @include       *hackforums.net/*
// @version 	  1.0
// ==/UserScript==

if(document.body.innerHTML.indexOf("logic.gif") != -1) {
	document.body.innerHTML= document.body.innerHTML.replace(/http\:\/\/cdn2\.hackforums\.net\/images\/blackreign\/groupimages\/english\/logic\.gif/g,"http://i.imgur.com/WjmaQ.gif");
}