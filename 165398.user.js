// ==UserScript==
// @name        网页恢复彩色
// @namespace   http://www.yooooo.us/
// @description 手动让所有变灰的网页恢复正常
// @include     http://*/*
// @exclude     https://*/*
// @updateURL   http://userscripts.org/scripts/source/165398.meta.js
// @downloadURL    http://userscripts.org/scripts/source/165398.user.js
// @version     1.0.0
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

addGlobalStyle('html { filter:progid:DXImageTransform.Microsoft.BasicImage(grayscale=0);-webkit-filter: grayscale(0);}');