// ==UserScript==
// @name				DSsendReportsToOBST
// @author				Heinzel, Torridity
// @description			Hiermit kann man auf Tastendruck Berichte zu einem OBST-Server und DS Workbench schicken
// @namespace			die-staemme.de
// @include			http://*.die-staemme.de/game.php*screen=report&mode=all&view=*
// ==/UserScript==

win = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
win.$.ajaxSetup({ cache: true });
win.$.getScript('http://scripts.die-staemme.de/gm-scripts/DSsendReportsToOBST.js');