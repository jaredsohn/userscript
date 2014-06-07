// This script will enable you to immediately start downloads without waiting for the time delay countdown.
//
//Alternatively you could use the more efficient css hack at userstyles.org/style/show/297 which also removes the
// floating css "popup".  I couldn't get that part to work with js.
//Thanks to lgarcia.org's gmail css skin for the style insertion code.
//
// ==UserScript==
// @name          uploading.com download time delay bypass
// @namespace     http://www.digivill.net/~joykillr/firefox
// @description   No longer do you have to wait for the time delay countdown to start your downloads
// @include       http://*.uploading.com/*
// @include       http://uploading.com/*
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
	
	var cssStyle = '#waitblock, #optionover, #shadow { display: none !important; visibility: hidden !important; } #linkblock, #codeblock { display: inline !important; }';
	
	addGlobalStyle(cssStyle);
})();
