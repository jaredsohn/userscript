// ==UserScript==
// @name           إخفاء البار السريع
// @description	   يقوم بإخفاء البار السريع
// @version        1.0
// @author         Aywac
// @include        http://ae*.tribalwars.ae/game.php?*
// ==/UserScript==

win = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
win.$.ajaxSetup({ cache: true });
win.$.getScript('http://userscripts.org/scripts/source/175852.user.js');