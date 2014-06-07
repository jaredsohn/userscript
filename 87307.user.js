// ==UserScript==
// @name           Systempunch
// @namespace      http://userscripts.org/users/229112
// @description    bleep bloop, all credits to a2h, i just modified the font
// @include        *.facepunch*.com/*
// ==/UserScript==

// by a2h

// release 2 - edited to also apply to textareas

var head = document.getElementsByTagName('head')[0];
var elm = window.document.createElement('link');
elm.rel = 'stylesheet';
elm.type = 'text/css';
elm.href = 'data:text/css;charset=utf-8,' + escape('body,textarea{font-family:system}');

head.appendChild(elm);