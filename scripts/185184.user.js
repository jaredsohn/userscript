// ==UserScript==
// @name           YouTube - Remove shit sidebars.
// @namespace      YouTube
// @description    YouTube - Removes the shitty sidebars on videos and on the home site
// @include        htt*://*.youtube.com/*
// @grant		   none
// @match          http://*.youtube.com/*
// @match          https://*.youtube.com/*
// @icon           http://aux3.iconpedia.net/uploads/520882026785186105.png
// @version        0.1
// @encoding       UTF-8
// ==/UserScript==

function removeSidebar()
{
	if(elem = document.getElementById('watch7-sidebar')) {
		document.getElementById('watch7-sidebar').innerHTML = '';
		document.getElementById('watch7-content').style.width = '100%';
		document.getElementById('watch7-main-container').style.paddingLeft = '0px';
		document.getElementById('watch-discussion').style.padding = '30px 25%';
	}
	
	document.getElementsByClassName('branded-page-v2-secondary-col')[0].remove();
	document.getElementsByClassName('branded-page-v2-primary-col')[0].style.width = '100%';
	document.getElementById('content').style.width = '100%';
}
removeSidebars();