// ==UserScript==
// @name          Save pictures from Flickr, Hi5, Autoscout24.de
// @namespace           
// @description	  Enables the save image functionality for Flickr, Hi5, Autoscout24.de
// @include       http://hi5.com/friend/photos/*
// @include       http://*.hi5.com/friend/photos/*		
// ==/UserScript==


var abc = document.getElementById('Photos-ViewPhoto-ClickOverlay');
if (abc) {
	abc.parentNode.removeChild(abc);

}
var arn = document.getElementById('navOverlay');
if (arn) {
	arn.parentNode.removeChild(arn);
}

GM_addStyle('.facade-of-protection, .spaceball { width: 0 !important; }') 
