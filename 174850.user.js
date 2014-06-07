// ==UserScript==
// @name        qunar
// @namespace   lianhe
// @description qunar
// @include     http://dataoem.qunar.com/*
// @version     1
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
