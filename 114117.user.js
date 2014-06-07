// ==UserScript==
// @name	                Remove Manymoons - Gmail
// @description 	It was starting to bug me.
// @namespace        http://userscripts.org/scripts/show/114117
// @include 	        http://mail.google.com/*
// @include 	        https://mail.google.com/*
// @author		mitnworb
// ==/UserScript==
var styleEl = document.createElement('style');
styleEl.type = 'text/css';
styleEl.innerHTML = 'div.hi {        display: none;}';
document.documentElement.appendChild(styleEl);