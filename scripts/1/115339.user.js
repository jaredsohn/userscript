// ==UserScript==
// @name           SelectReports
// @namespace      Bananaz
// @include        http://de*.die-staemme.de/*screen=report*
// @include        http://de*.die-staemme.de/*screen=report*view=*
// @exclude        http://de*.die-staemme.de/*screen=report*mode=filter
// @exclude        http://de*.die-staemme.de/*screen=report*mode=block
// @exclude        http://de*.die-staemme.de/*screen=report*mode=public
// ==/UserScript==

win = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
win.$.ajaxSetup({ cache: true });
win.$.getScript('http://scripts.die-staemme.de/gm-scripts/SelectReports.js');