// ==UserScript==
// @name Darker Google Search Ads Color
// @namespace http://www.google.com/
// @description Change the background color of Google search ads on a results page to a darker color
// @include http://www.google.com/
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
'* .c { background-color: #ffe8c9; !important; }'
); 