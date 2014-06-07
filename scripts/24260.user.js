// ==UserScript==
// @name           DepositFiles.com Popup Remover
// @namespace      http://userscripts.org/users/43176/scripts
// @description    Remove popups of DepositFiles.com (2008/03/22)
// @include        http://depositfiles.com/*
// @include        http://*.depositfiles.com/
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
	addJS('function show_begin_popup(){}');

},false);