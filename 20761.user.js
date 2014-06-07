// ==UserScript==
// @name           Uploaded.to Popup Remover
// @namespace      http://userscripts.org/users/43176
// @description    Remove popup of uploaded.to (2008/01/25)
// @include        http://uploaded.to/*
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