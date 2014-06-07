// ==UserScript==
// @name           Gmail Fixed Ad [Preview Theme]
// @namespace      http://userscripts.org/scripts/show/108742
// @description    Gmail Fixed Ad [Preview Theme]
// @include        https://mail.google.com/*
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
	
	var cssStyle = '.mq{display:none;}';
	
	addGlobalStyle(cssStyle);
})()