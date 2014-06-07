// ==UserScript==
// @name           Fix iGoogle Zoom wierdness
// @author		   Christian Oncken 
// @namespace      http://userscripts.org/users/58764
// @description    Fixes iGoogle Zoom wierdness
// @include        http://google.*/ig*
// @include        http://www.google.com/*
// ==/UserScript==

var init = false;	// True if this script has finished initialising, false otherwise

fixModulesWidth();

init = true;

function fixModulesWidth() {
	// uh yeah.

	var elm = document.getElementById('modules');
	if(elm) elm.style.width = '99%' ;	
	if(elm) elm.style.padding = '5px' ;

	var elm = document.getElementById('doc3');	
	if(elm) elm.style.width = '100%' ;
}


