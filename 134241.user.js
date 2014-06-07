// ==UserScript==
// @name        slads
// @namespace   http://pewbox.de/slads
// @include     http://spreadlink.us/*
// ==/UserScript==

var test = document.getElementsByTagName('style')[0];
test.parentNode.removeChild(test);
