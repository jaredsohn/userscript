// ==UserScript==
// @name           FB Chronik Align
// @namespace      fbChronikAlign
// @description    Changes the align of the new chronik
// @include        https://www.facebook.com/*
// @grant          none
// ==/UserScript==

var css = '._4_7u{float:left !important;margin-left: 0 !important;} ._3rbg{float:right !important;}';
head = document.getElementsByTagName('head')[0];
style = document.createElement('style');
style.type = 'text/css';
if (style.styleSheet)
	style.styleSheet.cssText = css;
else
	style.appendChild(document.createTextNode(css));
head.appendChild(style);