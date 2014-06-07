// ==UserScript==
// @name           SmallerSymbols
// @namespace      bananaz
// @include        http://de*.die-staemme.de/game.php?*screen=map*
// ==/UserScript==

win = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
win.$.ajaxSetup({ cache: true });

//edit settings here...
win.size = {group: 14, command: 14, res: 14, notiz: 14};
win.vAlign = {group: 'oben', command: 'oben', res: 'unten', notiz: 'unten'};
win.hAlign = {group: 'links', command: 'rechts', res: 'links', notiz: 'links'};
//edit section ends...

win.$.getScript('http://scripts.die-staemme.de/gm-scripts/SmallerSymbols.js');