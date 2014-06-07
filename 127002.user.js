// ==UserScript==
// @name           FB Resizable Text Areas
// @namespace      FB Resizable Text Areas
// @description    Forces all textarea elements on facebook.com to allow resizing.
// @include        /^http(s)?:\/\/(www|apps)\.facebook\.com/
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @version        1.0.0
// @copyright      Charlie Ewing
// ==/UserScript== 

(function() {

	//append css style to the header
	this.addGlobalStyle=function(css) {var head, style;head = document.getElementsByTagName('head')[0];if (!head) { return; };style = document.createElement('style');style.type = 'text/css';style.innerHTML = css;head.appendChild(style);};

	addGlobalStyle(
		"textarea {resize:both !important;}"
	);
})();