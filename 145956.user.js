// ==UserScript==
// @name           Tea House Fix Aurym Version Simple
// @namespace      none atm
// @description    Tea House Fix after 12/06 Google Changes  Without transparent background
// @include        https://www.google.com/ig*
// @include        http://www.google.com/ig*
// @include        http://www.google.com.mx/ig*
// @include        https://www.google.com.mx/ig*
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
var x=document.body.offsetWidth;
addGlobalStyle(
'#gb{ height:200px;}'
);