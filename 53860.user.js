// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Google Real Links", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
// decode encoded links in Google search page into its real URL
// --------------------------------------------------------------------
//
// ==UserScript==
// @name    	    Google Real Links
// @description     decode encoded links in Google search page
// @include         http://*.google.*/*q=*
// ==/UserScript==
	
window.addEventListener('load', function(){
	Array.forEach(document.links, function(el) {
		if((omd=el.getAttribute('onmousedown')) && omd.indexOf('return rwt(this')==0)
			el.removeAttribute('onmousedown');
	});
}, false);