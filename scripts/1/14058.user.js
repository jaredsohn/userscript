// ==UserScript==
// @name           Context Menu Enabler
// @namespace      http://d.hatena.ne.jp/youpy/
// @description    enable context menu
// @include        http://www.nikkansports.com/*
// ==/UserScript==

document.body.setAttribute('oncontextmenu', 'return true');

