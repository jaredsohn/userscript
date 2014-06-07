// ==UserScript==
// @name           apwrapper
// @namespace      dipspb@gmail.com
// @description    AudiPiter forum decorations stripper
// @include        http://forum.audipiter.ru/*
// ==/UserScript==

(function() {
// *********************************************************

// Stop if inappropriate vesion of Greasemonkey
if (!GM_xmlhttpRequest) {
	alert('Please upgrade to the latest version of Greasemonkey.');
	return;
}

// Load additional scripts
var scripts = [
	'http://www.prototypejs.org/assets/2007/11/6/prototype.js',
	'http://wiki.script.aculo.us/javascripts/effects.js',
	'http://wiki.script.aculo.us/javascripts/controls.js'
];
for (i in scripts) {
	var script = document.createElement('script');
	script.src = scripts[i];
	document.getElementsByTagName('head')[0].appendChild(script);
}
// Fire the logic after page completely loaded
window.addEventListener('load', function(event) {
var $ = unsafeWindow['$'];
var $$ = unsafeWindow['$$'];
var list = $$(

// ============== DELETE SOME ELEMENTS FROM PAGE =================
	'#header',
	'div.globalmesswarnwrap',
	'div.globalmesswrap',
	'table.maintitle',
	'#submenu',
	'#header_logo',
	'#footer_logo',
	'#navstrip',
	'div.footer-wrapper',
	'#fo_stat'
// ===============================================================

); for (i=0; i< list.size(); i++) {$(list[i]).remove();}
}, 'false');
// *********************************************************
})(); // end anonymous function wrapper - NAMESPACE ISOLATION END
