// ==UserScript==
// @name		DocCheck Flexikon
// @version		0.1.2
// @author		unrealmirakulix
// @description	optimiert das DocCheck Flexikon
// @include 	http://flexikon.doccheck.com/*
// @copyright   none
// @updateURL 	http://userscripts.org/scripts/source/163093.meta.js
// @downloadURL http://userscripts.org/scripts/source/163093.user.js
// ==/UserScript==

// Handler for .ready() called
if (document.readyState == 'complete'  || document.readyState == 'interactive') {	
		// remove .homeBanner
		var hb = document.getElementsByClassName('homeBanner');
		for (i = 0; i < hb.length; i++) {
			hb[i].style.display = 'none';
		}	
};