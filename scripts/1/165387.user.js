// ==UserScript==
// @name        网页变黑白
// @namespace   http://www.yooooo.us/
// @description 手动让所有网页变黑白
// @include     http://*/*
// @exclude     https://*/*
// @updateURL   http://userscripts.org/scripts/source/165387.meta.js
// @downloadURL    http://userscripts.org/scripts/source/165387.user.js
// @version     1.1.0
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

addGlobalStyle('html { filter:progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);-webkit-filter: grayscale(1);}');
