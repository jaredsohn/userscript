// ==UserScript==
// @name           smile
// @namespace      smile
// @description    smile
// @include        https://smile.telkom.co.id/
// @version        1
// ==/UserScript==


	var d = document;	// shorthand
	var scripts = d.getElementsByTagName('script');
	for(var i = 0; i < scripts.count; i++) {
		if(scripts[i].src.indexOf('je_es01/script_nrclick.js') != -1) {
			scripts[i].src = '';
		}
	}
