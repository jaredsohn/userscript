// ==UserScript==
// @name           Remove outline with CSS
// @namespace      http://syvogfirs.dk
// @description    Remove ugly outline, with this small CSS-code.
// @include        *
// ==/UserScript==

var cssNode = document.createElement('link');
cssNode.type = 'text/css';
cssNode.rel = 'stylesheet';
cssNode.href = 'http://www.syvogfirs.dk/outline.css';
cssNode.media = 'screen';
cssNode.title = 'dynamicLoadedSheet';
document.getElementsByTagName("head")[0].appendChild(cssNode);
