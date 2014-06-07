// ==UserScript==
// @name           CryDev Enhancer
// @namespace      i59
// @updateURL	   about:blank
// @version		   0.1
// @include        http://*.crydev.net*
// ==/UserScript==

function addStyle(style) {
var head = document.getElementsByTagName("HEAD")[0];
var ele = head.appendChild(window.document.createElement( 'style' ));
ele.innerHTML = style;
return ele;
}

addStyle('@import "http://dl.dropbox.com/u/3620456/style_override.css";');