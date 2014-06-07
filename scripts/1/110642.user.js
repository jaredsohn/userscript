// ==UserScript==
// @name           Better Kjedelige Design
// @namespace      DaMoggen
// @description    Changes Artige.no
// @include        http://www.artige.no/*
// ==/UserScript==

var styleEl = document.createElement('style');
styleEl.type = 'text/css';
styleEl.innerHTML = 'body { background-image: url(http://dl.dropbox.com/u/14605659/artige/wrapper.png); background-repeat: no-repeat; background-position: top; }#content { background-image: url(http://dl.dropbox.com/u/14605659/artige/yuno.png);}'
document.documentElement.appendChild(styleEl);

