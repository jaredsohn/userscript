// ==UserScript==
// @name           Orkut for 800x600
// @namespace      http://www.orkut.com/
// @description    Optimize orkut display for 800x600 displays :)
// @include        http://orkut.com/*
// ==/UserScript==

var header = document.getElementById('headerin');
var content = document.getElementById('container');

header.style.minWidth='750px';
content.style.minWidth='750px';