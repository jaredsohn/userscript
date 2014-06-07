// ==UserScript==
// @name Georgia
// @namespace http://capxous.com
// @description Overwrite font family to Georgia.
// @include http://google.*/*
// @include http://*.google.*/*
// @include https://google.*/*
// @include https://*.google.*/*
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
	
	var cssStyle = '* {font-family:georgia !important}';
	
	addGlobalStyle(cssStyle);
})()
