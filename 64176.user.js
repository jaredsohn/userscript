// ==UserScript==
// @name           Empornium.us Popup Remover
// @namespace      http://userscripts.org/users/122107
// @description    2009/12/13: Remove popups from empornium.us
// @include        http://empornium.us/*
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
	addJS('function popunder(){}');

},false);