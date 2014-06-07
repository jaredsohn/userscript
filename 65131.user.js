// ==UserScript==
// @name          Hi5 Picture Saving Enabler
// @namespace           
// @description	  Enables the save image functionality for Hi5 (DEC 2009)
// @include       http://hi5.com/friend/photos/*
// @include       http://*.hi5.com/friend/photos/*		
// ==/UserScript==


var abc = document.getElementById('Photos-ViewPhoto-ClickOverlay');
if (abc) {
	abc.parentNode.removeChild(abc);

}