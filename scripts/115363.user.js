// ==UserScript==
// @name           DS - DualForum
// @namespace      Die Stämme
// @author         Original: still80; Opera Version: c1b1se
// @description    ReadMarker für Dual Account
// @license        MIT License
// @include        http://*.die-staemme.de/*screen=forum*
// @include        http://*.staemme.ch/*screen=forum*
// @exclude        http://forum.die-staemme.de/*
// @icon           http://www.die-staemme.de/favicon.ico
// ==/UserScript==

var $ = typeof unsafeWindow != 'undefined' ? unsafeWindow.$ : window.$;
$.ajaxSetup({ cache: true });
$.getScript('http://scripts.die-staemme.de/gm-scripts/dual_forums.js');