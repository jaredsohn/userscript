// ==UserScript==
// @name           GMod Wiki Fix
// @namespace      LuaStoned
// @description    Fixes the static width
// @include        http*://wiki.garrysmod.com/*
// ==/UserScript==

var head = document.getElementsByTagName('head')[0];
var widthfix = window.document.createElement('link');
widthfix.rel = 'stylesheet';
widthfix.type = 'text/css';
widthfix.href = 'data:text/css;charset=utf-8,' + escape('body,#mw-head{width: 100% !important; left: 0 !important; margin-left: 0 !important;}');

head.appendChild(widthfix);