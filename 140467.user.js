// ==UserScript==
// @name           append xkcd title
// @namespace      nnegi
// @description    add title div with none font variant
// @include        http://xkcd.*
// ==/UserScript==

var img = document.querySelector('#comic img');
var title = img.title;
var appendDom = document.createElement('div');
appendDom.appendChild(document.createTextNode(title));
appendDom.style.fontVariant = 'normal';

img.parentNode.appendChild(appendDom);
