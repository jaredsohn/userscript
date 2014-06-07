// ==UserScript==
// @name           Facebook Text Size Changer
// @version        1.0
// @include        http*://*facebook.com/*
// ==/UserScript==


var h = document.getElementsByTagName('head')[0];
var s = document.createElement('style');
s.type='text/css';
s.appendChild(document.createTextNode('.uiStream .uiStreamMessage{font-size:13px !important}'));
h.appendChild(s);