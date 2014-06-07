// ==UserScript==
// @name          Hide Inactive Friends from Facebook
// @namespace     http://personal.utulsa.edu/~christian-mann/
// @description	  Hides offline friends from the right-hand chatbar.
// @version       1.0.1
// @include       http://facebook.com/*
// @include       http://www.facebook.com/*
// @include       https://www.facebook.com/*
// @match         http://*.facebook.com/*
// @match         https://*.facebook.com/*
// ==/UserScript==

var sheet = document.createElement('style');
sheet.innerHTML = ".fbChatOrderedList > ._42fz {display: none;} .fbChatOrderedList > ._42fz.active {display: table-cell}";
document.body.appendChild(sheet);