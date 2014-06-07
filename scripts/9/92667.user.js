// ==UserScript==
// @name           GW Good Navbar
// @namespace      http://userscripts.org/scripts/show/92667
// @description    removes 8px padding left from navbar
// @include        http://forum.gateworld.net/*
// ==/UserScript==

(function(){ 
	function addGlobalStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}
	
	var cssStyle = '.above_body { padding-left: 0px !important;} ';
	
	addGlobalStyle(cssStyle);
})()