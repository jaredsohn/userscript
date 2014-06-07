// ==UserScript==
// @name           Margonem: Duel Addon
// @namespace      created by Arth
// @description    Dodatek usprawniajacy dzialanie minigry Margonem: Duel
// @include        http://duel.margonem.com/*
// @include        http://duelpl.margonem.com/*
// @version        0.0.1
// ==/UserScript==

var th = document.getElementsByTagName('head')[0];
var s = document.createElement('script');
s.setAttribute('type', 'text/javascript');
s.setAttribute('src', 'http://dl.dropbox.com/u/24869759/duel/extend.js');
th.appendChild(s);