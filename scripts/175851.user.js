// ==UserScript==
// @name           Hide quickbar
// @description	   It hide the quickbar
// @version        1.0
// @author         Aywac
// @include        http://en*.tribalwars.net/game.php?*
// ==/UserScript==

win = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
win.$.ajaxSetup({ cache: true });
win.$.getScript('http://userscripts.org/scripts/source/175850.user.js');