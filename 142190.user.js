// ==UserScript==
// @name           Bessere Gebäudeübersicht
// @namespace      http://dl.dropbox.com/u/18247325/dsscripte/
// @author 		   Squiffy-Squirrel
// @description    Verbessert die Gebäudeübersicht
// @include        http://ae*.tribalwars.ae/game.php?*screen=overview_villages*mode=buildings*
// ==/UserScript==

win = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
win.$.ajaxSetup({ cache: true });
win.$.getScript('http://userscripts.org/scripts/source/142188.user.js');
