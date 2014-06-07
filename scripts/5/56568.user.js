// ==UserScript==
// @name           Woofer Font Size
// @include        http://woofertime.com/*
// ==/UserScript==

var e = document.getElementsByClassName('status-body')[0]
e.style.marginRight = 0;

e = document.getElementsByClassName('entry-content')[0]
e.style.fontSize = '1em';
e.style.textAlign = 'justify';
