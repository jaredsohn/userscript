// ==UserScript==
// @name            EXRapidLeech - Advertising Block Center Fix
// @namespace       http://userscripts.org/users/CODYQX4
// @version         1.0
// @description     Center Content after Adblock Plus and Anti-AntiBlock Plus
// @include         *.exrapidleech.*
// @run-at          document-start
// ==/UserScript==

// Define GM_addStyle for Cross-Browser Compatibility
if (typeof GM_addStyle == 'undefined') {
	var GM_addStyle = function (css) {
		var head = document.getElementsByTagName('head')[0],
			style = document.createElement('style');
		if (!head) return;
		style.type = 'text/css';
		style.textContent = css;
		head.appendChild(style);
	}
}

// Center Tables
GM_addStyle("body > table { margin: 0 auto !important; width:50% !important; }");