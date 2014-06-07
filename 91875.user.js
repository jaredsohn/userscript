// ==UserScript==
// @name           wikileaks fix
// @namespace      http://213.251.145.96/*
// @description    wik
// @include        http://213.251.145.96/cable/2009/10/09BRASILIA1276.html
// ==/UserScript==

rules=document.styleSheets[1].cssRules;
rules[15].style.fontSize="1.6em";
rules[15].style.fontFamily="sans-serif";