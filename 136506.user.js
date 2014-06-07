// ==UserScript==
// @name          Diabolic's Techsperts to Admin
// @namespace     diabolic/techspertstoadmin
// @description   Changes the Techsperts userbar.
// @include       *hackforums.net/*
// @version 	  1.0
// ==/UserScript==

if(document.body.innerHTML.indexOf("techsperts.gif") != -1) {
	document.body.innerHTML= document.body.innerHTML.replace(/http\:\/\/cdn2\.hackforums\.net\/images\/blackreign\/groupimages\/english\/techsperts\.gif/g,"http://i.imgur.com/rZeQw.jpg");
}
