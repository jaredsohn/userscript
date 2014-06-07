// ==UserScript==
// @name           ooma Favicon
// @namespace      http://forums.ooma.com/*
// @include        http://forums.ooma.com/*
// ==/UserScript==

var head = document.getElementsByTagName('head')[0];
var icon = document.createElement('link');

icon.setAttribute('type', 'image/x-icon');
icon.setAttribute('rel', 'shortcut icon');

icon.setAttribute('href', 'http://www.ooma.com/favicon.ico');

head.appendChild(icon);