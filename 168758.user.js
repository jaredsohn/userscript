// ==UserScript==
// @name       ExtremeSkins simple interface
// @namespace  http://es.redskins.com/
// @version    0.2
// @description  Removes Redskins.com branding, increases width of forum content area
// @match      http://es.redskins.com/*
// @run-at document-start
// @copyright  2013+, respectgibbs
// ==/UserScript==

var addCss = function(cssString) { 
	var head = document.getElementsByTagName('head')[0]; 
    if(!head) return;
    var newCss = document.createElement('style'); 
	newCss.type = "text/css"; 
	newCss.innerHTML = cssString; 
	head.appendChild(newCss); 
}; 

var overrideCSSImmediate = 
    '#header-frag_element1, #nflcs_fb_like_box, #footer-frag_element1 { display:none !important; }' +
	'.gbl-wrp-1 { background:black !important; }' + 
    '.ipsType_pagetitle { font-size:22px; color:rgb(243, 243, 243); }';

addCss(overrideCSSImmediate); //Add it immediately to prevent major page flicker

var overrideCSSAfterLoad = 
    '.gbl-wrp-2 { width:97% !important; }' +
    '#content { width:100% !important; }';

if ( document.addEventListener ) {
    document.addEventListener( "DOMContentLoaded", function() {
    		var newCss = document.createElement('style'); 
			newCss.type = "text/css"; 
			newCss.innerHTML = overrideCSSAfterLoad; 
			document.body.appendChild(newCss); 
    }, false );
}