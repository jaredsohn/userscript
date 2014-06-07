// ==UserScript==
// @name           MegaUpload.com Popup Remover
// @namespace      http://userscripts.org/users/43176
// @description    Remove popups of MegaUpload.com (2008/01/25)
// @include        http://www.megaupload.com/*
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
	addJS('function popup(){}');
	addJS('function popup2(){}');
	addJS('function popup3(){}');

},false);