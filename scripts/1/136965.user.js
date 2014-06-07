// ==UserScript==
// @name          Serenity to Staff
// @namespace     
// @description   
// @include       *hackforums.net/*
// @version 	  1.0
// ==/UserScript==

if(document.body.innerHTML.indexOf("serenity.gif") != -1) {
	document.body.innerHTML= document.body.innerHTML.replace(/http\:\/\/cdn2\.hackforums\.net\/images\/blackreign\/groupimages\/english\/serenity\.gif/g,"http://cdn2.hackforums.net/images/blackreign/groupimages/english/super_moderator.png");
}