// ==UserScript==
// @name		Hotmail Ads Remover
// @author		Menan
// @date		2006-09-09
// @description		Hotmail Ads Remover
// @namespace		(none)
// @include		http://*.msn.com/*
// ==/UserScript==

function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];	
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style); 
}

// add css
addGlobalStyle("iframe[height='250']{ display: none ! important; }");
addGlobalStyle("iframe[width='728']{ display: none ! important; }");
addGlobalStyle("iframe[width='160']{ display: none ! important; }");
addGlobalStyle("iframe[width='109']{ display: none ! important; }");