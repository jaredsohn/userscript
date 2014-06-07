// ==UserScript==
// @name           FB Chronik Align
// @namespace      fbChronikAlign
// @description    Changes the align of the new chronik
// @include        https://www.facebook.com/*
// @grant          none
// ==/UserScript==

var css = '.-cx-PUBLIC-timelineOneColMin__leftCapsuleContainer{float:left !important;margin-left: 0;} .-cx-PUBLIC-timelineOneColMin__rightCapsuleContainer{float:right !important;}';
head = document.getElementsByTagName('head')[0];
style = document.createElement('style');
style.type = 'text/css';
style.id = 'meiner';
if (style.styleSheet)
	style.styleSheet.cssText = css;
else
	style.appendChild(document.createTextNode(css));
head.appendChild(style);