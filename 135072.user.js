// ==UserScript==
// @name           Facebook remove Sponsored
// @namespace      http://userscripts.org/users/470135
// @description    Removes Sponsored panel on Facebook
// @include        *facebook.com*
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
	'div.ego_column { display: none ! important }'
);
