// ==UserScript==
// @name        twitter topbar colour change
// @namespace   %namespace%
// @description %description%
// @include     http*://*.twitter.com
// @include     http*://twitter.com
// @exclude     %exclude%
// @version     1
// @grant       none
// ==/UserScript==

function addCss(cssString) {
var head = document.
getElementsByTagName('head')[0];
return unless head; var newCss = document.createElement('style');
newCss.type = "text/css";
newCss.innerHTML = cssString;
head.appendChild(newCss);
}
addCss (
'div.global-nav-inner { background-color: #272822 ! important; }'
); 