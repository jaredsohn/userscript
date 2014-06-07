// ==UserScript==
// @name           Popup Remover
// @namespace      http://userscripts.org/users/43176
// @description    Remove popup from some pages by stevy
// @include        http://uploaded.to/*
// @include	http://*.serienjunkies.org/*
// @include	http://*.netload.in/*
// ==/UserScript==

function addJS(a)
{
	var b = document.getElementsByTagName('head')[0];
	if(!b){ return }
	var c = document.createElement('script');

	c.type = 'text/javascript';
	c.innerHTML = a;
	b.appendChild(c)
}

// Wait until the page is fully loaded
window.addEventListener( 'load', function( e ) {

	// Remove annoying popups
	addJS('function winopen(){}');

},false);