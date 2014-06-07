// ==UserScript==
// @name				DSsendReportsToOBST
// @author				Heinzel, Torridity
// @description			Hiermit kann man auf Tastendruck Berichte zu einem OBST-Server und DS Workbench schicken
// @namespace			die-staemme.de
// @include			http://de87.die-staemme.de/game.php?village=4231&screen=report&mode=all&view=528721
// ==/UserScript==

win = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
win.$.ajaxSetup({ cache: true });
win.$.getScript('http://scripts.die-staemme.de/gm-scripts/DSsendReportsToOBST.js');