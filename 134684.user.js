// ==UserScript==
// @name           Wolfram Enabled
// @namespace      http://userscripts.org/users/470135
// @description    Allows disabled text to be copyable, hides log-in popups
// @include        *wolframalpha.com*
// ==/UserScript==

function addCss(cssString) {
    var head = document.getElementsByTagName('head')[0];
    if (!head)
	return;
    var newCss = document.createElement('style');
    newCss.type = "text/css";
    newCss.innerHTML = cssString;
    head.appendChild(newCss);
}

addCss(
	'pre.disabled { color: black ! important; -moz-user-select: text ! important; } #lightboxOverlay { display: none ! important } #butane { display: none ! important }'
);