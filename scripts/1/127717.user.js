// ==UserScript==
// @name           Remove Google Plus Box
// @namespace      alecava
// @include        http://www.google.*
// @include        https://www.google.*
// ==/UserScript==

var n = document.getElementById('gbu');
n.parentNode.removeChild(n);