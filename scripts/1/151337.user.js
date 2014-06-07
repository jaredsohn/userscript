// ==UserScript==
// @name  Unblinking Red Cursor in Google Docs
// @namespace     http://danburd.com
// @description   Gives Google Docs a red cursor that does not blink.
// @include   http://*docs.google.com*/*
// @include   https://*docs.google.com*/*
// @author        Dan Burd
// ==/UserScript==
var styleEl = document.createElement('style');
styleEl.type = 'text/css';
styleEl.innerHTML = 'div.kix-cursor-caret { border-color: rgb(255, 0, 0) !important; opacity: 1 !important;}';
document.documentElement.appendChild(styleEl);