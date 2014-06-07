// ==UserScript==
// @name           Google remove "Play" link
// @description    What it says.
// @include        http://*.google.*
// @include        http://google.*
// @include        https://*.google.*
// @include        https://google.*
// @include        https://accounts.google.*
// ==/UserScript==
var newStyle = document.createElement('style');
newStyle.type = 'text/css';
newStyle.innerHTML = '.gbsup{display:none!important;}';
document.getElementsByTagName('head')[0].appendChild(newStyle);
